// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IiZiSwapPool {
    function state()
        external
        view
        returns (
            uint160 sqrtPrice_96,
            int24 currentPoint,
            uint16 observationCurrentIndex,
            uint16 observationQueueLen,
            uint16 observationNextQueueLen,
            bool locked,
            uint128 liquidity,
            uint128 liquidityX
        );

    function observations(
        uint256 index
    ) external view returns (uint32 timestamp, int56 accPoint, bool init);

    function observe(
        uint32[] calldata secondsAgos
    ) external view returns (int56[] memory accPoints);
}
