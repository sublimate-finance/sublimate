// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StreamableERC20.sol";

contract WrappedStreamableERC20 is StreamableERC20 {

//	Implement deposit and withdrawal through _mint and _burn

	constructor (string memory name_, string memory symbol_) StreamableERC20(name_, symbol_) {}


}
