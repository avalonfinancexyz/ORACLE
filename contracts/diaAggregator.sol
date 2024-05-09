//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IDIAOracleV2{
    function getValue(string memory) external view returns (uint128, uint128);
}

contract diaAggregator {
    string public key = "BTC/USD";
    address immutable ORACLE = 0x9a9a5113b853b394E9BA5FdB7e72bC5797C85191;

    function latestAnswer() public view returns (int256) {
        (uint128 price, ) = IDIAOracleV2(ORACLE).getValue(key); 
        return int256(int128(price));
    }

    function decimals() external view returns (uint8) {
        return 8;
    }

    function description() public pure returns (string memory) {
        return "A port of a chainlink aggregator powered by dai network";
    }

    function version() public pure returns (uint256) {
        return 1;
    }


    function latestTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function latestRound() public view returns (uint256) {
        // use timestamp as the round id
        return latestTimestamp();
    }

    function getAnswer(uint256) public view returns (int256) {
        return latestAnswer();
    }

    function getTimestamp(uint256) external view returns (uint256) {
        return latestTimestamp();
    }

    function getRoundData(
        uint80 _roundId
    )
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        (uint128 price, uint256 publishTime) = IDIAOracleV2(ORACLE).getValue(key); 
        roundId = uint80(publishTime);
        return (
            roundId,
            int256(int128(price)),
            publishTime,
            publishTime,
            roundId
        );
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        (uint128 price, uint256 publishTime) = IDIAOracleV2(ORACLE).getValue(key); 
        roundId = uint80(publishTime);
        return (
            roundId,
            int256(int128(price)),
            publishTime,
            publishTime,
            roundId
        );
    }
}
