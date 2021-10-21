<template>
  <q-page-container>
    <q-page padding>
      <div class="row justify-center">
        <q-card style="width: 750px">
          <q-card-section>
            <h2 class="text-h2 text-center text-capitalize">{{ title }}</h2>
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
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import {
  description,
  author,
  license,
  version,
  homepage,
  name,
} from "../../package.json";

export default {
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
  }),
  created() {
    this.$root.$emit("update-appbar-title-event", this.title);
  },
  meta() {
    return { title: this.title };
  },
};
</script>
