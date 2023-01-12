<template>
  <v-menu :activator="activator">
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="item.action"
      />
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
defineProps<{
  activator: string;
  items: {
    title: string;
    icon: string;
    action: Function;
  }[];
}>();
</script>
