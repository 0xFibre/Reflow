<template>
  <div class="d-flex mb-3">
    <h4>Dashboard</h4>
  </div>

  <v-row class="mb-3">
    <v-col md="3" sm="6" cols="12">
      <DashboardCard
        title="Incoming Streams"
        :loading="state.loading"
        :count="streamStore.getStreamsCount('incoming')"
      />
    </v-col>
    <v-col md="3" sm="6" cols="12">
      <DashboardCard
        title="Outgoing Streams"
        :loading="state.loading"
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

  <Loader v-if="state.loading" />
  <StreamsTable v-else :streams="streamStore.getStreams()" />
</template>

<script setup lang="ts">
import { useStreamStore } from "@/store";
import { onMounted, reactive } from "vue";
import StreamsTable from "@/components/table/StreamsTable.vue";
import DashboardCard from "@/components/DashboardCard.vue";
import Loader from "@/components/Loader.vue";

const streamStore = useStreamStore();
const state: { loading: boolean } = reactive({ loading: false });

onMounted(async () => {
  state.loading = true;
  await streamStore.fetchStreams();
  state.loading = false;
});
</script>
