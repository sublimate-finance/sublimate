// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./StreamableERC20.sol";

contract StreamableDAI is StreamableERC20 {

	event Deposit(address indexed destination, uint amount);
	event Withdrawal(address indexed source, uint amount);

	constructor () StreamableERC20("Streamable DAI", "strDAI") {}

	function deposit() public virtual payable {
		_mint(msg.sender, msg.value);
	}

	function withdraw(uint amount) public virtual {
		_updateIncomingAndOutgoingSubscriptions(msg.sender);
		_updateBlockAtLastUpdate(msg.sender);
		require(super.availableBalance(msg.sender) >= amount, "Requested amount larger than available balance.");
		_burn(msg.sender, amount);
		payable(msg.sender).transfer(amount);
	}

	/** @dev Creates `amount` tokens and assigns them to `account`, increasing
	 * the total supply. Also increases users available balance.
	 *
	 * Emits a {Transfer} event with `from` set to the zero address.
	 *
	 * Requirements:
	 *
	 * - `to` cannot be the zero address.
	 */
	function _mint(address account, uint256 amount) internal virtual override {
		ERC20._mint(account, amount);
		StreamableERC20._increaseAvailableBalance(account, amount);
	}

	function _burn(address account, uint256 amount) internal virtual override {
		ERC20._burn(account, amount);
		StreamableERC20._decreaseAvailableBalance(account, amount);
	}


}
