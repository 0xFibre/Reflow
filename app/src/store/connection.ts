import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { connection } from "@/services";

export const useConnectionStore = defineStore("connection", {
  state: () => ({
    wallets: <any[]>[],
    connection: useLocalStorage<{
      isConnected: boolean;
      wallet: string | null;
      address: string | null;
    }>("connection", {
      isConnected: false,
      wallet: null,
      address: null,
    }),
  }),

  getters: {
    address: (state) => state.connection.address,
    isConnected: (state) => state.connection.isConnected,
    wallet: (state) => state.connection.wallet,
  },

  actions: {
    async establishConnection(name: string) {
      connection.selectAdapter(name);
      const result = await connection.connect();

      this.connection = {
        address: result.account,
        wallet: name,
        isConnected: true,
      };
    },

    async deleteConnection() {
      await connection.disconnect();

      this.connection = {
        address: null,
        wallet: null,
        isConnected: false,
      };
    },

    fetchWalletAdaptersMeta() {
      this.wallets = <any>connection.getWalletAdaptersMeta();
    },
  },
});
