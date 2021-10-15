<template>
  <q-page class="fullscreen bg-primary text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <h2>Oops. Nothing Here...</h2>

      <q-btn
        color="white"
        text-color="primary"
        rounded
        size="md"
        to="/"
        label="Go Home"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Error404",
  meta() {
    return { title: "404" };
  },
};
</script>
