import { useAccount, useConnect, useDisconnect, useBalance, useNetwork, useSendTransaction, usePrepareSendTransaction } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import './App.css'
import { BigNumber } from 'ethers'
function App() {
  const { address, isConnected,  } = useAccount()
  const { chain } = useNetwork()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    addressOrName: address,
    chainId: 5
  })

  const { config } = usePrepareSendTransaction({
    request: { to: address as string, value: BigNumber.from('10000000000000000') },
  })
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)




  return (
    <div className="App">
      <div className="card">
      <button onClick={() => connect()}>Connect Wallet</button>
      {isConnected && <div>
        <p>
        Connected to {address}
        </p>
        <p>Chain ID: {chain?.id}</p>
        <p>Balance: {balance?.formatted}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
        <div>
      <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send Transaction
      </button>
      {isLoading && <div>Transaction in process...</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
      </div>}
      </div>
    </div>
  )
}

export default App
