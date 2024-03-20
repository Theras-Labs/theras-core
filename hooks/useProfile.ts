import React, { useEffect } from "react";
import { create } from "zustand";
import {
  useAccount as useAccountWagmi,
  useNetwork as useNetworkWagmi,
} from "wagmi";
import {
  AccountInfo,
  NetworkInfo,
  WalletInfo,
} from "@aptos-labs/wallet-adapter-core";
import { useWallet as useWalletAptos } from "@aptos-labs/wallet-adapter-react";
import { CHAIN_NAME_APTOS } from "@/_ui/Auth/Wallets/AptosWallet";

// describe account profiles here
// gameID
export default function useProfile() {
  //
  const { address: addressEVM } = useAccountWagmi();
  const { chain: chainEVM } = useNetworkWagmi();
  const { account: accountAptos } = useWalletAptos();
  const { addProfile, profileExists, getProfileProvider, removeProfile } =
    profileStore();

  useEffect(() => {
    // detect disconnect wagmi
    const _profileNow = getProfileProvider("EVM");
    if (!addressEVM && _profileNow) {
      removeProfile(_profileNow);
    }
  }, [addressEVM]);

  useEffect(() => {
    // check profile on store/backend exist
    // check wagmi
    if (addressEVM && !profileExists(chainEVM?.name, addressEVM)) {
      // store it to global state
      // load profile Name, balance, etc
      addProfile({
        provider: "EVM",
        address: addressEVM,
        network: chainEVM?.name,
        chainId: chainEVM?.id,
      });
    }
    // check aptos
    if (
      accountAptos &&
      !profileExists(CHAIN_NAME_APTOS, accountAptos?.address)
    ) {
      // store it to global state
      // load profile Name, balance, etc
      addProfile({
        provider: "move",
        address: accountAptos?.address,
        network: CHAIN_NAME_APTOS,
      });
    }
  }, [chainEVM, addressEVM, accountAptos]);
}

type TProfile = {
  chainId?: string | number;
  network: string;
  provider: string;
  address: string;
};

// load from backend
export const profileStore = create((set, get) => {
  return {
    set,
    get,
    isModalLogin: false,
    setModalLogin: (v: boolean) => set({ isModalLogin: v }),
    // loadProfiles:// -> check connected accounts
    profiles: [],
    addProfile: (profile: TProfile) => {
      // Remove existing profile with the same network, if exists
      get().removeProfile(profile);
      // Add the new profile
      set({ profiles: [...get().profiles, profile] });
    },
    removeProfile: (profile: TProfile) => {
      // Remove the profile from profiles array
      const updatedProfiles = get().profiles.filter(
        (p: TProfile) => p.network !== profile.network
      );
      console.log("removing", updatedProfiles);
      set({ profiles: updatedProfiles });
    },
    profileExists: (network: string, address: string): boolean => {
      return get().profiles.some(
        (profile: TProfile) =>
          profile.network === network && profile.address === address
      );
    },
    getProfileProvider: (provider: string): TProfile | undefined => {
      return get().profiles.find(
        (profile: TProfile) => profile.provider === provider
      );
    },
    getProfileNetwork: (network: string) => {
      return get().profiles.find(
        (profile: TProfile) => profile.network === network
      );
    },
  };
});
