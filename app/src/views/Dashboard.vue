<template>
  <div class="d-flex mb-3">
    <h4>Dashboard</h4>
  </div>

  <v-row class="mb-3">
    <template v-for="c in 4">
      <v-col md="3" sm="6" cols="12">
        <v-card flat border class="mx-auto py-1">
          <v-card-text>
            <h4 class="mb-3">Incoming Streams</h4>
            <h1>30</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </template>
  </v-row>

  <div class="d-flex mt-5 mb-3">
    <h4>Streams</h4>
    <v-spacer />
    <v-btn rounded flat variant="flat" color="primary" to="/stream/create">
      New Stream
    </v-btn>
  </div>

  <v-table hover>
    <thead>
      <tr>
        <th class="text-uppercase" v-for="head in heads">
          {{ head }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="stream in streams" :key="stream.id">
        <td>
          <v-btn
            flat
            density="compact"
            class="pa-0"
            color="primary"
            variant="link"
          >
            {{ utils.truncateAddress(stream.id) }}
          </v-btn>
        </td>
        <td>{{ stream.amount }}</td>
        <td>
          <v-progress-linear
            :model-value="stream.progress"
            color="primary"
            striped
          />
        </td>
        <td>
          <v-btn
            flat
            density="compact"
            class="pa-0"
            color="primary"
            variant="link"
          >
            {{ utils.truncateAddress(stream.receiver) }}
          </v-btn>
        </td>
        <td>{{ stream.duration }}</td>
        <td>{{ stream.status }}</td>
        <td>
          <v-btn
            flat
            density="compact"
            class="pa-0"
            color="primary"
            variant="link"
          >
            view
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { utils } from "@/utils";

const heads = ["Stream ID", "Amount", "Progress", "To", "Duration", "Status"];
const streams = [
  {
    id: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    amount: "3000",
    progress: "30%",
    receiver: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    duration: "40 Days",
    status: "Active",
  },
  {
    id: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    amount: "3000",
    progress: "30%",
    receiver: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    duration: "40 Days",
    status: "Active",
  },
  {
    id: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    amount: "3000",
    progress: "30%",
    receiver: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    duration: "40 Days",
    status: "Active",
  },
  {
    id: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    amount: "3000",
    progress: "30%",
    receiver: "0xa15056f2f1ca22bbdc9ecac328c4fb35d5185e01",
    duration: "40 Days",
    status: "Active",
  },
];
</script>

<style>
tr,
td {
  border: none !important;
}
</style>
