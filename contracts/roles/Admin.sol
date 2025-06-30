// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Admin {
    mapping(address => bool) private admins;

    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);

    constructor() {
        admins[msg.sender] = true; // Deployer is admin by default
        emit AdminAdded(msg.sender);
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not an admin");
        _;
    }

    function isAdmin(address account) public view returns (bool) {
        return admins[account];
    }

    function addAdmin(address account) public onlyAdmin {
        admins[account] = true;
        emit AdminAdded(account);
    }

    function removeAdmin(address account) public onlyAdmin {
        require(account != msg.sender, "You can't remove yourself");
        admins[account] = false;
        emit AdminRemoved(account);
    }
}
