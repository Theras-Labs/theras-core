import React, { useEffect, useState } from "react";
import { getAptosClient } from "../../providers/chains/aptos/aptosClient";
import {
  useWallet,
  WalletReadyState,
  Wallet,
  isRedirectable,
  WalletName,
} from "@aptos-labs/wallet-adapter-react";
const aptosClient = getAptosClient();

export default function useViewAptos({
  contractAddress = "",
  contractName = "",
  functionName = "",
  args = [],
}) {
  // console.log(contractAddress, contractName, functionName, args);
  const [state, setState] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { account } = useWallet();

  useEffect(() => {
    // console.log(" aptos view");

    loadData();
    // network change need or not?
  }, [account?.address]);

  async function loadData() {
    // console.log("load aptos view");
    setLoading(true);
    try {
      const response = await viewAptos({
        contractAddress,
        contractName,
        functionName,
        args,
      });
      // console.log(response, "response aptos hook");
      setState(response);
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  }

  return {
    data: state,
    isLoading,
    loadData,
  };
}

export const viewAptos = async ({
  contractAddress = "",
  contractName = "",
  functionName = "",
  args = [],
}) => {
  return await aptosClient.view({
    payload: {
      function: `${contractAddress}::${contractName}::${functionName}`,
      functionArguments: args,
    },
  });
};
