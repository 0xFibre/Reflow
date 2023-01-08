import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-wallet-standard";
import { StandardWalletAdapter } from "@mysten/wallet-adapter-wallet-standard/dist/StandardWalletAdapter";

interface MoveCallPayload {
  function: string;
  package: string;
  module: string;
  typeArgs?: string[];
  valueArgs: any[];
}

export class Connection {
  private provider: WalletStandardAdapterProvider;
  private walletAdapter?: StandardWalletAdapter;
  private connected?: boolean;

  constructor() {
    this.provider = new WalletStandardAdapterProvider();
  }

  getWalletAdaptersMeta() {
    const wallets = this.getWalletAdapters();
    return wallets.map((wallet) => ({ name: wallet.name, icon: wallet.icon }));
  }

  getWalletAdapters() {
    return this.provider.get();
  }

  selectAdapter(name: string) {
    const walletAdapters = this.getWalletAdapters();
    this.walletAdapter = walletAdapters.find((wa) => wa.name === name);
  }

  isConnected() {
    return !!this.connected;
  }

  async connect() {
    if (!this.walletAdapter) throw new Error("Please select a wallet first");

    await this.walletAdapter.connect();
    this.connected = true;

    return await this.getWallet();
  }

  async disconnect() {
    if (!this.walletAdapter) throw new Error("Please select a wallet first");

    await this.walletAdapter.disconnect();
    this.connected = false;
  }

  async getWallet() {
    if (!this.walletAdapter) throw new Error("Please select a wallet first");
    const accounts = await this.walletAdapter.getAccounts();

    return {
      account: accounts[0],
      wallet: { ...this.walletAdapter.wallet },
    };
  }

  async executeMoveCall(payload: MoveCallPayload) {
    if (!this.walletAdapter) throw new Error("Please select a wallet first");

    const data = {
      function: payload.function,
      packageObjectId: payload.package,
      module: payload.module,
      typeArguments: payload.typeArgs || [],
      arguments: payload.valueArgs,
      gasBudget: 30000,
    };

    return await this.walletAdapter.signAndExecuteTransaction({
      data,
      kind: "moveCall",
    });
  }
}
