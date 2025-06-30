// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Roles {
    struct Role {
        mapping(address => bool) bearer;
    }

    function add(Role storage role, address account) internal {
        require(account != address(0), "Invalid address");
        require(!has(role, account), "Account already has role");
        role.bearer[account] = true;
    }

    function remove(Role storage role, address account) internal {
        require(has(role, account), "Account doesn't have role");
        role.bearer[account] = false;
    }

    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Invalid address");
        return role.bearer[account];
    }
}
