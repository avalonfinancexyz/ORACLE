pragma solidity ^0.8.10;

interface IDIAOracleV2{
    function getValue(string memory) external view returns (uint128, uint128);
}

contract IntegrationSample{

    string public key = "BTC/USD";
    address immutable ORACLE = 0x9a9a5113b853b394E9BA5FdB7e72bC5797C85191;

    function latestAnswer() public view returns (int256) {
        
        (uint128 price, ) = IDIAOracleV2(ORACLE).getValue(key); 
        return int256(int128(price));
    }

    function decimals() external pure returns (uint8) {
        return 8;
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

