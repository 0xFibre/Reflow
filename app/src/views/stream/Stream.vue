<template>
  <Loader v-if="state.loading" />
  <v-row v-else v-if="stream">
    <v-col md="6" cols="12" class="mx-auto">
      <div class="d-flex mb-5">
        <h3>Stream</h3>

        <v-spacer />

        <v-btn
          flat
          density="compact"
          class="pa-0"
          color="primary"
          variant="text"
          id="actions"
        >
          Actions
        </v-btn>

        <v-menu location="bottom" activator="#actions">
          <v-list density="comfortable">
            <template v-for="(action, i) in actions" :key="i">
              <v-list-item
                :title="action.title"
                :prepend-icon="action.icon"
                v-if="
                  action.for == 'incoming'
                    ? stream.recipient == address
                    : action.for == 'outgoing'
                    ? stream.sender == address
                    : action.for == 'both'
                    ? address == stream.sender || address == stream.recipient
                    : true
                "
                :value="i"
                @click="action.click?.call(null, action.value)"
              />
            </template>
          </v-list>
        </v-menu>
      </div>

      <v-progress-linear
        :model-value="stream.streamProgress.toNumber()"
        color="primary"
        height="20"
        class="my-5"
        rounded
        rounded-bar
      />

      <div class="mt-5">
        <div class="my-1 d-flex justify-space-between">
          <span>Streamed</span>
          <span>
            {{
              stream.streamedAmount.dividedBy(
                Math.pow(10, stream.coinMetadata.decimals)
              )
            }}
            of
            {{
              stream.depositedAmount.dividedBy(
                Math.pow(10, stream.coinMetadata.decimals)
              )
            }}
            {{ stream.coinMetadata.symbol }}
          </span>
        </div>
        <div class="my-1 d-flex justify-space-between">
          <span>Withdrawn</span>
          <span>
            {{
              stream.withdrawnAmount.dividedBy(
                Math.pow(10, stream.coinMetadata.decimals)
              )
            }}
            {{ stream.coinMetadata.symbol }}
          </span>
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

    <Withdraw
      :show="state.modals['withdraw']"
      @toggle="toggleModal('withdraw')"
      :address="address!"
      :stream="stream"
    />
  </v-row>
</template>

<script lang="ts" setup>
import Loader from "@/components/Loader.vue";
import Withdraw from "@/components/modals/Withdraw.vue";
import { config } from "@/config";
import { useConnectionStore, useStreamStore } from "@/store";
import { utils, date } from "@/utils";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const streamStore = useStreamStore();
const connectionStore = useConnectionStore();

const { stream } = storeToRefs(streamStore);
const { address } = storeToRefs(connectionStore);

const actions = [
  // { title: "Add funds", icon: "mdi-cash-plus", for: "outgoing" },
  {
    title: "Withdraw funds",
    icon: "mdi-cash-minus",
    for: "incoming",
    value: "withdraw",
    click: toggleModal,
  },
  { title: "Stop stream", icon: "mdi-cancel", for: "both" },
  { title: "Copy stream URL", icon: "mdi-link" },
];

const state: {
  loading: boolean;
  modals: Record<string, boolean>;
} = reactive({
  modals: {
    withdraw: false,
  },
  loading: false,
});

onMounted(async () => {
  state.loading = true;
  await streamStore.fetchStream(<string>route.params.id);
  state.loading = false;

  const interval = setInterval(fetchStream, 1000);

  async function fetchStream() {
    if (!route.params.id || route.name !== "GetStream") {
      clearInterval(interval);
    } else {
      await streamStore.fetchStream(<string>route.params.id);
    }
  }
});

function toggleModal(value: string) {
  state.modals[value] = !state.modals[value];
}
</script>
