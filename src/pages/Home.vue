<template>
  <q-page>
    <q-tabs
      v-model="selectedCategory"
      class="bg-primary"
      active-bg-color="primary"
    >
      <q-tab
        v-for="cat in categories"
        :key="cat"
        @click="getChannelsByCategory(cat)"
        :name="lowerCase(cat)"
        :label="cat"
      />
    </q-tabs>

    <q-drawer v-model="channelsDrawerOpen" show-if-above bordered>
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

      <q-scroll-area id="scroll-area-with-virtual-scroll" style="height: 70vh">
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
        <h1 class="text-h1">{{ originalTitle }}</h1>
        <h3 class="text-h3">choose a channel/category</h3>
      </div>
      <vue-player
        v-else
        type="m3u8"
        :auto="autoplay"
        :isSwf="false"
        :src="selectedChannel.url"
        :key="selectedChannel.url"
        @dblclick="gg"
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
    channelsDrawerOpen: true,
    title: "Home",
    originalTitle: productName,
    selectedChannel: {},
    isFavChannel: false,
    searchVal: "",
    channelsList: [],
    originalList: [],
    allChannelsList: [],
    categories: [],
    selectedCategory: "all",
    autoplay: true,
  }),
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
      }
      this.inFav();
    },
    closeLeftDrawer() {
      if (this.$q.screen.sm || this.$q.screen.xs) {
        this.channelsDrawerOpen = false;
      }
    },
    toggleFav() {
      this.isFavChannel = !this.isFavChannel;

      this.$store.commit("toggleFav", this.selectedChannel.name);
    },
    getChannelsByCategory(cat) {
      this.channelsList = [];
      this.originalList = [];
      this.selectedCategory = this.lowerCase(cat);
      console.log(this.selectedCategory);

      if (this.lowerCase(this.selectedCategory) === "all") {
        this.channelsList = this.originalList = this.allChannelsList;
      } else if (this.lowerCase(this.selectedCategory) === "favourites") {
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
    gg() {
      console.log("gg");
    },
  },
  beforeCreate() {
    this.$store.commit("setFav");
    this.$root.$on("toggle-channels-drawer-event", () => {
      this.channelsDrawerOpen = !this.channelsDrawerOpen;
    });
  },
  created() {
    this.$q.dark.set(true);
    this.inFav();
    this.$store.getters.getAllChannels.forEach(el => {
      this.channelsList.push(el);
    });
    this.allChannelsList = this.originalList = this.channelsList;

    this.$store.getters.getCategories.forEach(cat => {
      this.categories.push(cat);
    });
    this.categories.unshift("favourites");
    this.closeLeftDrawer();
  },
  meta() {
    return {
      title: this.title,
      titleTemplate: function(title) {
        return `${this.title} | ${productName}`;
      },
      meta: {
        description: { name: "description", content: description },
        keywords: { name: "keywords", content: keywords.join(",") },
      },
    };
  },
  watch: {
    fresh(v) {
      if (v === true) {
        this.selectedChannel = {};
        this.title = "Home";
      }
    },
  },
};
</script>
