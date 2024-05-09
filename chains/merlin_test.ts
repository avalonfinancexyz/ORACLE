import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
export const merlinTestChain = defineChain({
  id: 686868,
  name: "MerlinTestnet",
  network: "Merlin-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BTC",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.merlinchain.io"],
    },
    public: {
      http: ["https://testnet-rpc.merlinchain.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet-scan.merlinchain.io/" },
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
  chain: merlinTestChain,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: merlinTestChain,
  transport: http(),
});
