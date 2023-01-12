import { provider } from "@/services";
import { StreamData } from "@/types";
import { BigNumber } from "@/utils";
import { CoinMetadata } from "@mysten/sui.js";

export class Stream {
  public id: string;
  public sender: string;
  public recipient: string;
  public coinType: string;
  public depositedAmount: BigNumber;
  public withdrawnAmount: BigNumber;
  public createdAt: number;
  public startsAt: number;
  public endsAt: number;
  public canceledAt: number;
  public amountPerSecond: BigNumber;
  public status: number;
  public balance: BigNumber;
  public coinMetadata: CoinMetadata;

  constructor(data: StreamData) {
    this.id = data.id;
    this.sender = data.sender;
    this.recipient = data.recipient;
    this.depositedAmount = data.depositedAmount;
    this.withdrawnAmount = data.withdrawnAmount;
    this.createdAt = data.createdAt;
    this.startsAt = data.startsAt;
    this.endsAt = data.endsAt;
    this.canceledAt = data.canceledAt;
    this.amountPerSecond = data.amountPerSecond;
    this.status = data.status;
    this.coinType = data.coinType;
    this.balance = data.balance;
    this.coinMetadata = data.coinMetadata;
  }

  delta(): number {
    const now = Math.round(Date.now() / 1000);

    if (this.startsAt >= now) return 0;
    if (this.canceledAt) return this.canceledAt - this.startsAt;
    if (this.endsAt > now) return now - this.startsAt;
    return this.endsAt - this.startsAt;
  }

  get recipientBalance() {
    return this.streamedAmount.minus(this.withdrawnAmount);
  }

  get senderBalance() {
    const recipientBalance = this.recipientBalance;
    return this.balance.minus(recipientBalance);
  }

  get streamedAmount() {
    return this.amountPerSecond.multipliedBy(this.delta());
  }

  get streamProgress() {
    return this.streamedAmount
      .dividedBy(this.depositedAmount)
      .multipliedBy(100);
  }

  get withdrawalProgress() {
    return this.withdrawnAmount
      .dividedBy(this.depositedAmount)
      .multipliedBy(100);
  }
}
