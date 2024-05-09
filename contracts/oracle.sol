pragma solidity ^0.8.0;

contract PriceOracle {
  uint256 internal price;
  address private owner;

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


  function setPrice(uint256 _price) external isOwner {
    price = _price;
  }

  function latestAnswer() public view virtual returns (int256) {
    return int256(price);
  }
}