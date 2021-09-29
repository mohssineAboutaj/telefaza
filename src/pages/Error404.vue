<template>
  <q-page class="fullscreen bg-primary text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2 text-white">
        Oops. Nothing Here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        rounded
        size="lg"
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Error404",
};
</script>
