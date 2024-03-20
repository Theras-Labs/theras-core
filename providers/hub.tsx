import { WagmiConfig } from "wagmi";
import { config } from "./chains/evm/wagmi-provider";
import { StarknetProvider } from "./chains/starknet/starknet-provider";
import { AptosProvider } from "./chains/aptos/aptos-provider";

export default function HubProvider({ children }) {
  return (
    <>
      <StarknetProvider>
        <AptosProvider>
          <WagmiConfig config={config}>{children}</WagmiConfig>
        </AptosProvider>
      </StarknetProvider>
    </>
  );
}
