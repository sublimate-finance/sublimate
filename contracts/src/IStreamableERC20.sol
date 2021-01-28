// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20/IERC20.sol";

/**
 * @dev Interface of the StreamableERC20
 */
interface IStreamableERC20 is IERC20 {

	/**
	 * @dev Returns the last updated balance of `account`
	 */
	function lastUpdatedBalanceOf(address account) external view returns (uint256);

    /**
     * @dev Returns the rate and maxAmount of the current subscription from `from` to `to`.
     */
    function getSubscription(address from, address to) external view returns (uint256, uint256);


	/**
	 * @dev Cancels subscription started from `from` to `to`.
	 *
	 * Returns a boolean value indicating whether the operation succeeded.
	 *
	 * Emits a {SubscriptionCanceled} event.
	 */
	function cancelSubscription(address from, address to) external;

	/**
	 * @dev Updates the subscription from `from` to `to`.
	 *
	 * Returns a boolean value indicating whether the operation succeeded.
	 *
	 * Emits a {SubscriptionUpdated} event.
	 */
	function updateSubscription(address from, address to, uint256 rate, uint256 maxAmount) external;

	/**
	 * @dev Emitted when a subscription from `from` to `to` is started.
	 */
	event SubscriptionStarted(address indexed from, address indexed to, uint256 indexed rate, uint256 indexed maxAmount, uint256 indexed startBlock, uint256 indexed endBlock, uint256 indexed lastTransferAtBlock, uint256 indexed amountPaid);


	/**
	 * @dev Emitted when a subscription from `from` to `to` is updated.
	 */
	event SubscriptionUpdated(address indexed from, address indexed to, uint256 indexed rate, uint256 indexed maxAmount, uint256 indexed startBlock, uint256 indexed endBlock, uint256 indexed lastTransferAtBlock, uint256 indexed amountPaid);

	/**
     * @dev Emitted when a subscription from `from` to `to` is canceled by the user.
    */
	event SubscriptionCanceled(address indexed from, address indexed to, uint256 indexed rate, uint256 indexed maxAmount, uint256 indexed startBlock, uint256 indexed endBlock, uint256 indexed lastTransferAtBlock, uint256 indexed amountPaid);

	/**
     * @dev Emitted when the user's status is changed.
    */
	event UserStatusChanged(address indexed account, address uint256 incomingRate, uint256 indexed totalMaxIncomingAmount, uint256 indexed outgoingRate,  uint256 indexed totalMaxOutgoingAmount, uint256 indexed blockAtLastUpdate);



}
