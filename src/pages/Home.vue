<template>
  <q-page>
    <q-drawer v-model="channelsDrawerOpen" show-if-above bordered>
      <q-select
        filled
        :value="titleCase(selectedCategory)"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        hint="titleCase('filter by category')"
        @filter="filterFn"
        @input="getChannelsByCategory"
        options-selected-class="text-secondary"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-tag-multiple" />
        </template>
      </q-select>

      <q-input
        label-color="white"
        v-model.trim="searchVal"
        @input="searchForFn()"
        label="Search"
        :hint="`Total Channels: ${channelsList.length}`"
        filled
        class="q-mt-sm"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
      <q-separator spaced />

      <q-scroll-area id="scroll-area-with-virtual-scroll" style="height: 60vh">
        <q-virtual-scroll
          :items="channelsList"
          scroll-target="#scroll-area-with-virtual-scroll > .scroll"
        >
          <template v-slot="{ item: channel, index: c }">
            <q-item
              clickable
              :key="c"
              :active="selectedChannel.name === channel.name"
              active-class="text-white bg-primary"
              @click="changeChannel(channel)"
              @click.once="fresh = false"
            >
              <q-item-section
                avatar
                class="q-mx-0 q-px-0"
                style="min-width: auto;"
              >
                <q-icon name="mdi-television" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ channel.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-scroll-area>
    </q-drawer>

    <q-page class="flex flex-center">
      <div v-if="fresh" class="text-center text-capitalize q-pa-md">
        <h1 class="text-h3">{{ originalTitle }}</h1>
        <h3 class="text-h6">
          watch your favourite TV channel online
        </h3>
      </div>
      <vue-player
        v-else
        type="m3u8"
        :auto="autoplay"
        :isSwf="false"
        :src="selectedChannel.url"
        :key="selectedChannel.url"
      ></vue-player>
    </q-page>
  </q-page>
</template>

<script>
import { productName, description, keywords } from "../../package.json";

export default {
  name: "Home",
  data: () => ({
    fresh: true,
    channelsDrawerOpen: false,
    title: "Home",
    originalTitle: productName,
    selectedChannel: {},
    isFavChannel: false,
    searchVal: "",
    channelsList: [],
    originalList: [],
    allChannelsList: [],
    options: [],
    categories: [],
    selectedCategory: "all",
    autoplay: true,
  }),
  computed: {
    screen() {
      return this.$q.screen;
    },
  },
  methods: {
    searchForFn() {
      if (this.isEmpty(this.searchVal)) {
        this.channelsList = this.originalList;
      } else {
        this.channelsList = this.originalList.filter(el => {
          return (
            this.lowerCase(el.name).includes(this.lowerCase(this.searchVal)) > 0
          );
        });
      }
    },
    toggleDarkTheme() {
      this.$q.dark.toggle();
    },
    changeChannel(c) {
      if (
        this.isEmpty(this.selectedChannel) ||
        this.selectedChannel.name !== c.name
      ) {
        this.selectedChannel = c;
        this.title = this.selectedChannel.name;
        this.closeLeftDrawer();
        this.$root.$emit("update-appbar-title-event", this.title);
      }
      this.inFav();
    },
    closeLeftDrawer() {
      if (this.screen.sm || this.screen.xs) {
        this.channelsDrawerOpen = false;
      } else {
        this.channelsDrawerOpen = true;
      }
    },
    toggleFav() {
      this.isFavChannel = !this.isFavChannel;

      this.$store.commit("toggleFav", this.selectedChannel.name);
    },
    getChannelsByCategory(cat = "all") {
      this.channelsList = [];
      this.originalList = [];
      this.selectedCategory = this.lowerCase(cat);

      if (this.selectedCategory === "all") {
        this.channelsList = this.originalList = this.allChannelsList;
      } else if (this.selectedCategory === "favourites") {
        this.channelsList = this.originalList = this.$store.getters.getFavList;
      } else {
        this.$store.getters
          .getChannelsByCategory(this.selectedCategory)
          .forEach(el => {
            this.channelsList.push(el);
            this.originalList.push(el);
          });
      }
    },
    inFav() {
      this.isFavChannel = this.$store.getters.checkFav(
        this.selectedChannel.name,
      );
    },
    filterFn(val, update) {
      update(() => {
        this.options = this.categories
          .filter(v => {
            return v.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1;
          })
          .map(o => {
            return (o = this.titleCase(o));
          });
      });
    },
  },
  beforeCreate() {
    this.$root.$on("toggle-channels-drawer-event", () => {
      this.channelsDrawerOpen = !this.channelsDrawerOpen;
    });

    this.$root.$on("toggle-fav-event", () => {
      this.toggleFav();
    });
  },
  created() {
    this.$root.$emit("update-appbar-title-event", this.title);

    this.inFav();
    this.$store.getters.getAllChannels.forEach(el => {
      this.channelsList.push(el);
    });
    this.allChannelsList = this.originalList = this.channelsList;

    this.$store.getters.getCategories.forEach(cat => {
      this.categories.push(this.lowerCase(cat));
    });
    this.categories.unshift("favourites");

    this.closeLeftDrawer();

    // chanels/category by query params
    const categoryParam = this.$route.query.category;
    if (
      !this.isEmpty(categoryParam) &&
      this.categories.includes(categoryParam)
    ) {
      this.selectedCategory = categoryParam;
      this.getChannelsByCategory(this.selectedCategory);
    }
  },
  meta() {
    return {
      title: this.title,
      meta: {
        description: { name: "description", content: description },
        keywords: { name: "keywords", content: keywords.join(",") },
      },
    };
  },
  beforeDestroy() {
    this.$root.$emit("start-watching-event", false);
  },
  watch: {
    fresh(v) {
      if (v === true) {
        this.selectedChannel = {};
        this.title = "Home";
      } else {
        this.$root.$emit("start-watching-event", true);
      }
    },
    isFavChannel(v) {
      this.$root.$emit("set-fav-event", v);
    },
  },
};
</script>
