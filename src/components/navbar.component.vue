<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        v-if="$route.path === '/'"
        v-bind="iconsSharedProps"
        icon="mdi-menu"
        aria-label="Menu"
        @click="$root.$emit('toggle-channels-drawer-event')"
      />
      <q-btn v-else v-bind="iconsSharedProps" icon="mdi-home" to="/" />

      <q-btn
        v-if="startWatching"
        v-bind="iconsSharedProps"
        :icon="`mdi-heart${fav ? '' : '-outline'}`"
        aria-label="Heart"
        @click="$root.$emit('toggle-fav-event')"
      />

      <q-toolbar-title class="text-capitalize">{{ title }}</q-toolbar-title>

      <q-btn
        v-bind="iconsSharedProps"
        icon="mdi-plus"
        aria-label="Add"
        to="/custom-channels"
      />

      <q-btn icon="mdi-dots-vertical" aria-label="Setting">
        <q-menu>
          <q-list>
            <q-item
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              active-class="text-white bg-primary"
              router
              exact
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section class="text-capitalize">
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { productName, description, keywords } from "../../package.json";

export default {
  name: "NavbarComponent",
  data: () => ({
    // icons shared props
    iconsSharedProps: {
      flat: true,
      dense: true,
      round: true,
    },
    // data
    fav: false,
    startWatching: false,
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
    this.$root.$on("update-appbar-title-event", t => {
      this.title = t;
    });

    this.$root.$on("start-watching-event", s => {
      this.startWatching = s;
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
