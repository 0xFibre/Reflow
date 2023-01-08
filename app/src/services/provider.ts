import { env } from "@/config";
import {
  GetObjectDataResponse,
  isValidSuiObjectId,
  JsonRpcProvider,
  normalizeSuiObjectId,
  ObjectId,
} from "@mysten/sui.js";

export class Provider extends JsonRpcProvider {
  constructor() {
    super(env.suiRpcUrl);
  }

  // async getDynamicFields(
  //   objectId: ObjectId,
  //   cursor: ObjectId | null = null,
  //   limit: number | null = null
  // ): Promise<GetObjectDataResponse> {
  //   try {
  //     if (!objectId || !isValidSuiObjectId(normalizeSuiObjectId(objectId))) {
  //       throw new Error("Invalid Sui Object id");
  //     }
  //     if (cursor && !isValidSuiObjectId(normalizeSuiObjectId(objectId))) {
  //       throw new Error("Invalid cursor");
  //     }

  //     return await this.client.requestWithType(
  //       "sui_getDynamicFields",
  //       [objectId, cursor, limit],
  //       GetObjectDataResponse,
  //       this.options.skipDataValidation
  //     );
  //   } catch (err) {
  //     throw new Error(
  //       `Error fetching dynamic fields: ${err} for id ${objectId}`
  //     );
  //   }
  // }

  async getDynamicFieldObject(
    objectId: ObjectId,
    name: string
  ): Promise<GetObjectDataResponse> {
    try {
      if (!objectId || !isValidSuiObjectId(normalizeSuiObjectId(objectId))) {
        throw new Error("Invalid Sui Object id");
      }

      return await this.client.requestWithType(
        "sui_getDynamicFieldObject",
        [objectId, name],
        GetObjectDataResponse,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching dynamic fields: ${err} for id ${objectId}`
      );
    }
  }
}
