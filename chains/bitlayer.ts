import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

export const bitlayerChain = defineChain({
  id: 200901,
  name: "Bitlayer",
  network: "Bitlayer",
  nativeCurrency: {
    decimals: 18,
    name: "BTC",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.bitlayer-rpc.com"],
    },
    public: {
      http: ["https://rpc.bitlayer-rpc.com"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://www.btrscan.com/" },
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
  chain: bitlayerChain,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: bitlayerChain,
  transport: http(),
});
