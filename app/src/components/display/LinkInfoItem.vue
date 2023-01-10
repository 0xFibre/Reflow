<template>
  <div class="my-1 d-flex justify-space-between">
    <span>{{ title }}</span>
    <v-btn
      flat
      density="compact"
      class="pa-0"
      color="primary"
      variant="text"
      target="_blank"
      :href="url"
    >
      {{ value }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; url: string; value: string | number | boolean }>();
</script>
