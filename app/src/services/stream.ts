import { env } from "@/config";
import {
  CreateStreamData,
  StopStreamData,
  WithdrawFromStreamData,
} from "@/types";
import { connection, provider } from "@/services";
import { SuiMoveObject } from "@mysten/sui.js";
import { BigNumber, object } from "@/utils";
import { Stream } from "@/lib/Stream";

export class StreamService {
  public module = "stream";

  async createStream(data: CreateStreamData) {
    const now = String(Math.round(Date.now() / 1000) - 5000);
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

  async withdrawFromStream(data: WithdrawFromStreamData) {
    const now = String(Math.round(Date.now() / 1000));
    const payload = {
      function: "withdraw_from_stream",
      module: this.module,
      package: env.slidePackageId,
      valueArgs: [data.streamId, data.accessCapId, data.amount, now],
      typeArgs: [data.coinType],
    };

    const response = await connection.executeMoveCall(payload);
    return response;
  }

  async stopStream(data: StopStreamData) {
    const now = String(Math.round(Date.now() / 1000));
    const payload = {
      function: "stop_stream",
      module: this.module,
      package: env.slidePackageId,
      valueArgs: [data.streamId, data.accessCapId, now],
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
        const streams = await Promise.all(
          streamsObjects.map((stream) =>
            this.buildStreamFromObject(
              (<{ data: SuiMoveObject }>stream.details).data
            )
          )
        );

        return streams;
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  async getStream(objectId: string): Promise<Stream> {
    const stream = await provider.getObject(objectId);

    if (stream.status === "Exists") {
      const { data } = stream.details as { data: SuiMoveObject };
      return await this.buildStreamFromObject(data);
    }

    throw new Error("");
  }

  async buildStreamFromObject(data: SuiMoveObject): Promise<Stream> {
    const fields = object.getFields(data);
    const coinType = data.type
      .substring(data.type.lastIndexOf("<"))
      .slice(1, -1);

    const fraction = object.getFields(fields.amount_per_second);
    const streamData = {
      id: object.getObjectId(data),
      balance: new BigNumber(fields.balance),
      recipient: fields.recipient,
      sender: fields.sender,
      amountPerSecond: new BigNumber(fraction.numerator).dividedBy(
        fraction.denominator
      ),
      depositedAmount: new BigNumber(fields.deposited_amount),
      withdrawnAmount: new BigNumber(fields.withdrawn_amount),
      status: fields.status,
      createdAt: Number(fields.created_at),
      startTime: Number(fields.start_time),
      endTime: Number(fields.end_time),
      coinType,
      coinMetadata: await provider.getCoinMetadata(coinType),
    };

    return new Stream(streamData);
  }

  async getStreamEvents(objectId: string) {
    const events = provider.getEvents({ Object: objectId }, null, null);
    return events;
  }

  async getAccessCapObject(address: string, streamId: string) {
    const objects = await provider.getObjectsOwnedByAddress(address);
    const type = `${env.slidePackageId}::${this.module}::AccessCap`;

    const accessCapObjectIds: string[] = [];
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];

      if (object.type == type) {
        accessCapObjectIds.push(object.objectId);
      }
    }

    const accessCapObjects = await provider.getObjectBatch(accessCapObjectIds);
    const accessCap = accessCapObjects.find((accessCap) => {
      const fields = object.getFields(
        (<{ data: SuiMoveObject }>accessCap.details).data
      );

      return fields.stream_id === streamId;
    });

    if (accessCap) {
      const { data } = <{ data: SuiMoveObject }>accessCap.details;
      const id = object.getObjectId(data);
      const fields = object.getFields(data);

      return { id, streamId: fields.stream_id };
    }
  }
}
