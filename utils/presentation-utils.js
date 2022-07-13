import { ethers } from "ethers";

// Infura provider for ENS resolution
export const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/f74ad8aacd6a44a7a52f4db811276bcd"
);

/**
 * Resolve ENS for address if one exits
 * @param address ETH address
 * @returns ENS for address or null
 */
export const getENS = async (address) => {
  const ens = await provider.lookupAddress(address);
  return ens;
};

/**
 * Shorten ETH address for better formatting
 * @param address  ETH address
 * @returns Short version of address
 */
export const shortenAddress = (address) => {
  return address && [address.substr(0, 4), address.substr(38, 4)].join("...");
};

/**
 * Parse links in text into a tags
 * @param text String that may have a tags
 * @returns Text parsed with a tags around strings if applicable
 */
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

/**
 * Build Etherscan link from address
 * @param {*} address ETH address
 * @returns Etherscan link to address's page
 */
export const buildEtherscanAddressLink = (address) => {
  const BASE_URL = "https://etherscan.io/";
  const path = `address/${address}`;
  return new URL(path, BASE_URL).toString();
};

/**
 * Builds links to a given Twitter account's page
 * @param handle Twitter handle
 * @returns Link to that handle's page
 */
export const buildTwitterLink = (handle) => {
  const BASE_URL = "https://twitter.com";
  return new URL(handle, BASE_URL).toString();
};

/**
 * Gets current month in string format (e.g. January, Febuary, etc.)
 * @returns Current month as a string
 */
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
