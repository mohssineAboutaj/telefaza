<template>
  <q-page-container>
    <q-page padding>
      <q-card>
        <q-card-section>
          <h2 class="text-h2 text-center text-capitalize">about</h2>
        </q-card-section>
        <q-card-section>{{ description }}</q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { description, productName } from "../../package.json";

export default {
  data: () => ({
    title: "About",
    description,
  }),
  created() {
    this.$root.$emit("update-appbar-title-event", this.title);
  },
  meta() {
    return {
      title: this.title,
      titleTemplate: function(title) {
        return `${this.title} | ${productName}`;
      },
    };
  },
};
</script>
