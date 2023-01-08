import { env } from "@/config";
import { JsonRpcProvider } from "@mysten/sui.js";

export const provider = new JsonRpcProvider(env.suiRpcUrl);
