<template>
  <q-page padding>
    <div class="row justify-center text-capitalize">
      <q-card style="width: 750px">
        <q-card-section>
          <h2 class="text-h2 q-mb-sm text-center text-capitalize">
            {{ title }}
          </h2>
          <h4
            v-if="!isEmpty(subtitle)"
            class="text-h6  text-overline text-center text-capitalize"
          >
            {{ subtitle }}
          </h4>
        </q-card-section>
        <slot></slot>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    subtitle: { type: String, require: false },
  },
};
</script>
