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

        <StreamMenu
          :stream="(stream as Stream)"
          :address="address!"
          :actions="menuActions"
        />
      </div>

      <v-progress-linear
        :buffer-value="stream.streamProgress.toNumber()"
        :model-value="stream.withdrawalProgress.toNumber()"
        color="primary"
        height="20"
        class="my-5"
        rounded
        rounded-bar
        stream
      />

      <div class="mt-5">
        <TextInfoItem
          title="Streamed"
          :value="`${stream.streamedAmount.dividedBy(
            Math.pow(10, stream.coinMetadata.decimals)
          )} of ${stream.depositedAmount.dividedBy(
            Math.pow(10, stream.coinMetadata.decimals)
          )} ${stream.coinMetadata.symbol}`"
        />

        <TextInfoItem
          title="Withdrawn"
          :value="`${stream.withdrawnAmount.dividedBy(
            Math.pow(10, stream.coinMetadata.decimals)
          )} ${stream.coinMetadata.symbol}`"
        />

        <TextInfoItem
          title="Available to withdraw"
          :value="`${stream.recipientBalance.dividedBy(
            Math.pow(10, stream.coinMetadata.decimals)
          )} ${stream.coinMetadata.symbol}`"
        />
      </div>

      <v-tabs class="mt-5" density="compact">
        <v-tab v-for="tab in ['Details', 'History']">{{ tab }}</v-tab>
      </v-tabs>

      <v-divider class="mb-5" />

      <LinkInfoItem
        title="Stream ID"
        :url="`${config.explorerUrl}/object/${stream.id}`"
        :value="utils.truncate0x(stream.id)"
      />

      <TextInfoItem
        title="Start Date"
        :value="date.formatDate(new Date(stream.startTime * 1000))"
      />

      <TextInfoItem
        title="End Date"
        :value="date.formatDate(new Date(stream.endTime * 1000))"
      />

      <LinkInfoItem
        title="Sender"
        :url="`${config.explorerUrl}/address/${stream.sender}`"
        :value="utils.truncate0x(stream.sender)"
      />

      <LinkInfoItem
        title="Recipient"
        :url="`${config.explorerUrl}/address/${stream.recipient}`"
        :value="utils.truncate0x(stream.recipient)"
      />
    </v-col>

    <Withdraw
      :show="state.modals['withdraw']"
      @toggle="toggleModal('withdraw')"
      :address="address!"
      :stream="(stream as Stream)"
    />
    <StopStream
      :show="state.modals['stop']"
      @toggle="toggleModal('stop')"
      :address="address!"
      :stream="(stream as Stream)"
    />
  </v-row>
</template>

<script lang="ts" setup>
import LinkInfoItem from "@/components/display/LinkInfoItem.vue";
import TextInfoItem from "@/components/display/TextInfoItem.vue";
import Loader from "@/components/Loader.vue";
import StreamMenu from "@/components/menu/StreamMenu.vue";
import StopStream from "@/components/modals/StopStream.vue";
import Withdraw from "@/components/modals/Withdraw.vue";
import { config } from "@/config";
import { Stream } from "@/lib/Stream";
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

const menuActions = [
  { title: "Add funds", icon: "mdi-cash-plus", for: "sender" },
  {
    title: "Withdraw funds",
    icon: "mdi-cash-minus",
    for: "recipient",
    value: "withdraw",
    click: toggleModal,
  },
  {
    title: "Stop stream",
    icon: "mdi-cancel",
    for: "both",
    value: "stop",
    click: toggleModal,
  },
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
