// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Roles.sol";
import "./Admin.sol";

contract Consumer is Admin {
    using Roles for Roles.Role;
    Roles.Role private _consumers;

    modifier onlyConsumer() {
        require(isConsumer(msg.sender), "Not a consumer");
        _;
    }

    function addConsumer(address account) public onlyAdmin {
        _consumers.add(account);
    }

    function removeConsumer(address account) public onlyAdmin {
        _consumers.remove(account);
    }

    function isConsumer(address account) public view returns (bool) {
        return _consumers.has(account);
    }
}
