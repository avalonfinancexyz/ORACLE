import hre from "hardhat";
import { priceIdsUSD, pythContracts } from "../utils/constants";
import { publicClient, walletClient } from "../chains/merlin";

async function main() {
  const args = [pythContracts.merlin];

  const contract = await hre.viem.deployContract("PythUpdater", args, {
    publicClient: publicClient,
    walletClient: walletClient,
  });
  console.log(`deployed to`, contract.address);

  // verify contract for tesnet & mainnet
  if (process.env.NODE_ENV != "test") {
    // Verify contract programmatically
    await hre.run("verify:verify", {
      address: "0x0cf6f1b8e611196bb0df2fadef63790cc6ba84da", //contract.address,
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
