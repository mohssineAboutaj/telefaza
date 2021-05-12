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
          @click="changeChannel(channel)"
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

    <q-page-container class="flex flex-center">
      <vplayer :playerOptions="vOption" @onplay="play" :key="vOption.src" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { name, description, keywords } from "../package.json";

export default {
  name: "App",
  data: () => ({
    leftDrawerOpen: false,
    title: "Home",
    selectedChannel: {},
    isFavChannel: false,
    searchVal: "",
    channelsList: [],
    originalList: [],
    vOption: {
      src: null,
      type: "application/x-mpegURL",
      preload: false,
      autoplay: !true,
      isLoop: false,
      playsinline: false,
      controls: "progress,current,durration,volume",
      crossOrigin: false,
    },
  }),
  methods: {
    searchForFn() {
      if (this.searchVal) {
        this.channelsList = this.originalList.filter(el =>
          el.name.includes(this.searchVal),
        );
      } else {
        this.channelsList = this.originalList;
      }
    },
    toggleDarkTheme() {
      this.$q.dark.toggle();
    },
    changeChannel(c) {
      this.selectedChannel = c;
      this.title = this.selectedChannel.name;
      this.vOption.src = this.selectedChannel.url;
      this.vOption.autoplay = true;
      this.leftDrawerOpen = false;
    },
    play(e) {
      console.log(e);
    },
    toggleFav() {
      this.isFavChannel = !this.isFavChannel;
      console.log(this.selectedChannel);
    },
  },
  created() {
    this.$q.dark.set(true);
    this.$store.getters.getAllChannels.forEach(el => {
      this.channelsList.push(el);
      this.originalList.push(el);
    });
    this.changeChannel(this.originalList[0]);
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
