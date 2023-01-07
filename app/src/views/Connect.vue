<template>
  <v-row class="mt-10">
    <v-col md="6" sm="8" class="mx-auto">
      <h3 class="my-3">Connect your wallet</h3>
      <v-list>
        <v-list-item
          v-for="(wallet, i) in state.wallets"
          :key="i"
          :value="wallet"
          class="my-3 pa-3"
          border
          @click="connect(wallet.name)"
        >
          <template v-slot:prepend>
            <v-avatar size="30">
              <v-img :src="wallet.icon" :alt="wallet.name" />
            </v-avatar>
          </template>

          <v-list-item-title v-text="wallet.name" />
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { connection } from "@/utils";
import { useConnectionStore } from "@/store";
import { onMounted, reactive } from "vue";

const connectionStore = useConnectionStore();
const state: any = reactive({ wallets: [{ icon: "" }] });

onMounted(() => {
  state.wallets = connection.getWalletAdaptersMeta();
});

async function connect(name: string) {
  connection.selectAdapter(name);

  const result = await connection.connect();
  connectionStore.persistConnection(result.account, name);
}
</script>
