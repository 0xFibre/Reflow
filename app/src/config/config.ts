interface Config {
  stream: {
    status: string[];
  };
  explorerUrl: string;
}
export const config: Config = {
  stream: {
    status: ["Active", "Closed"],
  },
  explorerUrl: "https://explorer.sui.io",
};
