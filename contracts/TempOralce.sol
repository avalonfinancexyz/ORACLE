pragma solidity ^0.8.0;

contract TempOralce {
  uint256 internal price;
  uint256 internal publishTime;
  address private owner;
  address private priceUpdater;

  /**
   * @dev Set contract deployer as owner
   */
  constructor() {
      owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
  }

  // modifier to check if caller is owner
  modifier isOwner() {
      // If the first argument of 'require' evaluates to 'false', execution terminates and all
      // changes to the state and to Ether balances are reverted.
      // This used to consume all gas in old EVM versions, but not anymore.
      // It is often a good idea to use 'require' to check if functions are called correctly.
      // As a second argument, you can also provide an explanation about what went wrong.
      require(msg.sender == owner, "Caller is not owner");
      _;
  }

  function setUpdater(address _updater) external isOwner {
    priceUpdater = _updater;
  }

  function setPrice(uint256 _price) external {
    require(msg.sender == priceUpdater, "!auth");
    price = _price;
    publishTime = block.timestamp;
  }

  function decimals() external pure returns (uint8) {
    return 8;
  }

  function getAnswer(uint256) public view returns (int256) {
    return latestAnswer();
  }

  function latestAnswer() public view virtual returns (int256) {
    return int256(price);
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
    roundId = uint80(publishTime);
    return (
      roundId,
      int256(price),
      publishTime,
      publishTime,
      roundId
    );
  }
}