<template>
  <q-page-container>
    <q-page padding>
      <q-card padding>
        <q-card-section>
          <h2 class="text-h2 text-center text-capitalize">{{ title }}</h2>
          <div class="text-right">
            <q-btn
              color="white"
              text-color="primary"
              icon="mdi-plus"
              label="add new channel"
              rounded
              @click="addItemFn()"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item v-for="item in items" :key="item.id">
              <q-item-section avatar>
                <q-icon name="mdi-television" />
              </q-item-section>
              <q-item-section>{{ item.name }}</q-item-section>
              <q-item-section avatar>
                <div>
                  <q-btn
                    class="q-ma-xs"
                    color="positive"
                    icon="mdi-pencil"
                    round
                    size="sm"
                    @click="editItemFn(item)"
                  >
                    <q-tooltip>Delete</q-tooltip>
                  </q-btn>
                  <q-btn
                    class="q-ma-xs"
                    color="negative"
                    icon="mdi-delete"
                    round
                    size="sm"
                    @click="deleteItemFn(item)"
                  >
                    <q-tooltip>Delete</q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-page>

    <!-- dialog -->
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row">
          <div class="text-h6 text-capitalize">{{ formTitle }}</div>
          <q-space />
          <q-btn flat round size="sm" icon="mdi-close" @click="closeDialog()" />
        </q-card-section>
        <!-- delete -->
        <template v-if="action === 'delete'">
          <q-card-section class="row items-center">
            <span class="text-capitalize">
              are you sure you want to delete the channel?
            </span>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Delete" color="negative" @click="deleteFn" />
          </q-card-actions>
        </template>
        <!-- add/edit -->
        <template v-else>
          <q-card-section class="row items-center">
            <q-form class="q-gutter-md">
              <q-input
                v-model="editedItem.name"
                type="text"
                label="Name"
                color="white"
                filled
              />
              <q-separator spaced inset vertical dark class="q-my-lg" />
              <q-input
                v-model="editedItem.url"
                type="url"
                label="URL"
                color="white"
                filled
              />
            </q-form>
          </q-card-section>
          <q-card-actions>
            <q-btn
              :label="action === 'add' ? 'Save' : 'Update'"
              color="positive"
              :disable="!editedItem.name || !editedItem.url"
              @click="saveFn()"
            />
          </q-card-actions>
        </template>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
export default {
  name: "CustomChannels",
  data() {
    const defaultFields = { id: null, name: "", url: "" };

    return {
      title: "Custom Channels",
      // items
      items: [],
      editedItem: defaultFields,
      defaultItem: defaultFields,
      // dialog
      dialog: false,
      // form
      action: "",
    };
  },
  computed: {
    formTitle() {
      switch (this.action) {
        case "add":
          return "new channel";
        case "edit":
          return "update channel";
        default:
          return "delete channel";
      }
    },
  },
  methods: {
    addItemFn() {
      this.openAndSetDialogMode("add");
    },
    editItemFn(item) {
      this.openAndSetDialogMode("edit");
      this.editedItem = item;
    },
    deleteItemFn(item) {
      this.openAndSetDialogMode("delete");
      this.editedItem = item;
    },
    openAndSetDialogMode(mod) {
      this.dialog = true;
      this.action = mod;
    },
    closeDialog() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    saveFn() {
      if (this.action === "add") {
        this.editedItem.category = "Custom";
        this.editedItem.id = String(this.editedItem.name).replace(/ /g, ".");
        this.items.push(this.editedItem);
      } else {
        const index = this.items[this.items.indexOf(this.editedItem)];
        Object.assign(index, this.editedItem);
      }
      this.closeDialog();
    },
    deleteFn() {
      const index = this.items[this.items.indexOf(this.editedItem)];
      this.items.splice(index, 1);
      this.closeDialog();
    },
  },
  created() {
    this.$root.$emit("update-appbar-title-event", this.title);
  },
  meta() {
    return { title: this.title };
  },
};
</script>
