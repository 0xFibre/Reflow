import { BigNumber } from "@/utils";
import { CoinMetadata } from "@mysten/sui.js";

export type StreamType = "incoming" | "outgoing";

export interface CreateStreamData {
  recipient: string;
  amount: string;
  coinId: string;
  coinType: string;
  startsAt: string;
  endsAt: string;
}

export interface WithdrawFromStreamData {
  streamId: string;
  accessCapId: string;
  amount: string;
  coinType: string;
}

export interface StopStreamData {
  streamId: string;
  accessCapId: string;
  coinType: string;
}

export interface StreamData {
  id: string;
  sender: string;
  recipient: string;
  coinType: string;
  depositedAmount: BigNumber;
  withdrawnAmount: BigNumber;
  createdAt: number;
  startsAt: number;
  endsAt: number;
  canceledAt: number;
  amountPerSecond: BigNumber;
  status: number;
  balance: BigNumber;
  coinMetadata: CoinMetadata;
}
