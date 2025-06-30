// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Roles.sol";
import "./Admin.sol";

contract Distributor is Admin {
    using Roles for Roles.Role;
    Roles.Role private _distributors;

    modifier onlyDistributor() {
        require(isDistributor(msg.sender), "Not a distributor");
        _;
    }

    function addDistributor(address account) public onlyAdmin {
        _distributors.add(account);
    }

    function removeDistributor(address account) public onlyAdmin {
        _distributors.remove(account);
    }

    function isDistributor(address account) public view returns (bool) {
        return _distributors.has(account);
    }
}
