pragma solidity ^0.8.0;

import "./interfaces/IPythAggregatorV3.sol";
import "./interfaces/ImerlinSwapOracle.sol";

contract merlinSwapPoolOracle {
    IPythAggregatorV3 public baseOracle;
    ImerlinSwapOracle public merlinOracle;
    address public targerPool;
    // 5 min twap
    uint256 delta = 300;

    constructor(address _base, address _merlinOracle, address _targetPool) {
        baseOracle = IPythAggregatorV3(_base);
        merlinOracle = ImerlinSwapOracle(_merlinOracle);
        targerPool = _targetPool;
    }

    function latestAnswer() public view returns (int256 price) {
        int256 basePrice = baseOracle.latestAnswer();
        uint160 sqrtPrice = merlinOracle.getSqrtPriceByDelta(targerPool, delta);
        uint256 merlinPrice = merlinOracle.sqrtPriceX96ToUint(sqrtPrice, 18);
        price = int256((merlinPrice * uint256(basePrice)) / 1e18);
        return price;
    }
}
