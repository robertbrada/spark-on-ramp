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
    accountFactoryAddress: "0x9406cc6185a346906296840746125a0e44976454", // original
    // accountFactoryAddress: "0x7a2e67fb76ed492cba8cfa3d6786890572c4a6d9", // v1
    // accountFactoryAddress: "0xf04781C02863e60faae81b275DabB84392edFe1e", // v2
    // accountFactoryAddress: "0xef02133caa3d698db755e64e881ec9c0f1d1b886", // v3
    // accountFactoryAddress: "0x21796F49Ed923F224f59e7F1CA83719d867bd258", // v4
    // accountFactoryAddress: "0x18C245219B748952059d5ec4A02E13B5D157522d", // v5
    // accountFactoryAddress: "0x586e8b468D8492C9e38B616b5b5Cce4e7461BE15", // v6
    // accountFactoryAddress: "0xCd1754F5F1DF8Eb9e20899efE2e55793b9D26542", // v7
    // accountFactoryAddress: "0xaC65578AeaCa7AD50b638610bd4C7Ce53203Ff03", // v8
    daiAddress: "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
    sDaiAddress: "0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C",
    gasManagerPolicyId: GAS_MANAGER_POLICY_ID,
    rpcUrl: import.meta.env.VITE_ALCHEMY_RPC_ENDPOINT,
    chain: goerli,
  },
};

