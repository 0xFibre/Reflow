<template>
  <v-app>
    <default-bar v-if="!ex.includes($route.name as string)" />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";

const ex = ["Home", "Connect"];
</script>
