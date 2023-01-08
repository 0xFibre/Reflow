<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { connection } from "@/services";
import { useConnectionStore } from "@/store";
import { storeToRefs } from "pinia";

const { isConnected, wallet } = storeToRefs(useConnectionStore());

onMounted(async () => {
  if (isConnected.value && !connection.isConnected()) {
    connection.selectAdapter(wallet.value!);
    await connection.connect();
  }
});
</script>
