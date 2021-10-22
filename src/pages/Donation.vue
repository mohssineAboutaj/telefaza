<template>
  <q-page-container>
    <page-card-component :title="title" subtitle="support the developer">
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
    </page-card-component>
  </q-page-container>
</template>

<script>
import pageCardComponent from "src/components/page.card.component.vue";
export default {
  components: { pageCardComponent },
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
