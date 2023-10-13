import { Chain, goerli } from "viem/chains";

const GAS_MANAGER_POLICY_ID = import.meta.env.VITE_GAS_MANAGER_POLICY_ID;

export interface DAAppConfiguration {
  accountFactoryAddress: `0x${string}`;
  daiAddress: `0x${string}`;
  sDaiAddress: `0x${string}`;
  gasManagerPolicyId: string;
  rpcUrl: string;
  chain: Chain;
}

// TODO: Replace with your own contract addresses and policy ids, feel free to add or remove chains.
export const dappConfigurations: Record<number, DAAppConfiguration> = {
  [goerli.id]: {
    // accountFactoryAddress: "0x9406cc6185a346906296840746125a0e44976454", // original
    accountFactoryAddress: "0x7a2e67fb76ed492cba8cfa3d6786890572c4a6d9", // spark account
    daiAddress: "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
    sDaiAddress: "0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C",
    gasManagerPolicyId: GAS_MANAGER_POLICY_ID,
    rpcUrl: import.meta.env.VITE_ALCHEMY_RPC_ENDPOINT,
    chain: goerli,
  },
};
