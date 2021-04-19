import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
  },
  {
    path: "/workplace/:id",
    name: "workplace",
    component: () => import("../views/Workplace.vue"),
  },
  {
    path: "/workplace",
    name: "workplace",
    component: () => import("../views/Workplace.vue"),
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
