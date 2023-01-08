import { defineStore } from "pinia";
import { Stream } from "@/lib/Stream";
import { streamService } from "@/services";
import { useConnectionStore } from "./connection";
import { StreamType } from "@/types";

export const useStreamStore = defineStore("stream", {
  state: () =>
    ({
      streams: {
        all: [],
        incoming: [],
        outgoing: [],
      },
    } as {
      streams: {
        all: Stream[];
        incoming: Stream[];
        outgoing: Stream[];
      };
    }),
  getters: {
    getStreams: (state) => (type: StreamType) => state.streams[type],
  },

  actions: {
    async fetchStreams(type?: StreamType) {
      const { address } = useConnectionStore();
      const streams = await streamService.getStreams(address!, type);

      if (!type) {
        this.streams.all = streams;
      } else {
        this.streams[type] = streams;
      }
    },
  },
});
