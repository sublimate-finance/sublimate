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
	 * @dev Updates the subscription from `from` to `to`.
	 *
	 * Returns a boolean value indicating whether the operation succeeded.
	 *
	 * Emits a {SubscriptionUpdated} event.
	 */
	function updateSubscription(address from, address to, uint256 rate, uint256 maxAmount) external returns (bool);

	/**
	 * @dev Emitted when a subscription from `from` to `to` is updated.
	 *
	 * Note that `rate` and `maxAmount` if the subscription is stopped.
	 */
	event SubscriptionUpdated(address indexed from, address indexed to, uint256 rate, uint256 maxAmount);
}
