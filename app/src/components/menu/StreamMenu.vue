<template>
  <v-menu location="bottom" activator="#actions">
    <v-list density="comfortable">
      <template v-for="(action, i) in actions" :key="i">
        <v-list-item
          :title="action.title"
          :prepend-icon="action.icon"
          v-if="
            action.for == 'recipient'
              ? stream.recipient == address
              : action.for == 'sender'
              ? stream.sender == address
              : action.for == 'both'
              ? address == stream.sender || address == stream.recipient
              : true
          "
          :value="i"
          @click="action.click?.call(null, action.value)"
        />
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import { Stream } from "@/lib/Stream";

defineProps<{
  address: string;
  stream: Stream;
  actions: {
    title: string;
    icon: string;
    for?: string;
    value?: string;
    click?: Function;
  }[];
}>();
</script>
