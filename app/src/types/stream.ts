import { BigNumber } from "@/utils";

export interface CreateStreamData {
  recipient: string;
  amount: string;
  coinId: string;
  coinType: string;
  startTime: string;
  endTime: string;
}

export interface StreamData {
  id: string;
  sender: string;
  recipient: string;
  depositedAmount: BigNumber;
  withdrawnAmount: BigNumber;
  createdAt: number;
  startTime: number;
  endTime: number;
  amountPerSecond: BigNumber;
  status: number;
  balance: BigNumber;
}
