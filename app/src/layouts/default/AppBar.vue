<template>
  <v-navigation-drawer v-model="drawer">
    <v-list nav>
      <template v-for="item in items">
        <v-list-item
          rounded="shaped"
          color="primary"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.path"
        />
      </template>

      <v-divider class="my-5" />

      <v-list-item
        rounded="shaped"
        color="primary"
        prepend-icon="mdi-plus"
        title="Create Stream"
        to="/stream/create"
      />
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block flat color="secondary"> Disconnect </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar flat>
    <v-app-bar-nav-icon
      class="d-block d-md-none"
      variant="text"
      @click.stop="drawer = !drawer"
    />

    <v-app-bar-title> Slide Cash </v-app-bar-title>

    <v-spacer />

    <v-btn
      id="menu-activator"
      rounded
      flat
      variant="tonal"
      prepend-icon="mdi-account-circle-outline"
    >
      {{ connection.address ? utils.truncateAddress(connection.address) : "" }}
    </v-btn>

    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useConnectionStore } from "@/store";
import { utils } from "@/utils";
import { ref, Ref } from "vue";

const connection = useConnectionStore();

let drawer: Ref<boolean | null> = ref(null);
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
