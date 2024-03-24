import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { baseSepolia } from 'wagmi/chains';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [
    ...(process.env.NODE_ENV === "development"
      ? [baseSepolia]
      : [baseSepolia]),
  ],
  [
    jsonRpcProvider({
      rpc: (chain: any) => {
        if (chain.id === baseSepolia.id)
          return {
            http: "https://sepolia.base.org",
          };
        return null;
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
  projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };