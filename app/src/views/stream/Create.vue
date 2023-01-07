<template>
  <v-row>
    <v-col md="6" class="mx-auto">
      <h2 class="mb-3">Create Stream</h2>

      <v-row>
        <v-col class="py-0" cols="6">
          <v-select placeholder="Select Token" variant="underlined" />
        </v-col>
        <v-col class="py-0" cols="6">
          <v-text-field placeholder="Amount to stream" variant="underlined" />
        </v-col>
      </v-row>

      <v-text-field placeholder="Recipient address" variant="underlined" />

      <div class="mt-3">
        <h4>Start Time</h4>
        <v-row>
          <v-col class="py-0" cols="6">
            <v-text-field type="date" value="2023-01-22" variant="underlined" />
          </v-col>
          <v-col class="py-0" cols="6">
            <v-text-field type="time" value="12:30" variant="underlined" />
          </v-col>
        </v-row>
      </div>

      <div class="mt-3">
        <h4>End Time</h4>
        <v-row>
          <v-col class="py-0" cols="6">
            <v-text-field type="date" value="2023-01-22" variant="underlined" />
          </v-col>
          <v-col class="py-0" cols="6">
            <v-text-field type="time" value="12:30" variant="underlined" />
          </v-col>
        </v-row>
      </div>

      <v-btn flat block class="mt-5" variant="flat" color="primary">
        Create Stream
      </v-btn>
    </v-col>
  </v-row>
</template>
