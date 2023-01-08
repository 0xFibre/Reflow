import { StreamData } from "@/types";
import { BigNumber } from "@/utils";

export class Stream {
  public id: string;
  public sender: string;
  public recipient: string;
  public depositedAmount: BigNumber;
  public withdrawnAmount: BigNumber;
  public createdAt: number;
  public startTime: number;
  public endTime: number;
  public amountPerSecond: BigNumber;
  public status: number;
  public balance: BigNumber;

  constructor(data: StreamData) {
    this.id = data.id;
    this.sender = data.sender;
    this.recipient = data.recipient;
    this.depositedAmount = data.depositedAmount;
    this.withdrawnAmount = data.withdrawnAmount;
    this.createdAt = data.createdAt;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.amountPerSecond = data.amountPerSecond;
    this.status = data.status;
    this.balance = data.balance;
  }

  delta(): number {
    const now = Math.round(Date.now() / 1000);

    if (this.startTime >= now) return 0;
    if (this.endTime > now) return now - this.startTime;
    return this.endTime - this.startTime;
  }

  getRecipientBalance() {
    let balance = this.amountPerSecond.multipliedBy(this.delta());
    return balance.minus(this.withdrawnAmount);
  }

  getSenderBalance() {
    const recipientBalance = this.getRecipientBalance();
    return this.balance.minus(recipientBalance);
  }

  getStreamProgress() {
    const totalStreamed = this.amountPerSecond.multipliedBy(this.delta());
    return totalStreamed.dividedBy(this.depositedAmount).multipliedBy(100);
  }
}
