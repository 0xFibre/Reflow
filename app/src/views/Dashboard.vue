<template>
  <div class="d-flex mb-3">
    <h4>Dashboard</h4>
  </div>

  <v-row class="mb-3">
    <template v-for="c in 4">
      <v-col md="3" sm="6" cols="12">
        <v-card flat border class="mx-auto py-1">
          <v-card-text>
            <h4 class="mb-3">Incoming Streams</h4>
            <h1>30</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </template>
  </v-row>

  <div class="d-flex mt-5 mb-3">
    <h4>Streams</h4>
    <v-spacer />
    <v-btn flat variant="flat" color="primary" to="/stream/create">
      New Stream
    </v-btn>
  </div>

  <StreamsTable :streams="state.streams" />
</template>

<script setup>
import { stream } from "@/services";
import { useConnectionStore } from "@/store";
import { onMounted, reactive } from "vue";
import StreamsTable from "@/components/StreamsTable.vue";

const connectionStore = useConnectionStore();

const state = reactive({ streams: [] });

onMounted(async () => {
  const streams = await stream.getStreams(connectionStore.address, "outgoing");
  state.streams = streams;
});
</script>

<style>
tr,
td {
  border: none !important;
}
</style>
