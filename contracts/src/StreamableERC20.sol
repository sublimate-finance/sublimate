// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20/ERC20.sol";
import "./IStreamableERC20.sol";

// ERC20: balanceOf(), transfer()

contract StreamableERC20 is IStreamableERC20, ERC20 {
	mapping (address => UserStatus) private _users;

	struct UserStatus {
		uint256 incomingRate; // tokens per block
		uint256 maxIncomingAmount; // tokens
		uint256 outgoingRate; // tokens per block
		uint256 maxOutgoingAmount; // tokens
		uint256 blockAtLastUpdate; // block number
	}

	enum SubscriptionStatus {
		INACTIVE, // Subscription not created yet - Used for checks if there is a subscription between subscriber and subscribee
		ACTIVE, // Subscription is active
		STOPPED, // Subscription is stopped - Run out of assets before it reached end date/max amount
		CANCELED, // Subscription got canceled by the user
		FINISHED // Subscription finished normally - this is relevant for the current limited model
	}

	struct Subscription {
		uint256 rate; // tokens per block
		uint256 maxAmount; // tokens
		uint256 startBlock; // block number
		SubscriptionStatus status;
	}

	// This model will allow only for one subscription to a Subscribee address at a given moment.
	mapping (address => mapping(address => Subscription)) private _subscriptions;


	constructor (string memory name_, string memory symbol_) ERC20(name_, symbol_) {

	}

	/**
	* @dev Returns the last updated balance of `account`
	*/
	function lastUpdatedBalanceOf(address account) external view override returns (uint256) {
		UserStatus storage userStatus = _users[account];
		return balanceOf(account) + (userStatus.incomingRate - userStatus.outgoingRate) * (block.number - userStatus.blockAtLastUpdate);
	}

    /**
     * @dev Returns the rate and maxAmount of the current subscription from `from` to `to`.
     */
    function getSubscription(address from, address to) external view override returns (uint256, uint256) {
        return (_subscriptions[from][to].rate, _subscriptions[from][to].maxAmount);
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
		require(balanceOf(from) >= maxAmount, "StreamableERC20: Balance too low");

		// Passing rate = 0, maxAmount = 0 cancels the subscription
		if(_shouldCancelSubscription(rate, maxAmount)) {
			return _cancelSubscription(from, to);
		}

		// If this subscription has never been created yet
		if(_subscriptions[from][to].status == SubscriptionStatus.INACTIVE) {
			// Create and store the subscription
			/*Subscription storage sub =*/ _subscriptions[from][to] = Subscription(rate, maxAmount, block.number, SubscriptionStatus.ACTIVE);

			// Increase outgoingRate of "from"
			UserStatus storage userFromStatus = _users[from];
			userFromStatus.outgoingRate += rate;
			userFromStatus.blockAtLastUpdate = block.number;

			// Increase incomingRate of "from"
			UserStatus storage userToStatus = _users[to];
			userToStatus.incomingRate += rate;
			userToStatus.blockAtLastUpdate = block.number;

			emit SubscriptionStarted(from, to, rate, maxAmount);

			return true;
		}

		return false;
	}

	function _shouldCancelSubscription(uint256 rate, uint256 maxAmount) internal pure returns (bool) {
		return rate == 0 && maxAmount == 0;
	}

	/**
	* @dev Changes status of subscription from ACTIVE to CANCELED.
	*
	* Returns a boolean value indicating whether the operation succeeded.
	*
	* Emits a {SubscriptionCanceled} event.
	*/
	function _cancelSubscription(address from, address to) internal returns (bool) {
		require(_subscriptions[from][to].status == SubscriptionStatus.ACTIVE, "StreamableERC20: Subscription not active");

		_subscriptions[from][to].status = SubscriptionStatus.CANCELED;

		emit SubscriptionCanceled(from, to);

		return true;
	}


	event SubscriptionStarted(address indexed from, address indexed to, uint256 rate, uint256 maxAmount);
	event SubscriptionStopped(address indexed from, address indexed to);
	event SubscriptionCanceled(address indexed from, address indexed to);
}
