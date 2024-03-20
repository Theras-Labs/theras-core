import { createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WALLETCONNECT_ID } from "@/utils/constant/wallet-helper";
import { polygon, polygonMumbai } from "viem/chains";
import { defaultWagmiConfig, createWeb3Modal } from "@web3modal/wagmi/react";

import { Chain } from "@wagmi/core";
// const createWeb3ModalPromise = import("@web3modal/wagmi/react").then(
//   (module) => module.createWeb3Modal
// );
import { klaytnBaobab } from "viem/chains";
import {
  Areon_testnet,
  inevm_caldera,
  klaytn_testnet,
  lukso_testnet,
  viction_testnet,
} from "./custom-chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    // mainnet,
    // klaytnBaobab, //1001
    inevm_caldera,
    Areon_testnet,
    // viction_testnet,
    // klaytn_testnet,
    // lukso_testnet, //4201
    // polygonMumbai,
  ],
  [publicProvider()]
);

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
// )

// 1. Get projectId
const projectId = WALLETCONNECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: "STAR EX",
  description: "STAR EX - GAME",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 3. Create modal

export const config = defaultWagmiConfig({ chains, projectId, metadata }); //web3modal
// export const config = createConfig({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     // new CoinbaseWalletConnector({
//     //   chains,
//     //   options: {
//     //     appName: "star-ex",
//     //   },
//     // }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         // projectId: "861ef743dceed75deb813e6d390dc4a8",
//         projectId: WALLETCONNECT_ID,
//       },
//     }),
//     // new WalletConnectConnector({
//     //   chains,
//     //   options: { projectId, showQrModal: false, metadata },
//     // }),
//     // new InjectedConnector({ chains, options: { shimDisconnect: true } }),
//     // new CoinbaseWalletConnector({
//     //   chains,
//     //   options: { appName: metadata?.name ?? "Unknown" },
//     // }),
//   ],

//   publicClient,
//   webSocketPublicClient,
// });

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  // themeMode: "dark",
});
