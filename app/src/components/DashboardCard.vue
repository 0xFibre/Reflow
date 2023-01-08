<template>
  <v-card flat border class="mx-auto py-1">
    <v-card-text>
      <p class="mb-4">{{ title }}</p>
      <h1>{{ count }}</h1>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{ count: number; title: string }>();
</script>
