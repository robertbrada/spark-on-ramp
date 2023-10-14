import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { PublicErc4337Client } from "@alchemy/aa-core";
import {
  SimpleSmartContractAccount,
  SmartAccountProvider,
  SmartAccountSigner,
  createPublicErc4337Client,
  deepHexlify,
  getUserOperationHash,
} from "@alchemy/aa-core";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  CopyButton,
  Group,
  Stack,
  Text,
  Tooltip,
  MantineProvider,
  Anchor,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { ParticleNetwork } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import {
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconX,
} from "@tabler/icons-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import type {
  Chain,
  HDAccount,
  PublicClient,
  TransactionReceipt,
  WalletClient,
} from "viem";
import {
  createWalletClient,
  encodeFunctionData,
  http,
  parseEther,
  publicActions,
  toHex,
} from "viem";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import classes from "./App.module.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { OnrampModal } from "./components/OnrampModal/OnrampModal";
import { Toolbar } from "./components/Toolbar/Toolbar";
import {
  ApplePayLogo,
  GPayLogo,
  MastercardLogo,
  ParticleLogo,
  VisaLogo,
} from "./components/logos";
import { dappConfigurations } from "./configs/clientConfigs";
import { factoryAbi } from "./contracts/factoryAbi";
import { daiAbi } from "./contracts/daiAbi";
import { simpleFactoryAbi } from "./contracts/simpleFactoryAbi";
import { withAlchemyGasManager } from "@alchemy/aa-alchemy";
import { EthereumGoerli } from "@particle-network/chains";
import { theme } from "./theme";
import { getTxExplorerLink } from "./utils/explorer";

const OWNER_MNEMONIC = import.meta.env.VITE_MNEMONIC;
const DEPLOYER_PRIVATE_KEY = import.meta.env.VITE_DEPLOYER_PRIVATE_KEY;
const PARTICLE_APP_ID = import.meta.env.VITE_PARTICLE_APP_ID;
const PARTICLE_PROJECT_ID = import.meta.env.VITE_PARTICLE_PROJECT_ID;
const PARTICLE_CLIENT_KEY = import.meta.env.VITE_PARTICLE_CLIENT_KEY;

const particle = new ParticleNetwork({
  projectId: PARTICLE_PROJECT_ID,
  clientKey: PARTICLE_CLIENT_KEY,
  appId: PARTICLE_APP_ID,
  chainName: EthereumGoerli.name, //optional: current chain name, default Ethereum.
  chainId: EthereumGoerli.id, //optional: current chain id, default 1.
});

function App() {
  // by changing the salt you can generate multiple wallets (with different address) for the same user.
  // In mainnet scenario should be random value so that hackers can't guess user's wallet addresses beforehand and deploy there other contracts
  const [walletSalt, setWalletSalt] = useState(0n);
  const [erc4337Client, setErc4337Client] = useState<PublicErc4337Client>();
  const [deployerWalletClient, setDeployerWalletClient] =
    useState<WalletClient>();
  const [chain, setChain] = useState<Chain>(goerli);
  const [particleProvider, setParticleProvider] = useState<ParticleProvider>();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingDeployment, setLoadingDeployment] = useState(false);
  const [loadingDaiDeposit, setLoadingDaiDeposit] = useState(false);
  const [onrampOpened, { open: openOnramp, close: closeOnramp }] =
    useDisclosure(false);
  const [entryPointAddress, setEntryPointAddress] = useState<`0x${string}`>();
  const [particleAccountAddress, setParticleAccountAddress] =
    useState<`0x${string}`>();
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();

  useEffect(() => {
    async function init() {
      const appConfig = dappConfigurations[chain.id];
      const client = createPublicErc4337Client({
        chain,
        rpcUrl: appConfig.rpcUrl,
      });
      setErc4337Client(client);

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

      const deployerAccount = privateKeyToAccount(`0x${DEPLOYER_PRIVATE_KEY}`);
      const walletClient = createWalletClient({
        account: deployerAccount,
        chain,
        transport: http(),
      });

      setDeployerWalletClient(walletClient);
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

  async function doAATransaction() {
    const appConfig = dappConfigurations[chain.id];

    try {
      if (!particleProvider) {
        throw new Error("Particle provider not initialized");
      }

      if (!entryPointAddress) {
        throw new Error("entryPointAddress address not set");
      }

      if (!erc4337Client) {
        console.error("Client not defined");
        return;
      }
      const particleSigner = await getParticleSigner();
      const particleSignerAddress =
        (await particleSigner.getAddress()) as `0x${string}`;
      localStorage.setItem("user", particleSignerAddress);
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
          factoryAddress: appConfig.accountFactoryAddress,
          rpcClient: provider,
          index: walletSalt,
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
        args: [particleSignerAddress as `0x${string}`, walletSalt], // User's Smart Contract Wallet Address
      });

      console.log("entryPointAddress", entryPointAddress);
      console.log("particleSignerAddress", particleSignerAddress);
      console.log("smartAccountAddress", smartAccountAddress);
      console.log("data", data);

      // ============================
      // TODO here you can create ADMIN signer that will sign the deploy transaction
      // TODO test if deploy passes with arbitrary signature value
      const userOp = await smartAccountSigner.buildUserOperation({
        target: appConfig.accountFactoryAddress as `0x${string}`,
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
      //     target: appConfig.accountFactoryAddress as `0x${string}`,
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
      setLoadingLogin(false);
      console.error(error);
    }
  }

  const logout = async () => {
    particle.auth.logout().then(() => {
      console.log("logout");
    });
    setWalletAddress(undefined);
    setParticleAccountAddress(undefined);
  };

  // for particle auth
  const login = async () => {
    try {
      if (!particleProvider) {
        throw new Error("Particle provider not initialized");
      }

      if (!entryPointAddress) {
        throw new Error("entryPointAddress address not set");
      }

      if (!erc4337Client) {
        console.error("Client not defined");
        return;
      }

      setLoadingLogin(true);
      const particleSigner = await getParticleSigner();
      const particleSignerAddress =
        (await particleSigner.getAddress()) as `0x${string}`;
      localStorage.setItem("user", particleSignerAddress);
      setParticleAccountAddress(particleSignerAddress);

      const smartAccountAddress = await getSmartAccountAddress(
        erc4337Client,
        particleSignerAddress,
        walletSalt
      );

      setWalletAddress(smartAccountAddress);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLogin(false);
    }
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

  async function getSmartAccountAddress(
    client: PublicErc4337Client,
    ownerAddress: `0x${string}`,
    salt: bigint = BigInt(0)
  ) {
    const address = await client.readContract({
      address: dappConfigurations[chain.id].accountFactoryAddress,
      abi: factoryAbi,
      functionName: "getAddress",
      args: [ownerAddress, salt], // the default AA-SDK uses 0 for the salt
    });
    return address;
  }

  // Deploys user's smart account wallet
  // The transaction is signed and paid for by deployerAccount which is sponsoring user's first transaction
  // as part of the easier onboarding process
  async function deploySmartAccount() {
    if (!erc4337Client) {
      console.error("erc4337Client not defined");
      return;
    }

    if (!deployerWalletClient) {
      throw new Error("deployerWalletClient not initialized");
    }

    if (!particleAccountAddress) {
      console.error("particleAccount not defined");
      return;
    }

    setLoadingDeployment(true);

    // calls createAccount() function on the SimpleAccountFactory contract
    // TODO try to simulate transaction using deployerWalletClient (check publicActions from view)
    const { request } = await erc4337Client.simulateContract({
      address: dappConfigurations[chain.id].accountFactoryAddress,
      abi: factoryAbi,
      functionName: "createAccount",
      args: [particleAccountAddress, walletSalt],
    });
    const txHash = await deployerWalletClient.writeContract(request);
    console.log("txHash", txHash);
    const receipt = await erc4337Client.waitForTransactionReceipt({
      hash: txHash,
    });
    console.log("receipt", receipt);
    setLoadingDeployment(false);
    showTxNotification(receipt, "Deployment success!");
  }

  async function depositDai(depositAddress: `0x${string}`, amount: bigint) {
    // This function is here just for demo purposes.
    // Fiat on-ramp service like Moonpay will handle the DAI transfer
    console.log("depositDai()", { depositAddress, amount });
    const appConfig = dappConfigurations[chain.id];

    if (!erc4337Client) {
      console.error("erc4337Client not defined");
      return;
    }

    if (!deployerWalletClient) {
      throw new Error("deployerWalletClient not initialized");
    }

    if (!particleAccountAddress) {
      console.error("particleAccount not defined");
      return;
    }

    setLoadingDaiDeposit(true);
    const { request } = await erc4337Client.simulateContract({
      address: appConfig.daiAddress,
      abi: daiAbi,
      functionName: "transfer",
      args: [depositAddress, amount],
    });

    const txHash = await deployerWalletClient.writeContract(request);
    console.log("txHash", txHash);
    const receipt = await erc4337Client.waitForTransactionReceipt({
      hash: txHash,
    });
    // takes a while for gas price 0.000000011 Gwei
    console.log("receipt", receipt);
    setLoadingDaiDeposit(false);
    showTxNotification(receipt, "Deposit success!");
  }

  function showTxNotification(
    receipt: TransactionReceipt,
    successTitle: string
  ) {
    const txSuccess = receipt.status === "success";
    notifications.show({
      title: txSuccess ? successTitle : "Tx reverted",
      message: (
        <Anchor
          href={getTxExplorerLink(chain.network, receipt.transactionHash)}
          target="_blank"
          c="white"
        >
          <Group gap="xs">
            <Text>View in explorer </Text>
            <IconExternalLink color="white" size="1rem" />
          </Group>
        </Anchor>
      ),
      icon: txSuccess ? (
        <IconCheck style={{ width: "1.1rem", height: "1.1rem" }} stroke={2.5} />
      ) : (
        <IconX style={{ width: "1.1rem", height: "1.1rem" }} stroke={2.5} />
      ),

      withCloseButton: false,
      classNames: {
        root: txSuccess
          ? [
              classes["notification-root"],
              classes["notification-root-green"],
            ].join(" ")
          : [
              classes["notification-root"],
              classes["notification-root-red"],
            ].join(" "),
        title: classes["notification-title"],
        description: classes["notification-description"],
        icon: classes["notification-icon"],
      },
    });
  }

  return (
    <MantineProvider theme={theme}>
      <Notifications
        autoClose={5000}
        position="top-right"
        containerWidth={260}
      />
      <main className={classes.root}>
        <Toolbar
          network={chain.network}
          eoaAddress={particleAccountAddress}
          walletAddress={walletAddress}
          loadingDeploy={loadingDeployment}
          onDeployWallet={deploySmartAccount}
          onLogout={logout}
          px="1rem"
          pt="1rem"
        />
        <Container className={classes.content} size="md" mt="xl">
          <Stack align="center">
            <Header mt="1rem" />
            {!walletAddress ? (
              <Button
                color="black"
                onClick={login}
                mt="4rem"
                size="xl"
                loading={loadingLogin}
              >
                <ParticleLogo size={18} mr="xs" />
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
                    {walletAddress}
                  </Text>
                  <CopyButton value={walletAddress}>
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
                              color="white"
                            />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                  <ActionIcon
                    component="a"
                    size="2.2rem"
                    href={`https://goerli.etherscan.io/address/${walletAddress}`}
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
          </Stack>

          <OnrampModal
            opened={onrampOpened}
            onClose={closeOnramp}
            depositAddress={walletAddress}
            loadingDeposit={loadingDaiDeposit}
            onDeposit={depositDai}
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
