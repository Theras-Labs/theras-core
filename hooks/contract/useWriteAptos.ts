import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getAptosClient } from "@/_core/providers/chains/aptos/aptosClient";
const aptosClient = getAptosClient();

export default function useWriteAptos({
  contractAddress = "",
  contractName = "",
  functionName = "",
  args = [],
}) {
  // reconnect = () => {}

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { account, network, signAndSubmitTransaction } = useWallet();

  const write = async () => {
    if (!account || !network) return;
    // if not connected -> pop up modal

    setLoading(true);
    setError(null);
    setData(null);

    const payload = {
      type: "entry_function_payload",
      function: `${contractAddress}::${contractName}::${functionName}`,
      type_arguments: [],
      arguments: args,
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await aptosClient.waitForTransaction({
        transactionHash: response.hash,
      });
      setData(response);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    isLoading,
    // isSuccess,
    write,
    error,
  };
}
