import { createRouter, createWebHistory } from "vue-router";

import Connect from "@/views/Connect.vue";
import Dashboard from "@/views/Dashboard.vue";
import Streams from "@/views/stream/Streams.vue";
import CreateStream from "@/views/stream/Create.vue";
import GetStream from "@/views/stream/Stream.vue";
import { useConnectionStore } from "@/store";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/connect",
        name: "Connect",
        component: Connect,
        meta: { access: "guest" },
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { access: "auth" },
      },
      {
        path: "/stream/create",
        name: "CreateStream",
        component: CreateStream,
        meta: { access: "auth" },
      },
      {
        path: "/stream/:id",
        name: "GetStream",
        component: GetStream,
      },
      {
        path: "/streams/:type",
        name: "Streams",
        component: Streams,
        meta: { access: "auth" },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const { isConnected } = useConnectionStore();
  const { access } = <{ access?: string }>to.meta;

  if (access === "auth" && !isConnected) {
    return next({ name: "Connect" });
  }

  if (access === "guest" && isConnected) {
    return next({ name: "Dashboard" });
  }

  return next();
});
