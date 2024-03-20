import { TOwnedProduct } from "@/_type/Product";
import React, { useEffect } from "react";
import { create } from "zustand";
import useInventory from "./useInventory";
import { profileStore } from "./useProfile";
// from useInventory
// load from BE, cookie first for now or storage
// load NFTs from contracts
// store it into BEs

// Function to check if local storage is available
const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
};
const initialEquipments = isLocalStorageAvailable()
  ? // with address + network + category
    JSON.parse(localStorage.getItem("equipments")) || []
  : [];

// const validateStorage = () =>

// with account ID:
export default function useEquipment() {
  const { data: dataInventory } = useInventory();

  // reload when account or wallet change too
  useEffect(() => {
    // todo: check starship loadout here
    if (dataInventory?.length) {
      // onPlay/onLobby -> equipped -> validate on inventory
      // equipment changing
      //
      // check and validate the storage
    }
    // load from cookie -> network + address same
    // check on inventory (validate) -> isExist
  }, []);
}

// when load inventory product -> NFTs
// ---save it into LocalStorage/BE
// onGameplayBegin -> validate again.

// set it with account owner

export const equipmentStore = create((set, get) => {
  return {
    set,
    get,
    equipments: [], // let it persist dc accounts too?
    getEquipments: () => {
      try {
        // Load equipment names from storage
        const payloadEquipments = getStorage("EQUIPMENTS_ARRAY");
        const result = [];

        if (payloadEquipments && payloadEquipments.length) {
          payloadEquipments?.forEach((item) => {
            // Retrieve equipment data for each item
            const equipmentData = getStorage(item);
            if (equipmentData) {
              result.push(equipmentData);
            }
          });
        }

        return result;
      } catch (error) {
        // Handle errors appropriately (e.g., log the error)
        console.error("Error retrieving equipment data:", error);
        return []; // Return an empty array in case of error
      }
    },
    getEquippedAsset: (category: string) => {
      //
    },
    setEquipments: (equipments: TOwnedProduct) => {
      set({ equipments });
    },
    addEquipment: (nft: TOwnedProduct, address, network) => {
      // cannot have same category
      // if(nft?.category) //
      // get().removeEquipment(nft);
      // // to localStorage
      const PAYLOAD_NAME = `${address}_${nft?.minted?.network}_${nft?.category}_${nft?.id}`;
      const payload = {
        ...nft,
        owner: address,
        network: nft?.minted?.network,
      };

      setStorage(PAYLOAD_NAME, payload);

      set({ equipments: [...get().equipments, payload] });

      // Determine the pattern to search for existing entries
      const pattern = `${address}_${nft?.minted?.network}_${nft?.category}_`;

      // Retrieve the array of previously stored equipment entries
      const payloadEquipments = getStorage("EQUIPMENTS_ARRAY");

      // if not null
      if (!!payloadEquipments?.length) {
        let fullString = "";
        const updatedEquipments = payloadEquipments?.filter((entry) => {
          if (entry.startsWith(pattern)) {
            fullString = entry;
            return false; // Exclude this entry from updatedEquipments
          }
          return true; // Include other entries
        });

        // Remove the corresponding Local Storage entry
        if (fullString !== "") {
          removeStorage(fullString);
        }

        // Update the main array state with the combined result
        setStorage("EQUIPMENTS_ARRAY", [...updatedEquipments, PAYLOAD_NAME]);
      } else {
        // If there are no previous equipment entries, just add the new equipment entry to the main array state
        setStorage("EQUIPMENTS_ARRAY", [PAYLOAD_NAME]);
      }
    },
    removeEquipment: (nft: TOwnedProduct, address, network) => {
      try {
        // Determine the pattern to search for existing entries
        const pattern = `${address}_${nft?.minted?.network}_${nft?.category}_`;

        // Retrieve the array of previously stored equipment entries
        const payloadEquipments = getStorage("EQUIPMENTS_ARRAY");

        if (payloadEquipments && payloadEquipments?.length) {
          // Find and remove the equipment entry that matches the pattern
          const updatedEquipments = payloadEquipments?.filter(
            (entry) => !entry.startsWith(pattern)
          );

          // Update the main array state without the removed equipment
          setStorage("EQUIPMENTS_ARRAY", updatedEquipments);

          // Iterate over the removed equipment entries and remove them from Local Storage
          payloadEquipments?.forEach((entry) => {
            if (entry.startsWith(pattern)) {
              removeStorage(entry);
            }
          });
        }
      } catch (error) {
        // Handle errors appropriately (e.g., log the error)
        console.error("Error removing equipment:", error);
      }
    },
    isEquipped: (nft) => {
      // load supposed profile
      const account = profileStore
        ?.getState()
        .getProfileNetwork(nft?.minted?.network);

      // // read from equipments array
      const PAYLOAD_NAME = `${account?.address}_${nft?.minted?.network}_${nft?.category}_${nft?.id}`;
      const res = getStorage(PAYLOAD_NAME);

      if (res) {
        return true;
      }

      return false;
    },
    loadEquipment: (address, network, category) => {
      try {
        // Get all equipped equipment names
        const allEquipped = get()?.getEquipments() as string[];
        if (!allEquipped || !Array.isArray(allEquipped)) {
          console.error("Error: Unable to retrieve equipped equipment names.");
          return null;
        }
        console.log(allEquipped, "allEquipped", address, network, category);
        const result = allEquipped?.find((item) => {
          // item?.owner === address &&
          return (
            item?.minted?.network === network &&
            item?.category?.toLocaleLowerCase() ===
              category?.toLocaleLowerCase()
          );
        });
        console.log(result, "result");

        if (result) {
          return result;
        } else return null;
      } catch (error) {
        // Handle errors appropriately (e.g., log the error)
        console.error("Error loading equipment:", error);
        return null;
      }
    },
    isExist: (nft) => {
      // read from equipments array
    },
  };
});

const getStorage = (name) => {
  const storedData = localStorage?.getItem(name);
  return storedData ? JSON.parse(storedData) : null;
};

const setStorage = (name, value) => {
  return localStorage?.setItem(name, JSON.stringify(value));
};

const removeStorage = (name) => {
  localStorage?.removeItem(name);
};
