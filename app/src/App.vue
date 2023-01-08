<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { connection } from "@/services";
import { useConnectionStore } from "@/store";

const store = useConnectionStore();

onMounted(async () => {
  if (store.isConnected && !connection.isConnected()) {
    connection.selectAdapter(store.wallet!);
    await connection.connect();
  }
});
</script>
