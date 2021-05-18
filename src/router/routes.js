import Home from "../pages/Home";

export default [
  {
    path: "/",
    component: Home,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];
