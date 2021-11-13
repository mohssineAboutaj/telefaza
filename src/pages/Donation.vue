<template>
  <q-page-container>
    <page-card-component :title="title" subtitle="support the developer">
      <q-card-section class="text-capitalize">
        <p>
          Your donation will help me stay motivated to update this app
          periodically and continuously to make it better and better
        </p>
        <p>
          choose one of these ways bellow to support me
          <q-icon name="mdi-emoticon-happy" />
        </p>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <div v-for="(item, i) in items" :key="i" class="col-md-4 col-sm-12">
            <q-card class="q-ma-sm">
              <q-card-section class="text-center">
                <q-btn
                  color="white"
                  text-color="primary"
                  fab
                  size="lg"
                  :icon="item.icon"
                />
              </q-card-section>
              <q-card-section class="text-center text-h6">
                {{ item.label }}
              </q-card-section>
              <q-card-section class="text-subtitle">
                {{ item.description }}
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  label="got it"
                  icon-right="mdi-chevron-right"
                  :href="item.link"
                  target="_blank"
                  type="a"
                  color="white"
                  text-color="primary"
                  rounded
                  class="q-pl-sm"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-card-section>
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
        description:
          "Use the most popular onlie platform, than send as you want",
        link: "https://paypal.me/mohssineaboutaj",
        icon: "mdi-credit-card",
      },
      {
        label: "buyMeACoffee",
        description:
          "One of the best platforms to support developers without having to subscribe",
        link: "https://www.buymeacoffee.com/mohssineAboutaj",
        icon: "mdi-coffee",
      },
      {
        label: "Repository Star",
        description:
          "If you dont't have money, you can just give this repo a star in github",
        link: "https://github.com/mohssineAboutaj/telefaza",
        icon: "mdi-star",
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
