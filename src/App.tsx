import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useNetwork,
  useSendTransaction,
  usePrepareSendTransaction,
} from "wagmi";
import "./App.css";
import { BigNumber } from "ethers";

function App() {
  const { address, isConnected } = useAccount(); // Hook to get the current account address
  const { chain } = useNetwork(); //Hook to get the current network

  const {
    connect,
    connectors,
    error,
    isLoading: loading,
    pendingConnector,
  } = useConnect(); // Hook to connect to a wallet

  const { disconnect } = useDisconnect(); // Hook to disconnect the current account
  const { data: balance } = useBalance({
    addressOrName: address,
    chainId: chain?.id,
  });

  //Make Dummy transaction
  const { config } = usePrepareSendTransaction({
    request: {
      to: address as string,
      value: BigNumber.from("10000000000000000"),
    },
  });
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  return (
    <div className="App">
      <div className="card">
        {!isConnected && (
          <div>
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {loading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </button>
            ))}

            {error && <div>{error.message}</div>}
          </div>
        )}
        {isConnected && (
          <div>
            <p>Connected to {address}</p>
            <p>Chain ID: {chain?.id}</p>
            <p>Balance: {balance?.formatted}</p>
            <button onClick={() => disconnect()}>Disconnect</button>
            <div>
              <button
                disabled={!sendTransaction}
                onClick={() => sendTransaction?.()}
              >
                Send Transaction
              </button>
              {isLoading && <div>Transaction in process...</div>}
              {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
