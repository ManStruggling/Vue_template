import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css";
import "./styles/index";
// import "lib-flexible"; //mobile application Enable

import request from "./utils/request";
Vue.prototype.request = request;

import * as filters from "./filters"; // global filters
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
import permission from "./directive/permission";
Vue.directive("permission", permission);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
