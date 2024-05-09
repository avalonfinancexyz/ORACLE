import hre from "hardhat";
import {
  TriggerType,
  AutomateSDK,
  Web3Function,
} from "@gelatonetwork/automate-sdk";
import { AddressConfig } from "../utils/constants";

const { ethers, w3f } = hre;

const main = async () => {
  const chainId = (await ethers.provider.getNetwork()).chainId;
  const oracle = await ethers.getContractAt(
    "PythAggregatorV3",
    AddressConfig[chainId].PriceUpdater
  );
  const oracleW3f = w3f.get("smart-pyth-oracle");

  let [deployer] = await ethers.getSigners();

  const automate = new AutomateSDK(chainId, deployer);
  const web3Function = new Web3Function(chainId, deployer);

  // Deploy Web3Function on IPFS
  console.log("Deploying Web3Function on IPFS...");
  const cid = await oracleW3f.deploy();
  console.log(`Web3Function IPFS CID: ${cid}`);

  // Create task using automate sdk
  console.log("Creating automate task...");
  const { taskId, tx } = await automate.createBatchExecTask({
    name: "Web3Function - Eth Oracle",
    web3FunctionHash: cid,
    web3FunctionArgs: {
      oracle: oracle.address,
      currency: "ethereum",
    },
    trigger: {
      type: TriggerType.TIME,
      interval: 60,
    },
  });
  await tx.wait();
  console.log(`Task created, taskId: ${taskId} (tx hash: ${tx.hash})`);

  // Set task specific secrets
  const secrets = oracleW3f.getSecrets();
  if (Object.keys(secrets).length > 0) {
    await web3Function.secrets.set(secrets, taskId);
    console.log(`Secrets set`);
  }
};

main()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
