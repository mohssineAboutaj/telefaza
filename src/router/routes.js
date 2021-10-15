import Home from "../pages/Home";

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: () => import("pages/About.vue"),
  },
  {
    path: "/settings",
    component: () => import("pages/Settings.vue"),
  },
  {
    path: "/custom-channels",
    component: () => import("pages/CustomChannels.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];
