<template>
  <v-card flat border class="mx-auto py-1">
    <v-card-text>
      <p class="mb-4">{{ title }}</p>

      <Loader v-if="loading" />
      <h1 v-else>{{ count }}</h1>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import Loader from "./Loader.vue";

defineProps<{ count: number; title: string; loading: boolean }>();
</script>
