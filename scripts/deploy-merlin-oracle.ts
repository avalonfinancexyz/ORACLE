import hre from "hardhat";
import {
  AddressConfig,
  merlinPoolAddresses,
  priceIdsUSD,
  pythContracts,
} from "../utils/constants";
import { publicClient, walletClient } from "../chains/merlin";

async function main() {
  const chainId = await publicClient.getChainId();
  const btcOracle = AddressConfig[chainId].BTCFeed;
  const merlinOracle = AddressConfig[chainId].merlinOracle;
  const args = [btcOracle, merlinOracle, merlinPoolAddresses.MNER];

  const contract = await hre.viem.deployContract("merlinSwapPoolOracle", args, {
    publicClient: publicClient,
    walletClient: walletClient,
  });
  console.log(`deployed to`, contract.address);

  // verify contract for tesnet & mainnet
  if (process.env.NODE_ENV != "test") {
    // Verify contract programmatically
    await hre.run("verify:verify", {
      address: contract.address,
      constructorArguments: args,
    });
  } else {
    console.log(`Contract not verified, deployed locally.`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
