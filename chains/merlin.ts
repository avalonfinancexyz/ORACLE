import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

export const merlinChain = defineChain({
  id: 4200,
  name: "Merlin",
  network: "Merlin",
  nativeCurrency: {
    decimals: 18,
    name: "BTC",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.merlinchain.io"],
    },
    public: {
      http: ["https://rpc.merlinchain.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://scan.merlinchain.io/" },
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
  chain: merlinChain,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: merlinChain,
  transport: http(),
});
