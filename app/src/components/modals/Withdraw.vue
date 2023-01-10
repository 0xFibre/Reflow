<template>
  <div class="text-center">
    <v-dialog max-width="600px" persistent v-bind:model-value="show">
      <v-card>
        <v-card-text>
          <div class="d-flex">
            <h3>Withdraw {{ stream.coinMetadata.symbol }}</h3>
            <v-spacer />
            <v-btn
              flat
              class="pa-0"
              density="compact"
              icon="mdi-close"
              @click="$emit('toggle')"
            />
          </div>

          <v-text-field
            class="mb-6"
            type="number"
            placeholder="Enter amount"
            variant="underlined"
            v-model="state.input.amount"
            persistent-hint
            :hint="`Balance: ${stream.recipientBalance.dividedBy(
              Math.pow(10, stream.coinMetadata.decimals)
            )} ${stream.coinMetadata.symbol}`"
          />

          <v-btn
            flat
            block
            color="primary"
            variant="flat"
            @click="withdraw"
            class="my-3"
          >
            Withdraw
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Stream } from "@/lib/Stream";
import { reactive } from "vue";
import { BigNumber } from "@/utils";
import { streamService } from "@/services";

const { stream, address } = defineProps<{
  address: string;
  show: boolean;
  stream: Stream;
}>();
defineEmits(["toggle"]);

const state: {
  input: {
    amount: string;
  };
} = reactive({
  input: {
    amount: "",
  },
});

async function withdraw() {
  const accessCap = await streamService.getAccessCapObject(address, stream.id);

  const data = {
    streamId: stream.id,
    accessCapId: accessCap?.id,
    coinType: stream.coinType,
    amount: new BigNumber(state.input.amount)
      .multipliedBy(Math.pow(10, stream.coinMetadata.decimals))
      .toString(),
  };

  const result = await streamService.withdrawFromStream(data);
  console.log(result);
}
</script>
