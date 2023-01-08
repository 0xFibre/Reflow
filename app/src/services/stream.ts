import { env } from "@/config";
import { CreateStreamData } from "@/types";
import { connection, provider } from "@/services";
import { SuiMoveObject } from "@mysten/sui.js";
import { object } from "@/utils";

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
      const { data } = registry.details as { data: SuiMoveObject };
      const fields = object.getFields(data);

      if (!type) {
        const outgoingId = object.getObjectId(fields.user_outgoing_streams);
        const incomingId = object.getObjectId(fields.user_incoming_streams);

        return [
          ...(await this.getStreamsTypeByAddress(incomingId, address)),
          ...(await this.getStreamsTypeByAddress(outgoingId, address)),
        ];
      }

      if (type === "outgoing") {
        const objectId = object.getObjectId(fields.user_outgoing_streams);
        return await this.getStreamsTypeByAddress(objectId, address);
      } else if (type === "incoming") {
        const objectId = object.getObjectId(fields.user_incoming_streams);
        return await this.getStreamsTypeByAddress(objectId, address);
      }

      return [];
    }
  }

  async getStreamsTypeByAddress(objectId: string, address: string) {
    const streamsObject = await provider.getDynamicFieldObject(
      objectId,
      address
    );

    if (streamsObject.status === "Exists") {
      const { data } = streamsObject.details as { data: SuiMoveObject };
      const fields = object.getFields(data);

      const streamsObjects = await provider.getObjectBatch(fields.value);
      const streams = streamsObjects.map((stream) => {
        const { data } = <{ data: SuiMoveObject }>stream.details;
        return {
          ...object.getFields(data),
          id: object.getObjectId(data),
        };
      });

      return streams;
    }
  }
}
