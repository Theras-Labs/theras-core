import React, { useEffect, useState } from "react";
import {
  MOCK_ADDRESS_INVENTORY,
  MOCK_INVENTORY,
} from "../../_backend/_mockBackend/listInventory";
import { profileStore } from "./useProfile";
import { MOCK_LIST_ALL_CONTRACTS } from "../../_backend/_mockBackend/allContracts";
import { viewAptos } from "./contract/useViewAptos";
import { equipmentStore } from "./useEquipment";

// inventory require to load from backend
// need to combine and separate the NFT from different blockchain?
// combine them all in backend
export default function useInventory() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { profiles } = profileStore();
  const { equipments } = equipmentStore();

  useEffect(() => {
    // console.log(data, equipments, "data-equipmetns");
    if (data?.length && equipments?.length) {
      const updatedData = data?.map((item) => {
        if (item?.category?.toLowerCase() !== "ship") return item; // Skip

        const equipment = equipments.find(
          (equip) =>
            equip?.id === item?.id && equip?.category?.toLowerCase() === "ship"
        );
        if (equipment) {
          return { ...item, equipped: true };
        }
        return item;
      });
      // Update the state or do whatever you need with the updatedData
      // For example, if you're using hooks:
      setData(updatedData);
    }
  }, []);

  useEffect(() => {
    // load from contracts, and fetch metadata?
    // load the detail products ?
    // combined them
    async function load() {
      // load NFTs
      console.log(profiles, "profiles");
      if (!profiles?.length) return;
      profiles?.map(async (item, i) => {
        const res = await getNFTs(item?.address, item?.network);
        setData([...data, ...res]);
      });

      // 2 equips (aptos and eth)
      // category = ship, -->
      //
      // change address, the other
      // ship 0x123 eth equipped
      // change 0xAA has ship... ->
      //
      // onPlay/onLobby -> equipped -> validate on inventory (BASED ON)
      //

      // for (let i = 0; profiles?.length; i++) {
      //   const item = profiles[i];
      //   const res = await getNFTs(item?.address, item?.network);
      //   console.log(res, "res");
      //   setData([...data, ...res]);
      // }
      // setData(MOCK_INVENTORY);
    }
    load();
  }, [profiles?.length]);
  // todo: reload after changing acc
  // detect network / account change...

  return {
    data,
    isLoading,
  };
}

// category
const getAssetContracts = (network = "aptos", category = "nft") => {
  return MOCK_LIST_ALL_CONTRACTS?.filter(
    (o) => o?.network?.toLowerCase() === network
  )?.list_contracts?.filter((o) => o?.category === category);
};

// allAssetContracts as 3rd arguments instead
// move it to backend instead!
const getNFTs = async (address: string, network: string) => {
  // load network contract address;
  // dataContractAddress
  const allAssetContracts = getAssetContracts(network) as any; // [nfts,nfts,nfts_address]
  //
  const result = MOCK_ADDRESS_INVENTORY?.find(
    (o) =>
      o?.address?.toLocaleLowerCase() === address?.toLocaleLowerCase() &&
      network?.toLocaleLowerCase() === o?.network?.toLocaleLowerCase()
  )?.list as any;

  // const result = [];
  // allAssetContracts?.map((item, i) =>
  allAssetContracts?.map(async (item) => {
    if (item?.provider === "evm") {
      // load from wagmi
      // balanceOf(address)
    } else if (item?.provider === "move") {
      // load from
      // balanceOf get from
      // // getBalance yeah get from contract
      // const res = await viewAptos({
      //   contractAddress: item?.address,
      //   contractName: item?.title,
      //   functionName: item?.address,
      //   args: [address],
      // });
    }
  });
  // load each address on contracts and return inventory
  // read if contracts type evm
  // else read by Aptos
  //
  //
  // or from GRAPH

  return result;
};
