<template>
  <q-layout view="lHh Lpr lFf" id="q-app">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-btn
          v-if="!fresh"
          color="primary"
          icon="mdi-home"
          round
          @click="fresh = true"
        ></q-btn>

        <q-toolbar-title>{{ title }}</q-toolbar-title>

        <q-btn
          v-if="false"
          color="primary"
          :icon="`mdi-heart${isFavChannel ? '' : '-outline'}`"
          round
          @click="toggleFav()"
        ></q-btn>
        <q-btn
          color="primary"
          icon="mdi-theme-light-dark"
          round
          @click="toggleDarkTheme()"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-input
        label-color="white"
        v-model.trim="searchVal"
        @input="searchForFn()"
        label="Search"
        filled
        class="q-mt-sm"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
      <q-list>
        <q-item
          clickable
          v-for="(channel, c) in channelsList"
          :key="c"
          :active="selectedChannel.name === channel.name"
          active-class="text-white bg-primary"
          @click="changeChannel(channel)"
          @click.once="fresh = false"
        >
          <q-item-section avatar>
            <q-icon name="mdi-television" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ channel.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="flex flex-center">
        <div v-if="fresh" class="text-center text-capitalize">
          <h1 class="text-h1">{{ originalTitle }}</h1>
          <h2 class="text-h2">choose a channel</h2>
          <div class="text-center">
            <q-btn
              v-for="cat in categories"
              :key="cat"
              color="primary"
              :label="cat"
              class="q-ma-xs"
              @click="getChannelsByCategory(cat)"
            />
          </div>
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
    </q-page-container>
  </q-layout>
</template>

<script>
import { name, description, keywords } from "../package.json";

export default {
  name: "App",
  data: () => ({
    fresh: true,
    leftDrawerOpen: false,
    title: "Home",
    originalTitle: name,
    selectedChannel: {},
    isFavChannel: false,
    searchVal: "",
    channelsList: [],
    originalList: [],
    allChannelsList: [],
    categories: [],
    autoplay: true,
  }),
  methods: {
    searchForFn() {
      if (this.searchVal) {
        this.channelsList = this.originalList.filter(el => {
          return el.name.search(this.searchVal) > 0;
        });
      } else {
        this.channelsList = this.originalList;
      }
    },
    toggleDarkTheme() {
      this.$q.dark.toggle();
    },
    changeChannel(c) {
      if (this.selectedChannel.name !== c.name) {
        this.selectedChannel = c;
        this.title = this.selectedChannel.name;
        this.leftDrawerOpen = false;
      }
    },
    play(e) {
      console.log(e);
    },
    toggleFav() {
      this.isFavChannel = !this.isFavChannel;
      console.log(this.selectedChannel);
    },
    getChannelsByCategory(cat) {
      this.channelsList = [];
      this.originalList = [];

      if (cat === "all") {
        this.channelsList = this.originalList = this.allChannelsList;
      } else {
        this.$store.getters.getChannelsByCategory(cat).forEach(el => {
          this.channelsList.push(el);
          this.originalList.push(el);
        });
      }
    },
  },
  created() {
    this.$q.dark.set(true);
    this.$store.getters.getAllChannels.forEach(el => {
      this.channelsList.push(el);
    });
    this.allChannelsList = this.originalList = this.channelsList;

    this.categories.push("all");
    this.$store.getters.getCategories.forEach(cat => {
      this.categories.push(cat);
    });
  },
  meta() {
    return {
      title: this.title,
      titleTemplate: function(title) {
        return `${this.title} | ${name}`;
      },
      meta: {
        description: { name: "description", content: description },
        keywords: { name: "keywords", content: keywords.join(",") },
      },
    };
  },
};
</script>
