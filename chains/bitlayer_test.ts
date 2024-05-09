import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

export const bitlayerTestChain = defineChain({
  id: 200810,
  name: "BitlayerTest",
  network: "BitlayerTest",
  nativeCurrency: {
    decimals: 18,
    name: "BTC",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bitlayer-rpc.com"],
    },
    public: {
      http: ["https://testnet-rpc.bitlayer-rpc.com"],
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
  chain: bitlayerTestChain,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: bitlayerTestChain,
  transport: http(),
});
