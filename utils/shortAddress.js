export function shortAddress(address) {
    const shortAddress = address && [address.substr(0, 4), address.substr(38, 4)].join("...");

    return shortAddress;
}
