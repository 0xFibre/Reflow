import { env } from "@/config";
import { CreateStreamData } from "@/types";
import { connection } from "@/utils";

export class Stream {
  public module = "stream";

  async createStream(data: CreateStreamData) {
    const payload = {
      function: "create_stream",
      module: this.module,
      package: env.slidePackageId,
      valueArgs: [
        data.amount,
        data.coinId,
        data.recipient,
        data.startTime,
        data.endTime,
        null,
        Date.now() / 1000,
      ],
      typeArgs: [data.coinType],
    };

    const response = await connection.executeMoveCall(payload);
    return response;
  }
}
