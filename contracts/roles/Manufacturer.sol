// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Roles.sol";
import "./Admin.sol";

contract Manufacturer is Admin {
    using Roles for Roles.Role;
    Roles.Role private _manufacturers;

    constructor() {
        _manufacturers.add(msg.sender); // Deployer becomes a manufacturer
    }

    modifier onlyManufacturer() {
        require(isManufacturer(msg.sender), "Not a manufacturer");
        _;
    }

    function addManufacturer(address account) public onlyAdmin {
        _manufacturers.add(account);
    }

    function removeManufacturer(address account) public onlyAdmin {
        _manufacturers.remove(account);
    }

    function isManufacturer(address account) public view returns (bool) {
        return _manufacturers.has(account);
    }
}
