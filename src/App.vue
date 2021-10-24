<template>
  <q-layout view="lHh Lpr lFf" id="q-app">
    <navbar-component></navbar-component>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import navbarComponent from "./components/navbar.component.vue";
export default {
  name: "App",
  components: { navbarComponent },
  created() {
    // set dark mode
    this.$q.dark.set(true);

    // fill store/vuex
    this.$store.commit("setFav");
  },
};
</script>
