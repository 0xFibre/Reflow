import { defineStore } from "pinia";
import { Stream } from "@/lib/Stream";
import { streamService } from "@/services";
import { useConnectionStore } from "./connection";
import { StreamType } from "@/types";

export const useStreamStore = defineStore("stream", {
  state: (): {
    streams: Stream[];
    stream?: Stream;
  } => ({
    stream: undefined,
    streams: [],
  }),
  getters: {
    getStreams:
      (state) =>
      (type?: StreamType): Stream[] => {
        const { address } = useConnectionStore();

        if (!type) return <Stream[]>state.streams;
        if (type === "incoming") {
          return <Stream[]>(
            state.streams.filter((stream) => stream.recipient == address)
          );
        } else if (type === "outgoing") {
          return <Stream[]>(
            state.streams.filter((stream) => stream.sender == address)
          );
        }

        return [];
      },

    getStreamsCount(_) {
      const self = this;

      return function (type?: StreamType): number {
        return self.getStreams(type).length;
      };
    },
  },

  actions: {
    async fetchStreams(type?: StreamType) {
      const { address } = useConnectionStore();
      const streams = await streamService.getStreams(address!);

      this.streams = streams;
    },

    async fetchStream(objectId: string) {
      const stream = await streamService.getStream(objectId);
      // const events = await streamService.getStreamEvents(objectId);

      this.stream = stream;
    },
  },
});
