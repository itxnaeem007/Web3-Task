import {  configureChains, createClient, chain } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'

const { provider } = configureChains(
    [chain.mainnet, chain.goerli],
    [infuraProvider({ apiKey: 'd82179ef92ee432ea65ac418621c737d' })],
)
  
export const client = createClient({
 autoConnect: true,
 provider
})