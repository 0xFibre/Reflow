<template>
  <v-row>
    <v-col md="4">
      <div class="d-flex mb-5">
        <h3>Stream Details</h3>
      </div>

      <v-progress-circular
        :rotate="360"
        size="200"
        width="20"
        model-value="30"
        color="error"
        class="d-block mx-auto"
      >
        <h1 style="position: absolute; top: 75px">{{ "30%" }}</h1>
      </v-progress-circular>

      <h3 class="mt-3 mb-5 text-center">200 of 3900 SUI</h3>

      <div class="d-flex my-3">
        <span>Stream ID</span>
        <v-spacer />
        <v-btn
          flat
          density="compact"
          class="pa-0"
          color="primary"
          variant="text"
        >
          {{ utils.truncateAddress(address) }}
        </v-btn>
      </div>
      <div class="d-flex my-3">
        <span>Start Time</span>
        <v-spacer />
        <span>2, Dec 2022 4:30PM</span>
      </div>
      <div class="d-flex my-3">
        <span>End Time</span>
        <v-spacer />
        <span>2, Dec 2023 4:30PM</span>
      </div>
      <div class="d-flex my-3">
        <span>Sender</span>
        <v-spacer />
        <v-btn
          flat
          density="compact"
          class="pa-0"
          color="primary"
          variant="text"
        >
          {{ utils.truncateAddress(address) }}
        </v-btn>
      </div>
      <div class="d-flex my-3">
        <span>Receiver</span>
        <v-spacer />
        <v-btn
          flat
          density="compact"
          class="pa-0"
          color="primary"
          variant="text"
        >
          {{ utils.truncateAddress(address) }}
        </v-btn>
      </div>
    </v-col>
    <v-col md="6"> </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { utils } from "@/utils";
let address = "0x14ab74bea7cc1e2be3617447f677963481632af6";
</script>
