export const utils = {
  truncateAddress(address: string) {
    const regex = /^(0x[a-zA-Z0-9]{5})[a-zA-Z0-9]+([a-zA-Z0-9]{5})$/;
    const match = address.match(regex);

    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  },
};
