import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

export const arbitrumChain = defineChain({
  id: 42161,
  name: "Arbitrum",
  network: "Arbitrum",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"],
    },
    public: {
      http: ["https://arb1.arbitrum.io/rpc"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://arbiscan.io/" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 5882,
    },
  },
});

const account = privateKeyToAccount(
  `${process.env.WALLET_PRIVATE_KEY}` as `0x${string}`
);

export const publicClient = createPublicClient({
  chain: arbitrumChain,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: arbitrumChain,
  transport: http(),
});
