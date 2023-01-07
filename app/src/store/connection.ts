import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useConnectionStore = defineStore("connection", {
  state: () =>
    useLocalStorage<{
      isConnected: boolean;
      wallet: string | null;
      address: string | null;
    }>("connection", { isConnected: false, wallet: null, address: null }),
  actions: {
    persistConnection(address: string, wallet: string) {
      this.address = address;
      this.wallet = wallet;
      this.isConnected = true;
    },
  },
});
