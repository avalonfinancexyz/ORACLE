import hre from "hardhat";
import { priceIdsUSD, pythContracts } from "../../utils/constants";
import { publicClient, walletClient } from "../../chains/coredao";

async function main() {
  const args = [pythContracts.coredao];

  const contract = await hre.viem.deployContract("PythUpdater", args, {
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
