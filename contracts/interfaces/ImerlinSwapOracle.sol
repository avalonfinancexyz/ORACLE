// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ImerlinSwapOracle {
    function getSqrtPriceByDelta(
        address pool,
        uint256 delta
    ) external view returns (uint160 sqrtPrice);

    function sqrtPriceX96ToUint(
        uint160 sqrtPriceX96,
        uint8 decimalsToken0
    ) external pure returns (uint256);
}
