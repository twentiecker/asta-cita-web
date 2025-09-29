import { createRouter, createWebHistory } from "vue-router";
import EkonomiView from "../views/EkonomiView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ekonomi",
      component: EkonomiView,
    },
    {
      path: "/asta1",
      name: "asta1",
      component: () => import("../views/Asta1View.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
