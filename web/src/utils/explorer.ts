export function getTxExplorerLink(network: string, txHash: string) {
  // return `https://${network}.etherscan.io/tx/${txHash}`;
  return `https://solscan.io/tx/${txHash}`;
}

export function getAddressExplorerLink(network: string, address: string) {
  return `https://${network}.etherscan.io/address/${address}`;
}
