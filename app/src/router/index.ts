import { createRouter, createWebHistory } from "vue-router";

import Connect from "@/views/Connect.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      { path: "/connect", name: "Connect", component: Connect },
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
