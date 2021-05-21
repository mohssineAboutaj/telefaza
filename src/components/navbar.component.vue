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

      <q-btn
        v-if="$route.path === '/'"
        flat
        dense
        round
        :icon="`mdi-heart${fav ? '' : '-outline'}`"
        aria-label="Heart"
        @click="$root.$emit('toggle-fav-event')"
      />

      <q-toolbar-title class="text-capitalize">{{ title }}</q-toolbar-title>

      <q-tabs>
        <q-route-tab
          v-for="tab in items"
          :key="tab.label"
          :label="isSmall ? '' : tab.label"
          :icon="setIconStyleByRoute(tab.to, tab.icon)"
          :to="tab.to"
          @click="$root.$emit('update-appbar-title-event', tab.label)"
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
  name: "NavbarComponent",
  data: () => ({
    fav: false,
    title: productName,
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
    this.title = this.items.find(el => el.to === this.$route.path).label;

    this.$root.$on("update-appbar-title-event", t => {
      this.title = t;
    });

    this.$root.$on("set-fav-event", f => {
      this.fav = f;
    });
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
