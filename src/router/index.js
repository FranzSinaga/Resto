import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Foods from "../views/Foods.vue";
import FoodDetail from "../views/FoodDetail.vue";
import Keranjang from "../views/Keranjang.vue";
import PesananSukses from "../views/PesananSukses.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/food",
    name: "Food",
    components: { default: Foods, notAuthenticated: Foods },
  },
  {
    path: "/food/:id",
    name: "FoodDetail",
    components: { default: FoodDetail },
  },
  {
    path: "/keranjang",
    name: "Keranjang",
    components: { default: Keranjang, notAuthenticated: Login },
  },
  {
    path: "/pesanan-sukses",
    name: "PesananSukses",
    components: { default: PesananSukses, notAuthenticated: Login },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
