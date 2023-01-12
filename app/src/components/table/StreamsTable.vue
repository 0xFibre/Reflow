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
            variant="text"
            target="_blank"
            :href="`${config.explorerUrl}/object/${stream.id}`"
          >
            {{ utils.truncate0x(stream.id) }}
          </v-btn>
        </td>
        <td>
          {{
            stream.depositedAmount.dividedBy(
              Math.pow(10, stream.coinMetadata.decimals)
            )
          }}
          {{ stream.coinMetadata.symbol }}
        </td>
        <td>
          <v-progress-linear
            :model-value="stream.streamProgress.toNumber()"
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
            {{ utils.truncate0x(stream.recipient) }}
          </v-btn>
        </td>
        <td>
          <v-chip
            label
            density="comfortable"
            :color="
              stream.status == 0
                ? 'primary'
                : stream.status == 1
                ? 'success'
                : 'info'
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
            :to="`/stream/${stream.id}`"
          >
            open <v-icon icon="mdi-arrow-right" />
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div v-if="streams.length < 1" class="text-center my-5 d-block mx-auto">
    <p>No streams found</p>
  </div>
</template>

<script setup lang="ts">
import { config } from "@/config";
import { Stream } from "@/lib/Stream";
import { utils } from "@/utils";

const heads = ["Stream ID", "Amount", "Progress", "To", "Status"];
defineProps<{ streams: Stream[] }>();
</script>

<style>
tr,
td {
  border: none !important;
  white-space: nowrap;
}
</style>
