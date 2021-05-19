<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        v-if="$route.path === '/'"
        flat
        dense
        round
        icon="mdi-menu"
        aria-label="Menu"
        @click="$root.$emit('toggle-channels-drawer-event')"
      />

      <q-toolbar-title class="text-capitalize">{{ title }}</q-toolbar-title>

      <q-tabs>
        <q-route-tab
          v-for="tab in items"
          :key="tab.label"
          :label="isSmall ? '' : tab.label"
          :icon="setIconStyleByRoute(tab.to, tab.icon)"
          :to="tab.to"
          exact
        >
          <q-tooltip>{{ titleCase(tab.label) }}</q-tooltip>
        </q-route-tab>
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script>
import { productName, description, keywords } from "../../package.json";

export default {
  name: "App",
  data: () => ({
    items: [
      {
        label: "home",
        icon: "mdi-movie",
        to: "/",
      },
      {
        label: "about",
        icon: "mdi-information",
        to: "/about",
      },
      {
        label: "settings",
        icon: "mdi-cog",
        to: "/settings",
      },
    ],
  }),
  computed: {
    title() {
      return this.items.find(el => el.to === this.$route.path).label;
    },
    isSmall() {
      return this.$q.screen.sm || this.$q.screen.xs;
    },
  },
  methods: {
    isRouteMatch(route) {
      return route === this.$route.path;
    },
    setIconStyleByRoute(route, icon) {
      return this.isRouteMatch(route) ? icon : icon + "-outline";
    },
  },
  created() {
    this.$q.dark.set(true);
  },
  meta() {
    return {
      title: this.titleCase(this.title),
      titleTemplate: function(title) {
        return `${this.title} | ${productName}`;
      },
      meta: {
        description: { name: "description", content: description },
        keywords: { name: "keywords", content: keywords.join(",") },
      },
    };
  },
};
</script>
