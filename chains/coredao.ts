import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

export const coredaoChain = defineChain({
  id: 1116,
  name: "Coredao",
  network: "Coredao",
  nativeCurrency: {
    decimals: 18,
    name: "CORE",
    symbol: "CORE",
  },
  rpcUrls: {
    default: {
      http: ["https://core.drpc.org"],
    },
    public: {
      http: ["https://core.drpc.org"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "http://scan.coredao.org/" },
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
  chain: coredaoChain,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: coredaoChain,
  transport: http(),
});
