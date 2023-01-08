interface Config {
  stream: {
    status: string[];
  };
}
export const config: Config = {
  stream: {
    status: ["Active", "Closed"],
  },
};
