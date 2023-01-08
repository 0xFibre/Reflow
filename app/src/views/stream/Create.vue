<template>
  <v-row>
    <v-col md="6" class="mx-auto">
      <h2 class="mb-3">Create Stream</h2>

      <v-row>
        <v-col class="py-0" cols="12" sm="6">
          <v-combobox
            :items="state.coins"
            item-value="coinType"
            item-title="name"
            v-model="state.input.coin"
            placeholder="Select coin or paste coin type"
            variant="underlined"
            color="primary"
            @update:model-value="handleComboboxUpdate"
          />
        </v-col>
        <v-col class="py-0" cols="12" sm="6">
          <v-text-field
            v-model="state.input.amount"
            type="number"
            :min="0"
            placeholder="Amount to stream"
            variant="underlined"
            color="primary"
          />
        </v-col>
      </v-row>

      <v-text-field
        v-model="state.input.recipient"
        type="text"
        placeholder="Recipient address"
        variant="underlined"
        color="primary"
      />

      <div class="mt-3">
        <h4>Start Time</h4>
        <v-row>
          <v-col class="py-0" cols="6">
            <v-text-field
              type="date"
              v-model="state.input.startDate"
              variant="underlined"
              color="primary"
            />
          </v-col>
          <v-col class="py-0" cols="6">
            <v-text-field
              type="time"
              v-model="state.input.startTime"
              variant="underlined"
              color="primary"
            />
          </v-col>
        </v-row>
      </div>

      <div class="mt-3">
        <h4>End Time</h4>
        <v-row>
          <v-col class="py-0" cols="6">
            <v-text-field
              type="date"
              v-model="state.input.endDate"
              variant="underlined"
              color="primary"
            />
          </v-col>
          <v-col class="py-0" cols="6">
            <v-text-field
              type="time"
              v-model="state.input.endTime"
              variant="underlined"
              color="primary"
            />
          </v-col>
        </v-row>
      </div>

      <v-btn
        flat
        block
        class="mt-5"
        variant="flat"
        color="primary"
        @click="createStream"
      >
        Create Stream
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { coin, streamService } from "@/services";
import { useConnectionStore } from "@/store";
import { coinList } from "@/config";
import { BigNumber, date } from "@/utils";
import { CreateStreamData } from "@/types";

interface State {
  coins: {
    name: string;
    decimals: number;
    symbol: string;
    coinType: string;
    iconUrl: string | null;
  }[];
  input: {
    amount: string;
    coin: any;
    coinType: string;
    recipient: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
}

const dateValue = date.getHtmlDateValue(new Date());
const timeValue = date.getHtmlTimeValue(new Date());
const connectionStore = useConnectionStore();

const state: State = reactive({
  coins: [...coinList],
  input: {
    amount: "",
    coin: null,
    coinType: "",
    recipient: "",
    startDate: dateValue,
    startTime: timeValue,
    endDate: dateValue,
    endTime: timeValue,
  },
});

async function createStream() {
  const selectedCoin = state.coins.find(
    (coin) => coin.coinType == state.input.coinType
  );
  if (!selectedCoin) throw new Error("No coin selected");

  const amount = new BigNumber(state.input.amount).multipliedBy(
    Math.pow(10, selectedCoin.decimals)
  );

  const selectCoindata = {
    address: connectionStore.address!,
    amount: BigInt(amount.toString()),
    coinType: selectedCoin.coinType,
  };
  const inputCoin = await coin.selectCoinWithBalanceGreaterThanOrequal(
    selectCoindata
  );

  const startTime = new Date(
    `${state.input.startDate} ${state.input.startTime}`
  );
  const endTime = new Date(`${state.input.endDate} ${state.input.endTime}`);

  const data: CreateStreamData = {
    amount: amount.toString(),
    coinId: inputCoin?.id,
    coinType: selectedCoin.coinType,
    endTime: String(endTime.getTime() / 1000),
    startTime: String(startTime.getTime() / 1000),
    recipient: state.input.recipient,
  };

  const result = await streamService.createStream(data);
  console.log(result);
}

async function handleComboboxUpdate() {
  const inputCoin = state.input.coin;

  if (typeof inputCoin === "string") {
    try {
      const coinType = inputCoin.trim();
      if (!state.coins.find((c) => c.coinType.trim() == coinType)) {
        const metadata = await coin.getCoinMetadata(coinType);

        const coinData = {
          name: metadata.name,
          decimals: metadata.decimals,
          symbol: metadata.symbol,
          iconUrl: metadata.iconUrl,
          coinType: state.input.coinType,
        };

        state.coins.push(coinData);
      }
    } catch (e) {
      console.log(e);
    }
  } else if (typeof coin === "object") {
    state.input.coinType = inputCoin.coinType && inputCoin.coinType.trim();
  }
}
</script>
