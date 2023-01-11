<template>
  <v-main>
    <v-container v-if="!ex.includes($route.name as string)">
      <router-view />
    </v-container>

    <router-view v-else />
  </v-main>
</template>

<script lang="ts" setup>
const ex = ["Home", "Connect"];
</script>
