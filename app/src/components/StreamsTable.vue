<template>
  <v-table hover>
    <thead>
      <tr>
        <th class="text-uppercase" v-for="head in heads">
          {{ head }}
        </th>
      </tr>
    </thead>
    <tbody v-if="streams.length > 0">
      <tr v-for="stream in streams" :key="stream.id">
        <td>
          <v-btn
            flat
            density="compact"
            class="pa-0"
            color="primary"
            variant="text"
            target="_blank"
            :href="`${config.explorerUrl}/object/${stream.id}`"
          >
            {{ utils.truncateAddress(stream.id) }}
          </v-btn>
        </td>
        <td>{{ stream.depositedAmount.dividedBy(10 ** 9) }}</td>
        <td>
          <v-progress-linear
            :model-value="stream.getStreamProgress().toNumber()"
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
            variant="text"
            target="_blank"
            :href="`${config.explorerUrl}/address/${stream.recipient}`"
          >
            {{ utils.truncateAddress(stream.recipient) }}
          </v-btn>
        </td>
        <td>{{ "3 Hours" }}</td>
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
            variant="text"
          >
            view
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { config } from "@/config";
import { Stream } from "@/lib/Stream";
import { utils } from "@/utils";

const heads = ["Stream ID", "Amount", "Progress", "To", "Duration", "Status"];
defineProps<{ streams: Stream[] }>();
</script>

<style>
tr,
td {
  border: none !important;
}
</style>
