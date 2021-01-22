// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WrappedStreamableERC20.sol";

contract strETH is WrappedStreamableERC20 {

	constructor () WrappedStreamableERC20("Streamable Ether", "strETH") {}

}
