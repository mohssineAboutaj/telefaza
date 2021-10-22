<template>
  <q-page-container>
    <page-card-component
      :title="title"
      subtitle="some informations about this app"
    >
      <q-card-section>
        <div class="row justify-center">
          <q-btn
            v-for="item in follow"
            :key="item.label"
            text-color="white"
            class="q-ma-xs"
            :icon="item.icon"
            :href="item.link"
            target="_blank"
            type="a"
            fab
          >
            <q-tooltip anchor="top middle" self="top middle">
              {{ item.label }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list bordered>
          <q-item v-for="item in items" :key="item.label" class="q-mb-sm">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="q-mb-xs text-capitalize" overline>
                {{ item.label }}
              </q-item-label>
              <q-item-label>{{ item.content }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </page-card-component>
  </q-page-container>
</template>

<script>
import PageCardComponent from "src/components/page.card.component.vue";
import {
  description,
  author,
  license,
  version,
  homepage,
  name,
} from "../../package.json";

export default {
  components: { PageCardComponent },
  data: () => ({
    title: "About",
    items: [
      { icon: "mdi-format-title", label: "name", content: name },
      { icon: "mdi-text", label: "description", content: description },
      { icon: "mdi-account", label: "author", content: author },
      { icon: "mdi-license", label: "license", content: license },
      { icon: "mdi-source-branch", label: "version", content: version },
      { icon: "mdi-github", label: "repository", content: homepage },
    ],
    follow: [
      {
        label: "twitter",
        icon: "mdi-twitter",
        link: "https://twitter.com/mohssineAboutaj",
      },
      {
        label: "linkedin",
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/mohssineAboutaj",
      },
      {
        label: "github",
        icon: "mdi-github",
        link: "https://github.com/mohssineAboutaj",
      },
      {
        label: "facebook",
        icon: "mdi-facebook",
        link: "https://www.facebook.com/vive.mouhssine",
      },
    ],
  }),
  created() {
    this.$root.$emit("update-appbar-title-event", this.title);
  },
  meta() {
    return { title: this.title };
  },
};
</script>
