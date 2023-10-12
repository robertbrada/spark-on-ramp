import {
  Chain,
  goerli,
} from "viem/chains";

export interface DAAppConfiguration {
  nftContractAddress: `0x${string}`;
  simpleAccountFactoryAddress: `0x${string}`;
  gasManagerPolicyId: string;
  rpcUrl: string;
  chain: Chain;
}

// TODO: Replace with your own contract addresses and policy ids, feel free to add or remove chains.
export const dappConfigurations: Record<number, DAAppConfiguration> = {
  [goerli.id]: {
    nftContractAddress: "0x5679b0de84bba361d31b2e7152ab20f0f8565245",
    simpleAccountFactoryAddress: "0x9406cc6185a346906296840746125a0e44976454",
    gasManagerPolicyId: '87232682-487b-464c-823c-098a40cebd3a',
    rpcUrl: import.meta.env.VITE_ALCHEMY_RPC_ENDPOINT,
    chain: goerli,
  },
  // [sepolia.id]: {
  //   nftContractAddress: "0x5679b0de84bba361d31b2e7152ab20f0f8565245",
  //   simpleAccountFactoryAddress: "0x9406cc6185a346906296840746125a0e44976454",
  //   gasManagerPolicyId: env.NEXT_PUBLIC_SEPOLIA_POLICY_ID,
  //   rpcUrl: `/api/rpc/proxy?chainId=${sepolia.id}`,
  //   chain: sepolia,
  // },
  
};
