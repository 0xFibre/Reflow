<template>
  <v-menu :activator="activator">
    <v-list>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :value="index"
        :prepend-icon="item.icon"
        :title="item.title"
      />
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
defineProps<{ activator: string }>();

const menuItems = [
  { icon: "mdi-open-in-new", title: "View on explorer" },
  { icon: "mdi-logout", title: "Disconnect" },
];
</script>
