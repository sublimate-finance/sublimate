// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20/ERC20.sol";
import "./IStreamableERC20.sol";

// ERC20: balanceOf(), transfer()

contract StreamableERC20 is ERC20, IStreamableERC20 {

    mapping (address => UserStatus) private _users;

    struct UserStatus {
        uint256 incomingRate;
        uint256 totalIncomingAmount;
        uint256 outgoingRate;
        uint256 totalOutgoingAmount;
        uint256 blockAtLastUpdate;
    }

	enum SubscriptionType {
		OUTGOING,
        INCOMING
	}

	enum SubscriptionStatus {
		INACTIVE, // Subscription not created yet - Used for checks if there is a subscription between subscriber and subscribee
		ACTIVE, // Subscription is active
        STOPPED, // Subscription is stopped - Run out of assets before it reached end date/max amount
        CANCELED, // Subscription got canceled by the user
        FINISHED // Subscription finished normally - this is relevant for the current limited model
	}

	struct Subscription {
		uint256 rate;
		uint256 maxAmount;
		uint256 startBlock;
		uint256 endBlock;
		uint256 lastTransferAtBlock;
		uint256 amountPaid;
		SubscriptionStatus status;
	}

	// This model will allow only for one subscription to a Subscribee address at a given moment.
	mapping (address => mapping(address => Subscription)) private _subscriptions;

	mapping (address => address[]) private _activeOutgoingSubscriptions;
	mapping (address => address[]) private _activeIncomingSubscriptions;


	constructor (string memory name_, string memory symbol_) ERC20(name_, symbol_) {}

	/**
	 * @dev Returns the last updated balance of `account`
	 */
	function lastUpdatedBalanceOf(address account) external view override returns (uint256) {

		UserStatus memory user_status = _users[account];

		// get the invalid amounts (the differences between the amount from the expired subscriptions until now), for the subscriptions which are not updated yet.
		// TODO: Refactor into a single function
		uint256 amountFromActiveIncomingSubscriptionsThatEndedBeforeCurrentBlock = _getInvalidAmountFromExpiredIncomingSubscriptions(account);
		uint256 amountFromActiveOutgoingSubscriptionsThatEndedBeforeCurrentBlock = _getInvalidAmountFromExpiredOutgoingSubscriptions(account);
		uint256 totalInvalidAmount = amountFromActiveIncomingSubscriptionsThatEndedBeforeCurrentBlock + amountFromActiveOutgoingSubscriptionsThatEndedBeforeCurrentBlock;

		// The last valid balance + the valid balance since the last update - the invalid balance
		return super.balanceOf(account) + ((user_status.incomingRate - user_status.outgoingRate) * (block.number - user_status.blockAtLastUpdate)) - totalInvalidAmount;
	}

	function _getInvalidAmountFromExpiredIncomingSubscriptions(address user) internal view returns (uint256) {
		uint256 totalInvalidAmount = 0;
		for (uint i = 0; i < _activeIncomingSubscriptions[user].length; i++) {

			address subscriptionFromAddress = _activeIncomingSubscriptions[user][i];
			Subscription memory subscription = _subscriptions[subscriptionFromAddress][user];

            // This is needed because we might have some subscriptions flagged canceled in this array, which amounts are already deducted
			if(subscription.status == SubscriptionStatus.ACTIVE && block.number > subscription.endBlock) {
				totalInvalidAmount += subscription.rate * (block.number - subscription.endBlock);
			}

		}

		return totalInvalidAmount;
	}

	function _getInvalidAmountFromExpiredOutgoingSubscriptions(address user) internal view returns (uint256) {
		uint256 totalInvalidAmount = 0;
		for (uint i = 0; i < _activeOutgoingSubscriptions[user].length; i++) {

			address subscriptionToAddress = _activeOutgoingSubscriptions[user][i];
			Subscription memory subscription = _subscriptions[user][subscriptionToAddress];

			// This is needed because we might have some subscriptions flagged canceled in this array, which amounts are already deducted
			if(subscription.status == SubscriptionStatus.ACTIVE && block.number > subscription.endBlock) {
				totalInvalidAmount += subscription.rate * (block.number - subscription.endBlock);
			}

		}

		return totalInvalidAmount;

	}


	/**
	 * @dev Updates the subscription from `from` to `to`.
	 *
	 * Returns a boolean value indicating whether the operation succeeded.
	 *
	 * Emits a {SubscriptionUpdated} event.
	 */
	function updateSubscription(address from, address to, uint256 rate, uint256 maxAmount) external override returns (bool) {

        require(msg.sender == from, "StreamableERC20: Not the subscriber");

        _updateUserState(from);

         require(super.balanceOf(from) >= maxAmount, "StreamableERC20: Balance too low");


		if(_shouldCancelSubscription(rate, maxAmount)) {
			return _handleSubscriptionCancellation(from, to);
		}

		if(_subscriptions[from][to].status == SubscriptionStatus.INACTIVE) {
			// In case there is a reminder, we will pay it in the last payment
			uint256 blockEnd = block.number + (maxAmount / rate);
			Subscription memory sub = Subscription(rate, maxAmount, block.number, blockEnd, block.number, 0, SubscriptionStatus.ACTIVE);
			_subscriptions[from][to] = sub;
			_activeOutgoingSubscriptions[from].push(to);
			_activeIncomingSubscriptions[to].push(from);

	        UserStatus storage user_from_status = _users[from];
	        user_from_status.outgoingRate += rate;
			user_from_status.totalOutgoingAmount += maxAmount;

			UserStatus storage user_to_status = _users[to];
			user_to_status.incomingRate += rate;
			user_from_status.totalIncomingAmount += maxAmount;

			emit SubscriptionStarted(from, to, rate, maxAmount);
			return true;
		}

		return false;

	}

	function getSubscription(address from, address to) external view override returns (uint256, uint256) {
		return (_subscriptions[from][to].rate, _subscriptions[from][to].maxAmount);
	}

	function _updateUserState(address user) internal returns (bool) {

		_updateOutgoingSubscriptions(user);
		_updateIncomingSubscriptions(user);
		_users[user].blockAtLastUpdate = block.number;

	    return false;
	}

	function _updateOutgoingSubscriptions(address user) internal {
		uint256 currentBlock = block.number;
		uint256 activeSubscriptionsLength = _activeOutgoingSubscriptions[user].length;

		uint256 newActiveSubscriptionsIndex = 0;



		address[] memory newActiveOutgoingSubscriptions = new address[](activeSubscriptionsLength);
		for (uint i = 0; i < _activeOutgoingSubscriptions[user].length; i++) {

			address subscriptionToAddress = _activeOutgoingSubscriptions[user][i];
			Subscription storage subscription = _subscriptions[user][subscriptionToAddress];

			if(subscription.status == SubscriptionStatus.CANCELED) {
				continue;
			}

			// TODO: Edge case, should it be >= instead of >?
			if (currentBlock > subscription.endBlock) {
				// The subscription has expired (finished)
				// Pay unpaid amount and deactivate subscription
				_updateFinishedSubscription(subscription, user, subscriptionToAddress, SubscriptionType.OUTGOING);
			} else {
				// Pay unpaid amount
				_updateActiveSubscription(subscription, user, subscriptionToAddress);
				newActiveOutgoingSubscriptions[newActiveSubscriptionsIndex++] = subscriptionToAddress;
			}
		}
//		_activeOutgoingSubscriptions[user] = newActiveOutgoingSubscriptions[:newActiveSubscriptionsIndex];
		_activeOutgoingSubscriptions[user] = newActiveOutgoingSubscriptions;


	}


	function _updateIncomingSubscriptions(address user) internal {
		uint256 currentBlock = block.number;
		uint256 activeSubscriptionsLength = _activeIncomingSubscriptions[user].length;

		uint256 newActiveSubscriptionsIndex = 0;

		address[] memory newActiveIncomingSubscriptions = new address[](activeSubscriptionsLength);

		for (uint i = 0; i < _activeIncomingSubscriptions[user].length; i++) {
			address subscriptionFromAddress = _activeIncomingSubscriptions[user][i];
			Subscription storage subscription = _subscriptions[subscriptionFromAddress][user];

			if(subscription.status == SubscriptionStatus.CANCELED) {
				continue;
			}

			// TODO: Edge case, should it be >= instead of >?
			if (currentBlock > subscription.endBlock) {
				// The subscription has expired (finished)
				// Retrieve unpaid amount and deactivate subscription
				_updateFinishedSubscription(subscription, subscriptionFromAddress, user, SubscriptionType.INCOMING);
			} else {
				// Pay unpaid amount
				_updateActiveSubscription(subscription, subscriptionFromAddress, user);
				newActiveIncomingSubscriptions[newActiveSubscriptionsIndex++] = subscriptionFromAddress;

			}
		}

//		_activeIncomingSubscriptions[user] = newActiveIncomingSubscriptions[:newActiveSubscriptionsIndex];
		_activeIncomingSubscriptions[user] = newActiveIncomingSubscriptions;


	}

	function _updateFinishedSubscription(Subscription storage subscription, address addressFrom, address addressTo, SubscriptionType _type) internal {
		uint256 numBlocksSinceLastPayment = subscription.endBlock - subscription.lastTransferAtBlock;

		// check if the subscription is already payed out
		if(numBlocksSinceLastPayment == 0) return;

		// unpaid rate + the reminder;
		uint256 amountToPay = numBlocksSinceLastPayment * subscription.rate + (subscription.maxAmount - (subscription.endBlock - subscription.startBlock) * subscription.rate);

		super._transfer(addressFrom, addressTo, amountToPay);
		subscription.lastTransferAtBlock = subscription.endBlock;
		subscription.amountPaid += amountToPay;
		subscription.status = SubscriptionStatus.FINISHED;

		if(_type == SubscriptionType.INCOMING) {
			_users[addressTo].incomingRate -= subscription.rate;
			_users[addressTo].totalIncomingAmount -= subscription.maxAmount;
		} else {
			_users[addressFrom].outgoingRate -= subscription.rate;
			_users[addressFrom].totalOutgoingAmount -= subscription.maxAmount;
		}

	}

	function _updateActiveSubscription(Subscription storage subscription, address addressFrom, address addressTo) internal {
		uint256 numBlocksSinceLastPayment = block.number - subscription.lastTransferAtBlock;
		uint256 amountToPay = numBlocksSinceLastPayment * subscription.rate;
		super._transfer(addressFrom, addressTo, amountToPay);
		subscription.lastTransferAtBlock = block.number;
		subscription.amountPaid += amountToPay;
	}


	function _shouldCancelSubscription(uint256 rate, uint256 maxAmount) internal pure returns (bool) {
		return rate == 0 && maxAmount == 0;
	}

	function _handleSubscriptionCancellation(address from, address to) internal returns (bool) {
		assert(_subscriptions[from][to].status == SubscriptionStatus.ACTIVE);
		_subscriptions[from][to].status = SubscriptionStatus.CANCELED;
		_users[from].outgoingRate -= _subscriptions[from][to].rate;
		_users[from].totalOutgoingAmount -= _subscriptions[from][to].maxAmount;

		_users[to].incomingRate -= _subscriptions[from][to].rate;
		_users[to].totalIncomingAmount -= _subscriptions[from][to].maxAmount;


		emit SubscriptionCanceled(from, to);
		return true;
	}

//
//	event SubscriptionStarted(address indexed from, address indexed to, uint256 rate, uint256 maxAmount);
//	event SubscriptionStopped(address indexed from, address indexed to);
//	event SubscriptionCanceled(address indexed from, address indexed to);


}
