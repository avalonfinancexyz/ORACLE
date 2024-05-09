import hre from "hardhat";
import { publicClient, walletClient } from "../../chains/bitlayer";
import { AddressConfig } from "../../utils/constants";

async function main() {
  const chainId = await publicClient.getChainId();
  const contract = await hre.viem.deployContract("TempOralce", [], {
    publicClient: publicClient,
    walletClient: walletClient,
    maxFeePerGas: 100000008,
    maxPriorityFeePerGas: 100000008,
  });
  console.log(`deployed to`, contract.address);

  const tx = await contract.write.setUpdater(
    [AddressConfig[chainId].PriceUpdater],
    {
      maxFeePerGas: 100000008,
      maxPriorityFeePerGas: 100000008,
    }
  );

  console.log("setUpdater", tx);

  // verify contract for tesnet & mainnet
  if (process.env.NODE_ENV != "test") {
    // Verify contract programmatically
    await hre.run("verify:verify", {
      address: contract.address,
      constructorArguments: [],
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
