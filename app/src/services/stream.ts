import { env } from "@/config";
import { CreateStreamData } from "@/types";
import { connection, provider } from "@/services";
import { SuiMoveObject } from "@mysten/sui.js";
import { BigNumber, object } from "@/utils";
import { Stream } from "@/lib/Stream";

export class StreamService {
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

  async getStreams(
    address: string,
    type?: "incoming" | "outgoing"
  ): Promise<Stream[]> {
    const registry = await provider.getObject(env.streamRegistryId);

    if (registry.status === "Exists") {
      const { data } = registry.details as { data: SuiMoveObject };
      const fields = object.getFields(data);

      if (!type) {
        const outgoingId = object.getObjectId(fields.outgoing_streams);
        const incomingId = object.getObjectId(fields.incoming_streams);

        return [
          ...(await this.getStreamsTypeByAddress(incomingId, address)),
          ...(await this.getStreamsTypeByAddress(outgoingId, address)),
        ];
      }

      if (type === "outgoing") {
        const objectId = object.getObjectId(fields.outgoing_streams);
        return await this.getStreamsTypeByAddress(objectId, address);
      } else if (type === "incoming") {
        const objectId = object.getObjectId(fields.incoming_streams);
        return await this.getStreamsTypeByAddress(objectId, address);
      }

      return [];
    }

    return [];
  }

  async getStreamsTypeByAddress(
    objectId: string,
    address: string
  ): Promise<Stream[]> {
    try {
      const streamsObject = await provider.getDynamicFieldObject(
        objectId,
        address
      );

      if (streamsObject.status === "Exists") {
        const { data } = streamsObject.details as { data: SuiMoveObject };
        const fields = object.getFields(data);

        const streamsObjects = await provider.getObjectBatch(fields.value);
        const streams = streamsObjects.map((stream) =>
          this.buildStreamFromObject(
            (<{ data: SuiMoveObject }>stream.details).data
          )
        );

        return streams;
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  buildStreamFromObject(data: SuiMoveObject): Stream {
    const fields = object.getFields(data);

    const streamData = {
      id: object.getObjectId(data),
      balance: new BigNumber(fields.balance),
      recipient: fields.recipient,
      sender: fields.sender,
      amountPerSecond: new BigNumber(fields.amount_per_second),
      depositedAmount: new BigNumber(fields.deposited_amount),
      withdrawnAmount: new BigNumber(fields.withdrawn_amount),
      status: fields.status,
      createdAt: Number(fields.created_at),
      startTime: Number(fields.start_time),
      endTime: Number(fields.end_time),
    };

    return new Stream(streamData);
  }
}
