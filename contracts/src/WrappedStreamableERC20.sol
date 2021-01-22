// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StreamableERC20.sol";

contract WrappedStreamableERC20 is StreamableERC20 {

//	Implement deposit and withdrawal through _mint and _burn

	constructor (string memory name_, string memory symbol_) StreamableERC20(name_, symbol_) {}


	event  Deposit(address indexed destination, uint amount);
	event  Withdrawal(address indexed source, uint amount);

	function deposit() public virtual payable {
		super._mint(msg.sender, msg.value);
	}

	function withdraw(uint amount) public virtual {
		require(super.balanceOf(msg.sender) >= amount, "Requested amount larger than available balance.");
		super._burn(msg.sender, amount);
		payable(msg.sender).transfer(amount);
	}


}
