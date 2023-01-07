<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      Slide Cash
    </v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list nav>
      <template v-for="item in items">
        <v-list-item
          color="primary"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.path"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let drawer = ref(null);
const items = [
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: "mdi-arrow-bottom-left-thick",
    title: "Incoming Streams",
    path: "/streams/incoming",
  },
  {
    icon: "mdi-arrow-top-right-thick",
    title: "Outgoing Streams",
    path: "/streams/outgoing",
  },
];
</script>
