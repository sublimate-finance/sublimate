// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./StreamableERC20.sol";

contract StreamableWrappedERC20 is StreamableERC20 {

	ERC20 private token;

	event Deposit(address indexed destination, uint amount);
	event Withdrawal(address indexed source, uint amount);

	constructor (address _token) StreamableERC20(
		string(abi.encodePacked("Streamable ", ERC20(_token).name())),
		string(abi.encodePacked("str", ERC20(_token).symbol()))
	) {
		_setupDecimals(ERC20(_token).decimals());
		token = ERC20(_token);
	}

	function deposit(uint amount) public virtual {
		require(token.transferFrom(msg.sender, address(this), amount), "Underlying token deposit failed");
		_mint(msg.sender, amount);
	}

	function withdraw(uint amount) public virtual {
		_updateIncomingAndOutgoingSubscriptions(msg.sender);
		_updateBlockAtLastUpdate(msg.sender);
		require(super.availableBalance(msg.sender) >= amount, "Requested amount larger than available balance.");
		_burn(msg.sender, amount);
		require(token.transfer(msg.sender, amount), "Underlying token withdrawal failed");
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
