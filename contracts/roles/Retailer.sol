// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Roles.sol";
import "./Admin.sol";

contract Retailer is Admin {
    using Roles for Roles.Role;
    Roles.Role private _retailers;

    modifier onlyRetailer() {
        require(isRetailer(msg.sender), "Not a retailer");
        _;
    }

    function addRetailer(address account) public onlyAdmin {
        _retailers.add(account);
    }

    function removeRetailer(address account) public onlyAdmin {
        _retailers.remove(account);
    }

    function isRetailer(address account) public view returns (bool) {
        return _retailers.has(account);
    }
}
