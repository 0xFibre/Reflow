interface Config {
  stream: {
    status: string[];
  };
  explorerUrl: string;
}
export const config: Config = {
  stream: {
    status: ["Active", "Completed", "Stopped"],
  },
  explorerUrl: "https://explorer.sui.io",
};
