import { ethers } from "ethers";

export const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/f74ad8aacd6a44a7a52f4db811276bcd"
);

export const getENS = async (address) => {
  const ens = await provider.lookupAddress(address);
  return ens;
};

export const shortenAddress = (address) => {
  return address && [address.substr(0, 4), address.substr(38, 4)].join("...");
};

export const urlify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part) => {
    if (part.match(urlRegex)) {
      const filtered = part.replace(/\.+$/, "");
      return (
        <a
          href={filtered}
          className="hover:text-noun-red underline transition ease-in-out 125"
          target="_blank"
          rel="noreferrer"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const buildEtherscanAddressLink = (address) => {
  const BASE_URL = "https://etherscan.io/";
  const path = `address/${address}`;
  return new URL(path, BASE_URL).toString();
};

export const buildTwitterLink = (handle) => {
  const BASE_URL = "https://twitter.com";
  return new URL(handle, BASE_URL).toString();
};

export const getCurrentMonthString = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  return month[d.getMonth()];
};
