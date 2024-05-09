import hre from "hardhat";
import { AddressConfig, priceIdsUSD } from "../utils/constants";
import { PriceFeed, EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { publicClient, walletClient } from "../chains/merlin";

// .5%
const minChangeRate = 0.995;
const maxChangeRate = 1.005;
let lastUpdatedAt = 0;
let lastPriceData: PriceFeed[] = [];

function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

async function main() {
  while (true) {
    try {
      let needUpdate = false;
      const chainId = await publicClient.getChainId();
      const contract = await hre.viem.getContractAt(
        "PythAggregatorV3",
        AddressConfig[chainId].PriceUpdater,
        {
          publicClient: publicClient,
          walletClient: walletClient,
        }
      );

      const updateData = [
        // priceIdsUSD.eth,
        priceIdsUSD.usdc,
        priceIdsUSD.usdt,
        priceIdsUSD.btc,
        priceIdsUSD.ordi,
        priceIdsUSD.merl,
      ];

      const connection = new EvmPriceServiceConnection(
        "https://hermes.pyth.network"
      ); // See Hermes endpoints section below for other endpoints

      const priceData: PriceFeed[] =
        (await connection.getLatestPriceFeeds(updateData)) ?? [];

      for (const [index, value] of priceData.entries()) {
        if (lastPriceData.length == 0) {
          needUpdate = true;
          break;
        }
        const oldPrice = Number(
          lastPriceData[index].getPriceNoOlderThan(6000)?.price ?? "0"
        );

        if (oldPrice == 0) {
          needUpdate = true;
          break;
        }
        const newPrice = Number(value.getPriceNoOlderThan(60)?.price ?? "0");
        console.log("old price", oldPrice, "new price", newPrice);
        if (oldPrice == 0 || newPrice == 0) {
          // lastPriceData = priceData;
          break;
        }
        if (
          oldPrice / newPrice <= minChangeRate ||
          oldPrice / newPrice >= maxChangeRate
        ) {
          needUpdate = true;
        }
      }
      if (needUpdate) {
        const priceUpdateData = (await connection.getPriceFeedsUpdateData(
          updateData
        )) as any;

        console.log("update data", priceUpdateData);

        // const d = await hre.viem.getWalletClient(
        //   "0x0F6e98A756A40dD050dC78959f45559F98d3289d"
        // );

        // const t = await d.sendTransaction({
        //   to: d.account.address,
        //   data: "0x",
        //   gasPrice: "50000000000",
        //   nonce: "170",
        // });
        // console.log(t);

        const tx = await contract.write.updateFeeds([priceUpdateData], {
          value: 1000000000n,
          gasPrice: 60000000,
          // nonce: "166",
        });
        lastPriceData = Array.from(priceData);
        console.log(`tx`, tx);
      } else {
        console.log(`no update at`, new Date());
      }
    } catch (err) {
      console.log(err);
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
