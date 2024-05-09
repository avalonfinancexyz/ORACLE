// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IPythAggregatorV3 {
    function getAnswer(uint256) external view returns (int256);

    function latestAnswer() external view virtual returns (int256);
}
