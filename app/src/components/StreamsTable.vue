<template>
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
        <td>{{ stream.deposit }}</td>
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
            {{ utils.truncateAddress(stream.recipient) }}
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
defineProps(["streams"]);
</script>
