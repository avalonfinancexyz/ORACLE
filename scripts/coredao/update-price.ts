import hre from "hardhat";
import { AddressConfig, priceIdsUSD } from "../../utils/constants";
import { PriceFeed, EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { publicClient, walletClient } from "../../chains/coredao";

// .5%
const minChangeRate = 0.995;
const maxChangeRate = 1.005;
let lastPriceData: PriceFeed[] = [];
// force update;
let force = true;

function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

async function main() {
  const chainId = await publicClient.getChainId();
  const contract = await hre.viem.getContractAt(
    "OracleUpdater",
    AddressConfig[chainId].PriceUpdater,
    {
      publicClient: publicClient,
      walletClient: walletClient,
    }
  );
  while (true) {
    let needUpdate = false;
    let updateId = [];
    let updatePrice = [];
    try {
      const updateData = [
        priceIdsUSD.usdc,
        priceIdsUSD.usdt,
        priceIdsUSD.btc,
      ];

      const connection = new EvmPriceServiceConnection(
        "https://hermes.pyth.network"
      ); // See Hermes endpoints section below for other endpoints

      const priceData: PriceFeed[] =
        (await connection.getLatestPriceFeeds(updateData)) ?? [];

      if (lastPriceData.length == 0) {
        lastPriceData = Array.from(priceData);
      }

      for (const [index, value] of priceData.entries()) {
        const oldPrice = Number(
          lastPriceData[index].getPriceNoOlderThan(6000)?.price ?? "0"
        );

        if (oldPrice == 0) {
          break;
        }
        const newPrice = Number(value.getPriceNoOlderThan(60)?.price ?? "0");

        console.log("old price", oldPrice, "new price", newPrice);
        if (oldPrice == 0 || newPrice == 0) {
          // lastPriceData = priceData;
          break;
        }
        if (
          force ||
          oldPrice / newPrice <= minChangeRate ||
          oldPrice / newPrice >= maxChangeRate
        ) {
          needUpdate = true;
          updateId.push(`0x${value.id.toString()}`);
          updatePrice.push(newPrice);
          lastPriceData = Array.from(priceData);
        }
      }
    } catch (err) {
      console.log(err);
    }
    if (needUpdate) {
      console.log(updateId, updatePrice);
      const tx = await contract.write.setPrice([updateId, updatePrice], {
        // nonce: "166",
      });
      console.log(`tx`, tx);
      force = false;
    }
    await sleep(10);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
