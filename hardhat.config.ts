import { arbitrum } from "./node_modules/viem/chains/definitions/arbitrum";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-etherscan";
import "hardhat-dependency-compiler";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  w3f: {
    rootDir: "./web3-functions",
    networks: ["merlin", "merlin_test"],
  },
  solidity: "0.8.24",
  defaultNetwork: "merlin",
  dependencyCompiler: {
    paths: ["@api3/contracts/v0.8/interfaces"],
  },
  networks: {
    hardhat: {
      accounts: [],
    },
    merlin: {
      url: "https://rpc.merlinchain.io",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
      chainId: 4200,
    },
    merlin_test: {
      url: "https://testnet-rpc.merlinchain.io",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
      chainId: 686868,
    },
    bitlayer: {
      url: "https://rpc.bitlayer-rpc.com",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
      chainId: 200901,
    },
    bitlayer_test: {
      url: "https://testnet-rpc.bitlayer-rpc.com",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
      chainId: 200810,
    },
    coredao: {
      url: "https://core.drpc.org",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
      chainId: 1116,
    },
    arbitrumOne: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
      chainId: 42161,
    },
    klaytn: {
      url: "https://public-en-cypress.klaytn.net",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
      chainId: 8217,
    },
  },
  etherscan: {
    apiKey: {
      manta: process.env.MERLIN_API_KEY || "abc",
      merlin: "abc",
      merlin_test: "abc",
      bitlayer: "abc",
      bitlayer_test: "abc",
      klaytn: "abc",
      coredao: process.env.COREDAO_API_KEY || "abc",
      arbitrumOne: process.env.ARB_API_KEY || "abc",
    },
    customChains: [
      {
        network: "merlin",
        chainId: 4200,
        urls: {
          apiURL: "https://scan.merlinchain.io/api/contract",
          browserURL: "https://scan.merlinchain.io/",
        },
      },
      {
        network: "merlin_test",
        chainId: 686868,
        urls: {
          apiURL: "https://scan.merlinchain.io/api/contract",
          browserURL: "https://scan.merlinchain.io/",
        },
      },
      {
        network: "bitlayer",
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com/",
        },
      },
      {
        network: "bitlayer_test",
        chainId: 200810,
        urls: {
          apiURL: "https://api-testnet.btrscan.com/scan/api",
          browserURL: "https://testnet.btrscan.com/",
        },
      },
      {
        network: "coredao",
        chainId: 1116,
        urls: {
          apiURL: "https://openapi.coredao.org/api",
          browserURL: "https://scan.coredao.org/",
        },
      },
      {
        network: "klaytn",
        chainId: 8217,
        urls: {
          apiURL: "https://api-cypress.klaytnscope.com/api",
          browserURL: "https://klaytnscope.com/",
        },
      },
    ],
  },
};

export default config;
