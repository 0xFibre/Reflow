import { SuiMoveObject, SuiObject } from "@mysten/sui.js";

function getObjectId(object: SuiMoveObject) {
  return object.fields.id.id;
}

function getFields(object: SuiMoveObject) {
  return object.fields;
}

export const object = { getObjectId, getFields };
