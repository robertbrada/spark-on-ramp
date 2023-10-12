/**
 *Submitted for verification at Etherscan.io on 2023-02-25
*/

// SPDX-License-Identifier: AGPL-3.0-or-later

/// SavingsDai.sol -- A tokenized representation DAI in the DSR (pot)

// Copyright (C) 2017, 2018, 2019 dbrock, rain, mrchico
// Copyright (C) 2021-2022 Dai Foundation
//
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

interface IERC1271 {
    function isValidSignature(
        bytes32,
        bytes memory
    ) external view returns (bytes4);
}

interface VatLike {
    function hope(address) external;
}

interface PotLike {
    function chi() external view returns (uint256);
    function rho() external view returns (uint256);
    function dsr() external view returns (uint256);
    function drip() external returns (uint256);
    function join(uint256) external;
    function exit(uint256) external;
}

interface DaiJoinLike {
    function vat() external view returns (address);
    function dai() external view returns (address);
    function join(address, uint256) external;
    function exit(address, uint256) external;
}

interface DaiLike {
    function transferFrom(address, address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
}

interface ISavingsDai {

    // --- ERC20 Data ---

    // --- Data ---
    // --- Events ---
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares);
    event Withdraw(address indexed sender, address indexed receiver, address indexed owner, uint256 assets, uint256 shares);

    // --- EIP712 niceties ---

    // function _calculateDomainSeparator(uint256 chainId) private view returns (bytes32); 

    function DOMAIN_SEPARATOR() external view returns (bytes32); 

    // function _rpow(uint256 x, uint256 n) internal pure returns (uint256 z);

    // function _divup(uint256 x, uint256 y) internal pure returns (uint256 z);

    // --- ERC20 Mutations ---

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);

    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);

    // --- Mint/Burn Internal ---

    // function _mint(uint256 assets, uint256 shares, address receiver) internal;

    // function _burn(uint256 assets, uint256 shares, address receiver, address owner) internal;

    // --- ERC-4626 ---

    function asset() external view returns (address);

    function totalAssets() external view returns (uint256);

    // function convertToShares(uint256 assets) public view returns (uint256);

    // function convertToAssets(uint256 shares) public view returns (uint256);

    function maxDeposit(address) external pure returns (uint256);
    function previewDeposit(uint256 assets) external view returns (uint256);

    function deposit(uint256 assets, address receiver) external returns (uint256 shares);
    function maxMint(address) external pure returns (uint256);

    function previewMint(uint256 shares) external view returns (uint256);

    function mint(uint256 shares, address receiver) external returns (uint256 assets);

    function maxWithdraw(address owner) external view returns (uint256);

    function previewWithdraw(uint256 assets) external view returns (uint256);

    function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);

    function maxRedeem(address owner) external view returns (uint256);

    function previewRedeem(uint256 shares) external view returns (uint256);

    function redeem(uint256 shares, address receiver, address owner) external returns (uint256 assets);

    // --- Approve by signature ---
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}