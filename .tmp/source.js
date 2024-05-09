// web3-functions/smart-pyth-oracle/index.ts
import {
  Web3Function
} from "@gelatonetwork/web3-functions-sdk";
import { utils } from "ethers";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
Web3Function.onRun(async (context) => {
  const { userArgs, storage } = context;
  const {
    priceIds: _priceIds,
    duration: _duration,
    updater: _updater
  } = userArgs;
  const priceIds = _priceIds;
  const duration = Number(_duration);
  const updater = String(_updater);
  const lastUpdatedAt = Number(
    JSON.parse(await storage.get("lastUpdatedAt") ?? "0")
  );
  if (Date.now() - lastUpdatedAt < duration)
    return {
      canExec: false,
      message: "cannot update now. time less than min"
    };
  const connection = new EvmPriceServiceConnection(
    "https://hermes.pyth.network"
    // https://docs.pyth.network/documentation/pythnet-price-feeds/price-service
  );
  const check = await connection.getLatestPriceFeeds(priceIds);
  if (check.length == 0 || check[0].price == void 0 || check[0].price.price == void 0) {
    return { canExec: false, message: "No price available" };
  }
  const iface = new utils.Interface([
    "function updateFeeds(bytes[] calldata priceUpdateData) public payable"
  ]);
  let updatePriceData = await connection.getPriceFeedsUpdateData(priceIds);
  const data = iface.encodeFunctionData("updateFeeds", [updatePriceData]);
  const callData = [
    {
      to: updater,
      data
    }
  ];
  console.log(`Updating Price and timestamp: ${Date.now()}`);
  await storage.set("lastUpdatedAt", JSON.stringify(Date.now()));
  return {
    canExec: true,
    callData
  };
});
