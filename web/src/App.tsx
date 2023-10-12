import type { PublicErc4337Client } from "@alchemy/aa-core";
import {
  SimpleSmartContractAccount,
  SmartAccountProvider,
  SmartAccountSigner,
  createPublicErc4337Client,
  deepHexlify,
  getUserOperationHash,
} from "@alchemy/aa-core";
import { encodeFunctionData, parseEther } from "viem";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  CopyButton,
  Group,
  MantineProvider,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { ParticleNetwork } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import type { Chain, HDAccount } from "viem";
import { toHex } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import classes from "./App.module.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { OnrampModal } from "./components/OnrampModal/OnrampModal";
import type { SegmentValue } from "./components/UserSelection/UserSelection";
import {
  ApplePayLogo,
  ETHLogo,
  GPayLogo,
  MastercardLogo,
  VisaLogo,
} from "./components/logos";
import { dappConfigurations } from "./configs/clientConfigs";
import { factoryAbi } from "./contracts/factoryAbi";
import { simpleFactoryAbi } from "./contracts/simpleFactoryAbi";

import { withAlchemyGasManager } from "@alchemy/aa-alchemy";
import { EthereumGoerli } from "@particle-network/chains";
import { theme } from "./theme";

const OWNER_MNEMONIC = import.meta.env.VITE_MNEMONIC;

const particle = new ParticleNetwork({
  // projectId: "dc8fc110-da0e-4b55-b4c6-04af3aa9cb99",
  // clientKey: "cZmQiTMX9UJdPf7Dw9aA65d7skboxDqOAJXzzepq",
  // appId: "d461bb0f-9ddb-4f26-981e-a82f574d11af",
  // chainName: "Ethereum", //optional: current chain name, default Ethereum.
  // chainId: 5, //optional: current chain id, default 1.
  // projectId: "dc8fc110-da0e-4b55-b4c6-04af3aa9cb99",
  // clientKey: "cZmQiTMX9UJdPf7Dw9aA65d7skboxDqOAJXzzepq",
  // appId: "d461bb0f-9ddb-4f26-981e-a82f574d11af",

  projectId: "b4236292-c142-4a69-a941-8b7cf847a318",
  clientKey: "cSiUEe2hMNXEqPBH10Jgh3vRjTl60gIHk64AJXyB",
  appId: "0f0087be-c6b9-4414-b40f-df7705bf1b98",

  chainName: EthereumGoerli.name, //optional: current chain name, default Ethereum.
  chainId: EthereumGoerli.id, //optional: current chain id, default 1.
});

function App() {
  const [account, setAccount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [segmentValue, setSegmentValue] = useState<SegmentValue>("new");
  const [client, setClient] = useState<PublicErc4337Client>();
  const [owner, setOwner] = useState<HDAccount>(); // EOA Account that is the owner of Smart Wallet Account
  const [chain, setChain] = useState<Chain>(goerli);
  const [smartAccountAddress, setSmartAccountAddress] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [particleProvider, setParticleProvider] = useState<ParticleProvider>();
  const [particleAccount, setParticleAccount] = useState<string>();
  const [entryPointAddress, setEntryPointAddress] = useState<`0x${string}`>();
  const [onrampOpened, { open: openOnramp, close: closeOnramp }] =
    useDisclosure(false);

  useEffect(() => {
    async function init() {
      const appConfig = dappConfigurations[chain.id];
      const client = createPublicErc4337Client({
        chain,
        rpcUrl: appConfig.rpcUrl,
      });
      setClient(client);

      const particleProvider = new ParticleProvider(particle.auth);
      setParticleProvider(particleProvider);

      const entryPointAddress = await client!
        .getSupportedEntryPoints()
        .then((entrypoints) => {
          if (entrypoints.length === 0) {
            throw new Error("No entrypoints found");
          }
          return entrypoints[0];
        });

      setEntryPointAddress(entryPointAddress);
    }

    init();
  }, []);

  async function getParticleSigner() {
    if (!particleProvider) {
      throw new Error("Particle provider not initialized");
    }

    let userInfo;
    if (!particle.auth.isLogin()) {
      userInfo = await particle.auth.login();
    } else {
      userInfo = particle.auth.getUserInfo();
    }

    const ethersProvider = new ethers.providers.Web3Provider(
      particleProvider,
      "any"
    );

    return ethersProvider.getSigner();
  }
  // for particle auth
  const connect = async () => {
    const SALT = 2n;
    const appConfig = dappConfigurations[chain.id];
    try {
      if (!particleProvider) {
        throw new Error("Particle provider not initialized");
      }

      if (!entryPointAddress) {
        throw new Error("entryPointAddress address not set");
      }

      setDisabled(true);
      const particleSigner = await getParticleSigner();
      const particleSignerAddress = await particleSigner.getAddress();
      localStorage.setItem("user", particleSignerAddress);
      setAccount(particleSignerAddress);
      setParticleAccount(particleSignerAddress);

      // Now create Smart Account Signer
      const particleOwnerSigner: SmartAccountSigner = {
        signMessage: async (msg) =>
          (await particleSigner.signMessage(msg)) as `0x${string}`,
        getAddress: async () =>
          (await particleSigner.getAddress()) as `0x${string}`,
        signTypedData: async (params) => {
          return "0x"; // TODO
        },
      };

      let baseSigner = new SmartAccountProvider(
        appConfig.rpcUrl,
        entryPointAddress,
        chain,
        undefined,
        {
          txMaxRetries: 60,
        }
      ).connect((provider: any) => {
        if (!particleOwnerSigner) {
          throw new Error("No owner for account was found");
        }
        return new SimpleSmartContractAccount({
          entryPointAddress,
          chain,
          owner: particleOwnerSigner,
          factoryAddress: appConfig.simpleAccountFactoryAddress,
          rpcClient: provider,
          index: SALT,
        });
      });

      const smartAccountAddress = await baseSigner.getAddress();

      const smartAccountSigner = withAlchemyGasManager(baseSigner, {
        policyId: appConfig.gasManagerPolicyId,
        entryPoint: entryPointAddress,
      });

      const data = encodeFunctionData({
        abi: simpleFactoryAbi,
        functionName: "createAccount",
        args: [particleSignerAddress as `0x${string}`, SALT], // User's Smart Contract Wallet Address
      });

      console.log("entryPointAddress", entryPointAddress);
      console.log("particleSignerAddress", particleSignerAddress);
      console.log("smartAccountAddress", smartAccountAddress);
      console.log("data", data);

      // ============================
      // TODO here you can create ADMIN signer that will sign the deploy transaction
      // TODO test if deploy passes with arbitrary signature value
      const userOp = await smartAccountSigner.buildUserOperation({
        target: appConfig.simpleAccountFactoryAddress as `0x${string}`,
        data: data,
        value: parseEther("0"),
      });
      console.log("userOp", userOp);

      // send user operation
      const request = deepHexlify(userOp);
      // if (!isValidRequest(request)) {...}

      const adminSigner = await getAdminSigner();
      console.log("admin address", await adminSigner.getAddress());

      // This opens Particle Modal
      // request.signature = (await smartAccountSigner.account.signMessage(
      request.signature = (await adminSigner.signMessage(
        getUserOperationHash(
          request,
          entryPointAddress as `0x${string}`,
          BigInt(chain.id)
        )
      )) as `0x${string}`;

      console.log("request", request);

      // // Request to eth_sendUserOperation fails because of invalid signature
      const resultHash = await smartAccountSigner.rpcClient.sendUserOperation(
        request,
        entryPointAddress
      );
      console.log("resultHash", resultHash);

      // ============================

      // const result: SendUserOperationResult =
      //   await smartAccountSigner.sendUserOperation({
      //     target: appConfig.simpleAccountFactoryAddress as `0x${string}`,
      //     data: data,
      //     value: parseEther("0"),
      //   });

      // console.log("User operation result: ", result);

      // console.log(
      //   "\nWaiting for the user operation to be included in a mined transaction..."
      // );

      // const txHash = await smartAccountSigner.waitForUserOperationTransaction(
      //   result.hash as `0x${string}`
      // );

      // console.log("\nTransaction hash: ", txHash);

      // const userOpReceipt = await smartAccountSigner.getUserOperationReceipt(
      //   result.hash as `0x${string}`
      // );

      // console.log("\nUser operation receipt: ", userOpReceipt);

      // const txReceipt =
      //   await smartAccountSigner.rpcClient.waitForTransactionReceipt({
      //     hash: txHash,
      //   });

      // console.log("\n txReceipt: ", txReceipt);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  const disconnect = async () => {
    localStorage.removeItem("user"); // Remove user from local storage
    setAccount(""); // Reset the account state
  };

  async function getAdminSigner() {
    const adminAccount = mnemonicToAccount(OWNER_MNEMONIC);
    const admin: SmartAccountSigner = {
      signMessage: async (msg) =>
        adminAccount.signMessage({
          message: { raw: toHex(msg) },
        }),
      getAddress: async () => adminAccount.address,
      signTypedData: async (params) => {
        return adminAccount.signTypedData(params);
      },
    };

    return admin;
  }

  async function getOwner() {
    const ownerAccount = mnemonicToAccount(OWNER_MNEMONIC);
    return ownerAccount;
  }

  async function getSmartAccountAddress(
    client: PublicErc4337Client,
    owner: HDAccount,
    salt: bigint = BigInt(0)
  ) {
    const address = await client.readContract({
      address: dappConfigurations[chain.id].simpleAccountFactoryAddress,
      abi: factoryAbi,
      functionName: "getAddress",
      args: [owner.address, salt], // the default AA-SDK uses 0 for the salt
    });
    return address;
  }

  async function createAccount() {
    if (!client) {
      console.error("Client not defined");
      return;
    }
    setCreatingAccount(true);
    const owner = await getOwner();
    const smartAccountAddress = await getSmartAccountAddress(client, owner);
    setCreatingAccount(false);
    setOwner(owner);
    setSmartAccountAddress(smartAccountAddress);
  }

  async function deploySmartAccount() {
    console.log("deploySmartAccount()");
  }

  return (
    <MantineProvider theme={theme}>
      <main className={classes.root}>
        <Group
          className={classes.controls}
          justify="space-between"
          px="1rem"
          pt="1rem"
        >
          <Group gap="xs">
            <ETHLogo size={20} />
            <Text fw={600} mt={1}>
              Goerli Testnet
            </Text>
          </Group>
          {smartAccountAddress && (
            <Button
              color="black"
              size="xs"
              variant="light"
              onClick={deploySmartAccount}
            >
              Deploy Smart Account
            </Button>
          )}
        </Group>
        <Container className={classes.content} size="md" mt="xl">
          <Stack align="center">
            <Header mt="1rem" />
            {/* <UserSelection value={segmentValue} onChange={setSegmentValue} /> */}

            {/* {owner && (
              <Group>
                <Text fw={600}>EOA Owner: </Text>
                <Text>{owner.address}</Text>
              </Group>
            )} */}

            <Button color="red" onClick={connect} mt="2rem" size="md">
              Connect
            </Button>

            {!smartAccountAddress ? (
              <Button
                color="black"
                onClick={createAccount}
                mt="4rem"
                size="xl"
                loading={creatingAccount}
              >
                Log in
              </Button>
            ) : (
              <Stack mt="2rem" gap="0rem" align="center">
                <Text className={classes["wallet-address-title"]}>
                  Your wallet address:
                </Text>
                <Text className={classes["wallet-address-desc"]}>
                  Simply deposit DAI to this address and start earning
                </Text>
                <Group
                  className={classes["wallet-address-wrapper"]}
                  gap="xs"
                  mt="1.5rem"
                >
                  <Text className={classes["wallet-address"]}>
                    {smartAccountAddress}
                  </Text>
                  <CopyButton value={smartAccountAddress}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy address"}
                        withArrow
                        position="top"
                      >
                        <ActionIcon
                          size="2.2rem"
                          className={classes.actionIcon}
                          color={copied ? "teal" : "yellow"}
                          onClick={copy}
                          variant="filled"
                        >
                          {copied ? (
                            <IconCheck size="1.3rem" stroke={2.5} />
                          ) : (
                            <IconCopy
                              size="1.3rem"
                              stroke={2.5}
                              color={theme.white}
                            />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                  <ActionIcon
                    component="a"
                    size="2.2rem"
                    href={`https://goerli.etherscan.io/address/${smartAccountAddress}`}
                    target="_blank"
                    className={classes.actionIcon}
                    variant="filled"
                    color="yellow"
                  >
                    <IconExternalLink size="1.3rem" stroke={2.5} />
                  </ActionIcon>
                </Group>
                <Button
                  onClick={openOnramp}
                  size="xl"
                  mt="4rem"
                  classNames={{ root: classes["buy-button"] }}
                >
                  <Text fw={700} size="1.4rem">
                    Deposit DAI
                  </Text>
                </Button>
                <Group gap="md" opacity={1.0} mt="1.6rem">
                  <GPayLogo size={34} variant="white-text" />
                  <VisaLogo size={30} variant="white" />
                  <ApplePayLogo size={34} variant="white" />
                  <MastercardLogo size={24} variant="white-text" />
                </Group>
              </Stack>
            )}

            {account && (
              <div>
                <h2>EOA Address</h2>
                <p>{account}</p>
              </div>
            )}
          </Stack>

          <OnrampModal
            opened={onrampOpened}
            onClose={closeOnramp}
            address={smartAccountAddress}
          />
        </Container>
        <Box className={classes.footer}>
          <Footer />
        </Box>
      </main>
    </MantineProvider>
  );
}

export default App;
