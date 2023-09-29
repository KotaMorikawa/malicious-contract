// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./Helper.sol";

contract Good {
    Helper helper;

    constructor(Helper _helper) payable {
        // solution: create new instance
        // helper = new Helper();
        helper = Helper(_helper);
    }

    function isUserEligible() public view returns (bool) {
        return helper.isUserEligible(msg.sender);
    }

    function addUserToList() public {
        helper.setUserEligible(msg.sender);
    }

    fallback() external {}
}
