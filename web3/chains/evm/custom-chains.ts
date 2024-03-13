import { Chain } from "@wagmi/core";
// const createWeb3ModalPromise = import("@web3modal/wagmi/react").then(
//   (module) => module.createWeb3Modal
// );

export const Areon_testnet = {
  id: 462,
  name: "Areon Testnet",
  network: "Areon",
  nativeCurrency: {
    decimals: 18,
    name: "TAREA",
    symbol: "TAREA",
  },
  rpcUrls: {
    public: { http: ["https://testnet-rpc.areon.network/"] },
    default: { http: ["https://testnet-rpc.areon.network/"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Explorer",
      url: "https://areonscan.com",
    },
    default: {
      name: "Explorer",
      url: "https://areonscan.com",
    },
  },
} as const satisfies Chain;
export const inevm_caldera = {
  id: 11822,
  name: "Artela testnet",
  network: "ARTELA",
  nativeCurrency: {
    decimals: 18,
    name: "ART",
    symbol: "ART",
  },
  rpcUrls: {
    public: { http: ["https://betanet-rpc1.artela.network/"] },
    default: { http: ["https://betanet-rpc1.artela.network/"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Explorer",
      url: "https://betanet-scan.artela.network/",
    },
    default: {
      name: "Explorer",
      url: "https://betanet-scan.artela.network/",
    },
  },
} as const satisfies Chain;

export const viction_testnet = {
  id: 89,
  name: "New Viction Testnet",
  network: "New Viction Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "VIC",
    symbol: "VIC",
  },
  rpcUrls: {
    public: { http: ["https://rpc-testnet.viction.xyz"] },
    default: { http: ["https://rpc-testnet.viction.xyz"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Explorer",
      url: "https://testnet.vicscan.xyz/",
    },
    default: {
      name: "Explorer",
      url: "https://testnet.vicscan.xyz/",
    },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;

export const klaytn_testnet = {
  id: 1001,
  name: "Chain 1001",
  network: "Chain 1001",
  nativeCurrency: {
    decimals: 18,
    name: "KLAY",
    symbol: "KLAY",
  },
  rpcUrls: {
    public: { http: ["https://public-en-baobab.klaytn.net"] },
    default: { http: ["https://public-en-baobab.klaytn.net"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Explorer",
      url: "",
    },
    default: {
      name: "Explorer",
      url: "",
    },
  },
} as const satisfies Chain;

export const exzo_testnet = {
  id: 2370,
  name: "Exzo T",
  network: "Exzo",
  nativeCurrency: {
    decimals: 18,
    name: "XZO",
    symbol: "XZO",
  },
  rpcUrls: {
    public: { http: ["https://evm-test.exzo.network"] },
    default: { http: ["https://evm-test.exzo.network"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Explorer",
      url: "",
    },
    default: {
      name: "Explorer",
      url: "",
    },
  },
} as const satisfies Chain;
