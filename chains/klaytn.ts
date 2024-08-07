import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

export const klaytnChain = defineChain({
  id: 8217,
  name: "Klaytn",
  network: "Klaytn",
  nativeCurrency: {
    decimals: 18,
    name: "Klay",
    symbol: "Klay",
  },
  rpcUrls: {
    default: {
      http: ["https://public-en-cypress.klaytn.net"],
    },
    public: {
      http: ["https://public-en-cypress.klaytn.net"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://klaytnscope.com" },
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
  chain: klaytnChain,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: klaytnChain,
  transport: http(),
});
