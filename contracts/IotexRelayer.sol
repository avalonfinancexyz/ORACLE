//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IEACAggregatorProxy{
    function latestAnswer() external view returns (int256);
    function getRoundData(uint80 _roundId) external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

contract IotexRelayer is Ownable {
    string public key = "IOTX/USD";
    address immutable EACAggregatorProxy = 0xdD9e60FECC05EC3ea2dE0938Dd5F1d3841851A1C;
    int256 priceMax = 0;

    event PriceMaxChange(int256 _new);

    function setPriceMax(int256 _price) external onlyOwner {
        priceMax = _price;
        emit PriceMaxChange(_price);
    }
    // 
    function latestAnswer() public view returns (int256) {
        int256 price = IEACAggregatorProxy(EACAggregatorProxy).latestAnswer(); 
        
        return price > priceMax ? priceMax : price;
    }

    function decimals() external view returns (uint8) {
        return 8;
    }

    function description() public pure returns (string memory) {
        return "A port of a chainlink aggregator powered by iotex network";
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
        return IEACAggregatorProxy(EACAggregatorProxy).getRoundData(_roundId); 
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
        return IEACAggregatorProxy(EACAggregatorProxy).latestRoundData(); 
    }
}
