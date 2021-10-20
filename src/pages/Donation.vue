<template>
  <q-page-container>
    <q-page padding>
      <div class="row justify-center text-capitalize">
        <q-card style="width: 750px">
          <q-card-section>
            <h2 class="text-h2 text-center text-capitalize">{{ title }}</h2>
          </q-card-section>
          <q-card-section class="text-capitalize">
            <p>
              Your donation will help me stay motivated to update this app
              periodically and continuously to make it better and better
            </p>
            <p>
              choose one of these ways bellow to donate me :)
            </p>
          </q-card-section>
          <q-card-actions class="q-pa-lg">
            <q-btn
              v-for="(item, i) in items"
              :key="i"
              text-color="white"
              rounded
              outline
              class="q-ma-sm q-px-md"
              size="lg"
              :label="item.label"
              :icon="item.icon"
              no-caps
              :href="item.link"
              target="_blank"
              type="a"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  data: () => ({
    title: "Donation",
    items: [
      {
        label: "PayPal",
        link: "https://www.buymeacoffee.com/mohssineAboutaj",
        icon: "mdi-credit-card",
      },
      {
        label: "buyMeCoffee",
        link: "https://paypal.me/mohssineaboutaj",
        icon: "mdi-coffee",
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
