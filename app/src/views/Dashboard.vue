<template>
  <div class="d-flex mb-3">
    <h4>Dashboard</h4>
  </div>

  <v-row class="mb-3">
    <v-col md="3" sm="6" cols="12">
      <DashboardCard
        title="Incoming Streams"
        :count="streamStore.getStreamsCount('incoming')"
      />
    </v-col>
    <v-col md="3" sm="6" cols="12">
      <DashboardCard
        title="Outgoing Streams"
        :count="streamStore.getStreamsCount('outgoing')"
      />
    </v-col>
  </v-row>

  <div class="d-flex mt-5 mb-3">
    <h4>Streams</h4>
    <v-spacer />
    <v-btn flat variant="flat" color="primary" to="/stream/create">
      New Stream
    </v-btn>
  </div>

  <StreamsTable :streams="streamStore.getStreams()" />
</template>

<script setup lang="ts">
import { useStreamStore } from "@/store";
import { onMounted } from "vue";
import StreamsTable from "@/components/StreamsTable.vue";
import DashboardCard from "@/components/DashboardCard.vue";

const streamStore = useStreamStore();

onMounted(async () => {
  await streamStore.fetchStreams();
});
</script>
