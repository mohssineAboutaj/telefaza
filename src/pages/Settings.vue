<template>
  <q-page-container>
    <q-card class="text-capitalize" padding>
      <q-card-section>
        <h2 class="text-h2 text-center">Settings</h2>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-bookmark" />
            </q-item-section>
            <q-item-section>remove all favourites channels</q-item-section>
            <q-item-section avatar>
              <q-btn
                color="negative"
                icon="mdi-delete"
                @click="confirmDelete = !confirmDelete"
              >
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-volume-off" />
            </q-item-section>
            <q-item-section>muted channedl when playing</q-item-section>
            <q-item-section avatar>
              <q-toggle color="primary" v-model="muted">
                <q-tooltip>Toggle Mute</q-tooltip>
              </q-toggle>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="text-capitalize">
            are you sure you want to delete all favourites channels?
          </span>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Cancel" color="positive" outline v-close-popup />
          <q-space />
          <q-btn
            label="Delete"
            color="negative"
            v-close-popup
            @click="deleteAll"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
import { productName } from "../../package.json";

export default {
  name: "Settings",
  data: () => ({
    title: "Settings",
    confirmDelete: false,
    muted: false,
  }),
  methods: {
    deleteAll() {
      this.$store.commit("deleteAllFav");
    },
  },
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
