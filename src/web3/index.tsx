import { configureChains, createClient, chain } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

//Here  we can import the connectors we want to use
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from "wagmi/connectors/injected";

const { provider, chains, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli ],
  [
    infuraProvider({ apiKey: "d82179ef92ee432ea65ac418621c737d" }),
    publicProvider(),
  ]
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    //here we can  add more wallets
  ],
  provider,
  webSocketProvider,
});
