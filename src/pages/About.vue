<template>
  <q-page-container>
    <q-page padding>
      <div class="row justify-center text-capitalize">
        <q-card style="width: 750px">
          <q-card-section>
            <h2 class="text-h2 text-center text-capitalize">{{ title }}</h2>
          </q-card-section>
          <q-card-section>{{ description }}</q-card-section>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { description } from "../../package.json";

export default {
  data: () => ({
    title: "About",
    description,
  }),
  created() {
    this.$root.$emit("update-appbar-title-event", this.title);
  },
  meta() {
    return { title: this.title };
  },
};
</script>
