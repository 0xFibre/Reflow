<template>
  <v-row>
    <v-col md="6" class="mx-auto">
      <h2 class="mb-3">Create Stream</h2>

      <v-row>
        <v-col class="py-0" cols="6">
          <v-select
            placeholder="Select Token"
            variant="underlined"
            color="primary"
          />
        </v-col>
        <v-col class="py-0" cols="6">
          <v-text-field
            v-model="state.input.amount"
            placeholder="Amount to stream"
            variant="underlined"
            color="primary"
          />
        </v-col>
      </v-row>

      <v-text-field
        v-model="state.input.recipient"
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

      <v-btn flat block class="mt-5" variant="flat" color="primary">
        Create Stream
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

interface State {
  input: {
    amount: number;
    recipient: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
}

const date = new Date();
let month = String(date.getUTCMonth() + 1);
let day = String(date.getUTCDate());

let today = `${date.getUTCFullYear()}-${
  month.length < 2 ? "0" + month : month
}-${day.length < 2 ? "0" + day : day}`;
let time = `${date.getUTCHours()}:${date.getUTCMinutes()}`;

console.log(`${today} ${time}`);

const state: State = reactive({
  input: {
    amount: 0,
    recipient: "",
    startDate: today,
    startTime: time,
    endDate: today,
    endTime: time,
  },
});

console.log(today);
</script>
