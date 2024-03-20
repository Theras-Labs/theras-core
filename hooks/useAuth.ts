import React from "react";
import { create } from "zustand";

// describe authenticated here
// google provider, and multiple wallet connections
// connected with profile
// gameID
export default function useAuth() {
  //
  return {
    profiles: [],
  };
}

export const authStore = create((set, get) => {
  return {
    set,
    get,
    isModalReveal: false,
    setModalReveal: (v: boolean) => set({ isModalReveal: v }),
    profiles: [],
    addProfile: (profiles: any) => {
      set({
        profiles,
      });
    },
    removeProfile: (profiles: any) => {
      set({
        profiles,
      });
    },
    // check already exist or not
    // }
    // checkExist : (_id: number) => {
    // }
  };
});
