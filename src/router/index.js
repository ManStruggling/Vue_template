import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import managementRouter from "./modules/management.js";
import productRouter from "./modules/product.js";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  managementRouter,
  productRouter,
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "vue-template";
  if (to.path == "/login") {
    next();
  } else {
    if (store.getters.userInfo) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
