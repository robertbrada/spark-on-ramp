/**
 *Submitted for verification at Etherscan.io on 2021-08-18
*/

// SPDX-License-Identifier: AGPL-3.0-or-later

// Copyright (C) 2017, 2018, 2019 dbrock, rain, mrchico

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

pragma solidity ^0.8.17;


interface IDai {
    // --- Auth ---    // function rely(address guy) external note auth { wards[guy] = 1; }
    // function deny(address guy) external note auth { wards[guy] = 0; }

    event Approval(address indexed src, address indexed guy, uint wad);
    event Transfer(address indexed src, address indexed dst, uint wad);

    // --- Math ---
    // function add(uint x, uint y) internal pure returns (uint z);
    // function sub(uint x, uint y) internal pure returns (uint z);

    // --- EIP712 niceties ---
    // bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address holder,address spender,uint256 nonce,uint256 expiry,bool allowed)");

    // --- Token ---
    function transfer(address dst, uint wad) external returns (bool);
    // function mint(address usr, uint wad) external auth;
    function burn(address usr, uint wad) external;
    function approve(address usr, uint wad) external returns (bool);

    // --- Alias ---
    function push(address usr, uint wad) external;
    function pull(address usr, uint wad) external;
    function move(address src, address dst, uint wad) external;

    // --- Approve by signature ---
    function permit(address holder, address spender, uint256 nonce, uint256 expiry,
                    bool allowed, uint8 v, bytes32 r, bytes32 s) external
    ;
    function balanceOf(address account) external view returns (uint256);
}