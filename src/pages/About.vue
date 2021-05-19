<template>
  <q-page-container>
    <q-page padding>
      <q-card>
        <q-card-section>
          <h2 class="text-h2 text-center text-capitalize">about</h2>
        </q-card-section>
        <q-card-section>{{ description }}</q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { description } from "../../package.json";

export default {
  data: () => ({
    description,
  }),
};
</script>
