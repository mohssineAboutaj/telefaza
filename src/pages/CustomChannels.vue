<template>
  <q-page-container>
    <q-page padding>
      <div class="row justify-center text-capitalize">
        <q-card style="width: 750px">
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
              <q-item v-for="item in items" :key="item.uuid">
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
                      <q-tooltip anchor="top middle" self="top middle">
                        Edit
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      class="q-ma-xs"
                      color="negative"
                      icon="mdi-delete"
                      round
                      size="sm"
                      @click="deleteItemFn(item)"
                    >
                      <q-tooltip anchor="top middle" self="top middle">
                        Delete
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </q-page>

    <!-- dialog -->
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 500px">
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
            <q-form class="full-width" ref="theForm">
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
                hint="URL must be ends with .m3u8 extension"
              />
            </q-form>
          </q-card-section>
          <q-card-actions>
            <q-btn
              :label="action === 'add' ? 'Save' : 'Update'"
              color="positive"
              @click="saveFn()"
            />
          </q-card-actions>
        </template>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
import { Notify } from "quasar";

export default {
  name: "CustomChannels",
  data() {
    const defaultFields = {
      id: null,
      category: "Custom",
      name: "",
      url: "",
      uuid: "",
    };

    return {
      // general
      title: "Custom Channels",
      lsName: "customs",
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
    valid() {
      return (
        !this.isEmpty(this.editedItem.name) && this.isUrl(this.editedItem.url)
      );
    },
  },
  methods: {
    /// crud
    //// create/add
    addItemFn() {
      this.openAndSetDialogMode("add");
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    //// update/edit
    editItemFn(item) {
      this.openAndSetDialogMode("edit");
      this.editedItem = Object.assign({}, item);
    },
    //// delete
    deleteItemFn(item) {
      this.openAndSetDialogMode("delete");
      this.editedItem = Object.assign({}, item);
    },
    deleteFn() {
      const index = this.findIndex(this.items, { uuid: this.editedItem.uuid });
      this.items.splice(index, 1);
      this.$store.commit("deleteCustomInList", this.editedItem);
      this.closeDialog();
    },
    /// dialog/modal
    openAndSetDialogMode(mod) {
      this.dialog = true;
      this.action = mod;
    },
    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.updateLocalStorage();
      });
    },
    /// save new, save update
    saveFn() {
      if (this.valid) {
        // create or update id
        this.editedItem.id = this.setID(this.editedItem.name);

        if (this.action === "add") {
          this.editedItem.uuid = this.uuid();
          this.items.unshift(this.editedItem);
          this.$store.commit("addCustomToList", this.editedItem);
        } else {
          const index = this.findIndex(this.items, {
            uuid: this.editedItem.uuid,
          });
          Object.assign(this.items[index], this.editedItem);
          this.$store.commit("updateCustomInList", this.items[index]);
        }
        this.closeDialog();
      } else {
        Notify.create({
          message: "Invalid Inputs",
          icon: "mdi-alert",
          color: "negative",
          position: "top",
        });
      }
    },
    /// utils
    setID(name) {
      return String(name).replace(/ /g, ".");
    },
    /// localStorage
    updateLocalStorage() {
      localStorage.setItem(this.lsName, JSON.stringify(this.items));
    },
    fillFromLocalStorage() {
      JSON.parse(localStorage.getItem(this.lsName) || "[]").forEach(c => {
        this.items.push(c);
      });
    },
  },
  created() {
    this.$root.$emit("update-appbar-title-event", this.title);
    this.fillFromLocalStorage();
  },
  meta() {
    return { title: this.title };
  },
};
</script>
