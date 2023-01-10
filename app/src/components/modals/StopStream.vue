<template>
  <div class="text-center">
    <v-dialog max-width="600px" persistent v-bind:model-value="show">
      <v-card>
        <v-card-text>
          <div class="d-flex">
            <h3>Stop Stream</h3>
            <v-spacer />
            <v-btn
              flat
              class="pa-0"
              density="compact"
              icon="mdi-close"
              @click="$emit('toggle')"
            />
          </div>

          <p class="my-3">Are you sure to stop this stream?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            flat
            density="comfortable"
            variant="flat"
            color="secondary"
            @click="$emit('toggle')"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            density="comfortable"
            variant="flat"
            color="primary"
            @click="stopStream"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Stream } from "@/lib/Stream";
import { streamService } from "@/services";

const { stream, address } = defineProps<{
  address: string;
  show: boolean;
  stream: Stream;
}>();
defineEmits(["toggle"]);

async function stopStream() {
  const accessCap = await streamService.getAccessCapObject(address, stream.id);

  const data = {
    streamId: stream.id,
    accessCapId: accessCap?.id,
    coinType: stream.coinType,
  };

  const result = await streamService.stopStream(data);
  console.log(result);
}
</script>
