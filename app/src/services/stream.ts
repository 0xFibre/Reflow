import { env } from "@/config";
import { CreateStreamData } from "@/types";
import { connection, provider } from "@/services";
import { SuiData, SuiMoveObject } from "@mysten/sui.js";

export class Stream {
  public module = "stream";

  async createStream(data: CreateStreamData) {
    const now = String(Math.round(Date.now() / 1000) - 500);
    const payload = {
      function: "create_stream",
      module: this.module,
      package: env.slidePackageId,
      valueArgs: [
        env.streamRegistryId,
        data.amount,
        data.coinId,
        data.recipient,
        data.startTime,
        data.endTime,
        now,
      ],
      typeArgs: [data.coinType],
    };

    const response = await connection.executeMoveCall(payload);
    return response;
  }

  async getStreams(address: string, type?: "incoming" | "outgoing") {
    const registry = await provider.getObject(env.streamRegistryId);
    if (registry.status === "Exists") {
      const { data } = registry.details as { data: SuiData & SuiMoveObject };

      console.log(data);

      if (type === "outgoing") {
        const streams = await provider.getDynamicFieldObject(
          data.fields.user_outgoing_streams.fields.id.id,
          address
        );

        console.log(streams);
      }
    }
  }
}
