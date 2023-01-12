interface Config {
  stream: {
    status: string[];
  };
  explorerUrl: string;
}
export const config: Config = {
  stream: {
    status: ["Active", "Completed", "Canceled"],
  },
  explorerUrl: "https://explorer.sui.io",
};
