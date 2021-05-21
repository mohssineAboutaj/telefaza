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
              <q-btn color="primary" icon="mdi-delete" label="DELETE" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page-container>
</template>

<script>
export default {};
</script>
