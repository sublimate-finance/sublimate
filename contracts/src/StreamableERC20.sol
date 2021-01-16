pragma solidity 0.7.1;

// ERC20: balanceOf(), transfer()

contract StreamableERC20 is ERC20 {

    mapping (address => UserStatus) private _users;

    struct UserStatus {
        uint256 _incomingRate;
        uint256 _maxIncomingAmount;
        uint256 _outgoingRate;
        uint256 _maxOutgoingAmount;
        uint256 _lastUpdated; // block number
    }

    mapping (address => mapping(address => Subscription)) _subscriptionsFrom;
    // _subscriptionsFrom[from] = new mapping(0);

    struct Subscription {
        uint256 _startBlock;
        uint256 _rate;
        uint256 _maxAmount;
    }

    enum SubscriptionStatus {
        //
    }

    /* Events */

    event SubscriptionUpdated(address indexed from, address indexed to, uint256 rate, uint256 maxAmount);
    event SubscriptionStopped(address indexed from, address indexed to);

    // types of "stop"
    // 1. user stops intentionally
    // 2. user ran out of money
    // 3. subscription reached maxAmount

    /* Methods */

    // frontend side

    // for only one subscription -> OK
    // additional check whether the subscription is valid and choose to display it or not

    // for balance -> not OK yet
    // imagine subscription has run out of money
    // from -> negative balance (not updated)
    // to -> more than it should




    // subscribe 
    // maxOutgoingAmount <= balanceOf
    // ensures that no subscription goes over the balance
    // vvvvvvvvvv

    // problem: balance = 10 sETH, rate = 1 maxAmount = 10 -> maxOutgoingAmount = 10
    // transfer() -> balance = 5 sETH
                                                    // -> revert() or we have an incorrect balance calculation problem
    // -> reduce all of the maxAmounts of all subscriptions (uint256 maxAmountScale for each user)
    // maxAmountScale = 0.5 -> always go down with new transfer
    // subscribe(rate, maxAmount = 10) -> maxAmount = maxAmount / maxAmountScale -> maxAmount = 20, scale(subscription) = 0.5 -> 10

    // user tops up their balance (through a transfer(..., to))
    // if maxAmountScale <= 1 -> increase it in relation to the newly added balance
    // balance 15 -> maxAmountScale <= 1 -> additional balance doesn't get added to any subscription

    // maxOutgoingAmount needs to be scaled back

    // subscribe(rate = amount, maxAmount = amount) -> transfer(amount)







    // 








    // maxAmount = infinite <-> ERC20 allowance
    // subscribe 1 eth per month to someone
    // every 3-4 months I top up my balance so that the subscription goes on



    // maxAmount is infinite for all the subscriptions
    


    function _currentRate(address account) view returns (uint256) {
        return _incomingRate[account] - _outgoingRate[account]; // here we need some kind of floor/ceiling
        // maxIncomingAmount / maxOutgoingAmount
    }

    function balanceOf(address account) external view returns (uint256) {
        return super.balanceOf(account) + blocksSinceLastUpdate[account] * _currentRate(account);
    }

    function subscribe(address from, address to, uint256 rate, uint256 maxAmount) {
        _updateSubscription(from, to);
        _subscriptionsFrom[from][to] = ...;
        _incomingRate[to] += rate;
        _outgoingRate[from] -= rate;
    }

    function _updateSubscription(address from, address to) {
        // if run out of money, stop all subscriptions
        // updates balances
        if (userRanOutOfMoney || reachedMaxAmount) {
            stop();
            if (userRanOutMoney) {
                // go back in time 
                _blockAtWhichTheSubscriptionShouldHaveStopped = _startBlock + _maxAmount / _rate;
                // balanceOf(from) === 0
                // adjust balanceOf(to) to prevent giving more money than we should
            }
        }

        // NOTE: because we don't use for loops, we can only update the state of a subscription when a transaction involves it (e.g. stopping, updating rate/maxAmount)
    }

    function getSubscription(address from, address to) external view returns (uint256, uint256) {
        return _subscriptionsFrom[from][to].rate, .maxAmount;
    }





    /* implementation with for loops */

    function _currentRate(address account) view returns (uint256) {
        return _incomingRate[account] - _outgoingRate[account]; // here we need some kind of floor/ceiling
        // maxIncomingAmount / maxOutgoingAmount
    }

    function balanceOf(address account) external view returns (uint256) {
        return super.balanceOf(account) + blocksSinceLastUpdate[account] * _currentRate(account);
    }

    function subscribe(address from, address to, uint256 rate, uint256 maxAmount) {
        _updateAllSubscriptions(address from);
        _subscriptionsFrom[from][to] = ...;
        _incomingRate[to] += rate;
        _outgoingRate[from] -= rate;
    }

    function _updateAllSubscriptions(address from) {
        for (to in subscriptionFrom[from]) {
            _updateSubscription(from, to);
        }
    }

    function _updateSubscription(address from, address to) {
        checkStatus(from, to)
        if (shouldStop) {
            stop();
        }
    }

    function getSubscription(address from, address to) external view returns (uint256, uint256) {
        return _subscriptionsFrom[from][to].rate, .maxAmount;
    }

}