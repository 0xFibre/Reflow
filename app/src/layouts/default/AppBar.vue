<template>
  <v-navigation-drawer v-model="drawer">
    <div class="text-center my-3 no-select">
      <h2>Reflow</h2>
    </div>

    <v-list nav>
      <template v-for="item in sideBarItems">
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
        <v-btn block flat color="secondary" @click="disconnect">
          Disconnect
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar flat>
    <v-app-bar-nav-icon
      class="d-block d-lg-none"
      variant="text"
      @click.stop="drawer = !drawer"
    />

    <v-app-bar-title class="d-block d-lg-none no-select">
      <h3>Reflow</h3>
    </v-app-bar-title>

    <v-spacer />

    <div class="d-block d-sm-none">
      <v-btn id="menu-activator" flat icon="mdi-account-circle-outline" />
      <AppBarMenu :items="menuItems" activator="#menu-activator" />
    </div>

    <div class="d-none d-sm-block me-5">
      <v-btn
        id="menu-activator-sm"
        rounded
        flat
        prepend-icon="mdi-account-circle-outline"
      >
        {{ address ? utils.truncate0x(address) : "" }}
      </v-btn>

      <AppBarMenu :items="menuItems" activator="#menu-activator-sm" />
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import AppBarMenu from "@/components/menu/AppBarMenu.vue";
import { useConnectionStore } from "@/store";
import { utils } from "@/utils";
import { storeToRefs } from "pinia";
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";

const connectionStore = useConnectionStore();
const { address } = storeToRefs(connectionStore);
const router = useRouter();

let drawer: Ref<boolean | null> = ref(null);
const sideBarItems = [
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
const menuItems = [
  { icon: "mdi-open-in-new", title: "View on explorer", action: openExplorer },
  { icon: "mdi-logout", title: "Disconnect", action: disconnect },
];

async function disconnect() {
  await connectionStore.deleteConnection(router);
}

function openExplorer() {
  window.open(`https://explorer.sui.io/address/${address.value}`);
}
</script>
