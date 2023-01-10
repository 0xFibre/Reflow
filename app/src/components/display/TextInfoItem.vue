<template>
  <div class="my-1 d-flex justify-space-between">
    <span>{{ title }}</span>
    <span>{{ value }} </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; value: string | number | boolean }>();
</script>
