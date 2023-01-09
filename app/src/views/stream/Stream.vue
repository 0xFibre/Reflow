<template>
  <v-row v-if="stream">
    <v-col md="6" cols="12" class="mx-auto">
      <div class="d-flex mb-5">
        <h3>Incoming Stream</h3>

        <v-spacer />

        <v-btn
          flat
          density="compact"
          class="pa-0"
          color="primary"
          variant="text"
        >
          Actions
        </v-btn>
      </div>

      <div>
        <v-progress-linear
          :model-value="stream.getStreamProgress().toNumber()"
          color="primary"
          height="20"
          class="my-3"
          striped
        />

        <div class="mt-5">
          <div class="my-1 d-flex justify-space-between">
            <span>Amount Streamed</span>
            <span
              >{{
                stream.recipientBalance.dividedBy(
                  Math.pow(10, stream.coinMetadata.decimals)
                )
              }}
              SUI</span
            >
          </div>
          <div class="my-1 d-flex justify-space-between">
            <span>Amount Withdrawn</span>
            <span
              >{{
                stream.withdrawnAmount.dividedBy(
                  Math.pow(10, stream.coinMetadata.decimals)
                )
              }}
              SUI</span
            >
          </div>
          <div class="my-1 d-flex justify-space-between">
            <span>Remaining Balance</span>
            <span
              >{{
                stream.balance.dividedBy(
                  Math.pow(10, stream.coinMetadata.decimals)
                )
              }}
              SUI</span
            >
          </div>
        </div>
      </div>

      <v-tabs class="mt-5" density="compact">
        <v-tab v-for="tab in ['Details', 'History']">{{ tab }}</v-tab>
      </v-tabs>
      <v-divider class="mb-5" />

      <div class="d-flex">
        <span>Stream ID</span>
        <v-spacer />
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
      </div>
      <div class="d-flex my-3">
        <span>Start Date</span>
        <v-spacer />
        <span>{{ date.formatDate(new Date(stream.startTime * 1000)) }}</span>
      </div>
      <div class="d-flex my-3">
        <span>End Date</span>
        <v-spacer />
        <span>{{ date.formatDate(new Date(stream.endTime * 1000)) }}</span>
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
          target="_blank"
          :href="`${config.explorerUrl}/address/${stream.sender}`"
        >
          {{ utils.truncateAddress(stream.sender) }}
        </v-btn>
      </div>
      <div class="d-flex my-3">
        <span>Recipient</span>
        <v-spacer />
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
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { config } from "@/config";
import { useStreamStore } from "@/store";
import { utils, date } from "@/utils";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

// interface State {
//   stream?: Stream;
// }

const route = useRoute();
const streamStore = useStreamStore();
// const state: State = reactive({ stream: undefined });
const { stream } = storeToRefs(streamStore);

onMounted(async () => {
  await streamStore.fetchStream(<string>route.params.id);

  setInterval(async () => {
    await streamStore.fetchStream(<string>route.params.id);
  }, 1000);
});
</script>
