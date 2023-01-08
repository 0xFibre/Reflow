import { SuiMoveObject, SuiObject } from "@mysten/sui.js";

function getObjectId(object: SuiMoveObject) {
  return object.fields.id.id;
}

export const object = { getObjectId };
