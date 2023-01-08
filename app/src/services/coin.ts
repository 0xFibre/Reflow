import { provider } from "@/services";
import { SuiMoveObject } from "@mysten/sui.js";

export class Coin {
  async selectCoinWithBalanceGreaterThanOrequal(data: {
    address: string;
    amount: bigint;
    coinType: string;
  }) {
    let coins = await provider.selectCoinsWithBalanceGreaterThanOrEqual(
      data.address,
      data.amount,
      data.coinType
    );

    if (coins.length > 0) {
      const coin = coins[0].details as any;

      return {
        id: this.getId(coin.data),
        balance: this.getBalance(coin.data),
        coinType: this.getCoinType(coin.data),
      };
    }

    return;
  }

  async getCoinMetadata(coinType: string) {
    const metadata = await provider.getCoinMetadata(coinType);
    return metadata;
  }

  getBalance(coin: SuiMoveObject) {
    return BigInt(coin.fields.balance);
  }

  getId(coin: SuiMoveObject) {
    return coin.fields.id.id;
  }

  getCoinType(coin: SuiMoveObject) {
    return coin.type;
  }
}
