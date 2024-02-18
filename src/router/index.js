import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

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
  ],
});

export default router;