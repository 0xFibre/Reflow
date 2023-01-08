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
        <td>{{ stream.depositedAmount.dividedBy(10 ** 9) }}</td>
        <td>
          <v-progress-linear
            :model-value="stream.getStreamProgress()"
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
        <td>{{ "3 hours" }}</td>
        <td>
          <v-chip
            label
            density="comfortable"
            :color="
              stream.status == 0
                ? 'success'
                : stream.status == 1
                ? 'orange'
                : 'error'
            "
          >
            {{ config.stream.status[stream.status] }}
          </v-chip>
        </td>
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
import { config } from "@/config";
import { utils } from "@/utils";

const heads = ["Stream ID", "Amount", "Progress", "To", "Duration", "Status"];
defineProps(["streams"]);
</script>
