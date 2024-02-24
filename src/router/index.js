import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotificationsView from "@/views/NotificationsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/main",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "weather/:country/:city",
          name: "weatherSearch",
          component: HomeView,
        },
      ],
    },
    {
      path: "/notifications",
      name: "notifications",
      component: NotificationsView,
    },
    {
      path: "/",
      redirect: "/main",
    },
  ],
});

export default router;
