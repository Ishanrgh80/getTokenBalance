// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenContract is ERC20{
    constructor()ERC20("TestingTokens", "TTK"){
        _mint(msg.sender,100000*(10**18));
    }
} 


