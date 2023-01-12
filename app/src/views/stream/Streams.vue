<template>
  <div class="d-flex mb-3">
    <h4>
      {{ $route.params.type == "incoming" ? "Incoming" : "Outgoing" }} Streams
    </h4>
    <v-spacer />
    <v-btn flat variant="flat" color="primary" to="/stream/create">
      New Stream
    </v-btn>
  </div>

  <StreamsTable
    :streams="streamStore.getStreams($route.params.type as StreamType)"
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import StreamsTable from "@/components/table/StreamsTable.vue";
import { useRoute } from "vue-router";
import { useStreamStore } from "@/store";
import { StreamType } from "@/types";

const route = useRoute();
const streamStore = useStreamStore();
const streamType = route.params.type as StreamType;

onMounted(async () => {
  await streamStore.fetchStreams(streamType);
});
</script>
