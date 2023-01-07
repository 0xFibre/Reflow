import { createRouter, createWebHistory } from "vue-router";

import Connect from "@/views/Connect.vue";
import Dashboard from "@/views/Dashboard.vue";
import Streams from "@/views/stream/Streams.vue";
import CreateStream from "@/views/stream/Create.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      { path: "/connect", name: "Connect", component: Connect },
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/stream/create", name: "CreateStream", component: CreateStream },
      { path: "/streams/:type", name: "Streams", component: Streams },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
