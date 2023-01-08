import { StreamService } from "./stream";
import { Connection } from "./connection";
import { Coin } from "./coin";
import { Provider } from "./provider";

export const streamService = new StreamService();
export const connection = new Connection();
export const coin = new Coin();
export const provider = new Provider();
