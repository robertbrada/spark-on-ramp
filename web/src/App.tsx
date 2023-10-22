import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { withAlchemyGasManager } from "@alchemy/aa-alchemy";
import type {
  PublicErc4337Client,
  SendUserOperationResult,
} from "@alchemy/aa-core";
import {
  SimpleSmartContractAccount,
  SmartAccountProvider,
  SmartAccountSigner,
  createPublicErc4337Client,
  deepHexlify,
  getUserOperationHash,
} from "@alchemy/aa-core";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  MantineProvider,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";
import { ParticleNetwork } from "@particle-network/auth";
import { EthereumGoerli } from "@particle-network/chains";
import { ParticleProvider } from "@particle-network/provider";
import { IconCheck, IconExternalLink, IconX } from "@tabler/icons-react";
import Decimal from "decimal.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import type {
  Chain,
  PublicClient,
  TransactionReceipt,
  WalletClient,
} from "viem";
import { createWalletClient, encodeFunctionData, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import classes from "./App.module.css";
import { Footer } from "./components/Footer/Footer";
import { FundedWallet } from "./components/FundedWallet/FundedWallet";
import { Header } from "./components/Header/Header";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { OnboardingSteps } from "./components/OnboardingSteps/OnboardingSteps";
import { OnrampModal } from "./components/OnrampModal/OnrampModal";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { ParticleLogo } from "./components/logos";
import { dappConfigurations } from "./configs/clientConfigs";
import { daiAbi } from "./contracts/daiAbi";
import { factoryAbi } from "./contracts/factoryAbi";
import { sDaiAbi } from "./contracts/sDaiAbi";
import { simpleFactoryAbi } from "./contracts/simpleFactoryAbi";
import { theme } from "./theme";
import { getTxExplorerLink } from "./utils/explorer";

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
  const [walletSalt, setWalletSalt] = useState(16n);
  const [erc4337Client, setErc4337Client] = useState<PublicErc4337Client>();
  const [deployerWalletClient, setDeployerWalletClient] =
    useState<WalletClient>();
  const [chain, setChain] = useState<Chain>(goerli);
  const [particleProvider, setParticleProvider] = useState<ParticleProvider>();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingDeployment, setLoadingDeployment] = useState(false);
  const [loadingApproval, setLoadingApproval] = useState(false);
  const [loadingSparkDeposit, setLoadingSparkDeposit] = useState(false);
  const [loadingDaiDeposit, setLoadingDaiDeposit] = useState(false);
  const [loadingWalletUpdate, setLoadingWalletUpdate] = useState(false);
  const [onrampOpened, { open: openOnramp, close: closeOnramp }] =
    useDisclosure(false);
  const [entryPointAddress, setEntryPointAddress] = useState<`0x${string}`>();
  const [particleAccountAddress, setParticleAccountAddress] =
    useState<`0x${string}`>();
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const [walletExists, setWalletExists] = useState(false);
  const [updatingBalances, setUpdatingBalances] = useState(false);
  const [updatingAllowance, setUpdatingAllowance] = useState(false);
  const [walletSigner, setWalletSigner] = useState<SmartAccountProvider>();
  const [daiBalance, setDaiBalance] = useState<Decimal>(new Decimal(0));
  const [sDaiBalance, setSDaiBalance] = useState<Decimal>(new Decimal(0));
  const [daiAllowance, setDaiAllowance] = useState<Decimal>(new Decimal(0));

  useEffect(() => {
    updateWalletBalances();
    updateWalletDaiAllowance();
  }, [walletAddress]);

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

  async function updateWalletState() {
    setLoadingWalletUpdate(true);
    await checkIfWalletExists();
    await updateWalletBalances();
    await updateWalletDaiAllowance();
    setLoadingWalletUpdate(false);
  }

  async function checkIfWalletExists() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(walletAddress, "walletAddress not defined");
      invariant(particleProvider, "particleProvider not defined");

      const bytecode = await erc4337Client.getBytecode({
        address: walletAddress,
      });

      setWalletExists(bytecode !== undefined);
    } catch (e) {
      console.error(e);
    } finally {
    }
  }

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

  async function setSigners() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(entryPointAddress, "entryPointAddress not defined");
      invariant(particleProvider, "particleProvider not defined");

      const appConfig = dappConfigurations[chain.id];
      const particleSigner = await getParticleSigner();

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

      // For demo purposes, all transaction are paid by paymaster
      const smartAccountSigner = withAlchemyGasManager(baseSigner, {
        policyId: appConfig.gasManagerPolicyId,
        entryPoint: entryPointAddress,
      });

      setWalletSigner(smartAccountSigner);
      console.log("Signers set");
    } catch (e) {
      console.log(e);
    }
  }

  async function getErc20Balance(
    client: PublicClient,
    accountAddress: `0x${string}`,
    tokenAddress: `0x${string}`
  ) {
    return await client.readContract({
      address: tokenAddress,
      abi: daiAbi,
      functionName: "balanceOf",
      args: [accountAddress],
    });
  }

  async function batchApproveDeposit() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(walletSigner, "walletSigner not defined");
      invariant(entryPointAddress, "entryPointAddress not defined");

      const appConfig = dappConfigurations[chain.id];
      const walletAddress = await walletSigner.getAddress();

      const walletDaiBalance = await getErc20Balance(
        erc4337Client,
        walletAddress,
        appConfig.daiAddress
      );

      const dataDaiApprove = encodeFunctionData({
        abi: daiAbi,
        functionName: "approve",
        args: [appConfig.sDaiAddress, walletDaiBalance],
      });

      const dataSparkDeposit = encodeFunctionData({
        abi: sDaiAbi,
        functionName: "deposit",
        args: [walletDaiBalance, await walletSigner.getAddress()],
      });

      const batchData = await walletSigner.account?.encodeBatchExecute([
        {
          target: appConfig.daiAddress,
          data: dataDaiApprove,
        },
        {
          target: appConfig.sDaiAddress,
          data: dataSparkDeposit,
        },
      ]);

      if (!batchData) return;

      // Fails
      const userOp = await walletSigner.buildUserOperation({
        target: await walletSigner.getAddress(),
        data: batchData,
      });

      console.log("batchData", batchData);
      console.log("userOp", userOp);

      // send user operation
      const request = deepHexlify(userOp);
      console.log("request", request);

      request.signature = (await walletSigner.signMessage(
        getUserOperationHash(
          request,
          entryPointAddress as `0x${string}`,
          BigInt(chain.id)
        )
      )) as `0x${string}`;

      // // Request to eth_sendUserOperation fails because of invalid signature
      const resultHash = await walletSigner.rpcClient.sendUserOperation(
        request,
        entryPointAddress
      );
      console.log("resultHash", resultHash);
    } catch (e) {
    } finally {
    }
  }

  async function depositDaiToSpark() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(walletSigner, "smartAccountSigner not defined");
      invariant(walletAddress, "walletAddress not defined");
      setLoadingSparkDeposit(true);

      const appConfig = dappConfigurations[chain.id];
      const walletDaiBalance = await getErc20Balance(
        erc4337Client,
        walletAddress,
        appConfig.daiAddress
      );

      console.log("walletDaiBalance", walletDaiBalance);

      const data = encodeFunctionData({
        abi: sDaiAbi,
        functionName: "deposit",
        args: [walletDaiBalance, await walletSigner.getAddress()], // Approve whole wallet balance
      });

      const result: SendUserOperationResult =
        await walletSigner.sendUserOperation({
          target: appConfig.sDaiAddress,
          data: data,
          value: parseEther("0"),
        });

      await processUserOperationResult(
        result,
        walletSigner,
        "Spark deposit success!"
      );
      await updateWalletState();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSparkDeposit(false);
    }
  }

  async function processUserOperationResult(
    result: SendUserOperationResult,
    smartAccountSigner: SmartAccountProvider,
    successMessage = "Success!"
  ) {
    console.log("User operation result: ", result);
    console.log(
      "\nWaiting for the user operation to be included in a mined transaction..."
    );

    const txHash = await smartAccountSigner.waitForUserOperationTransaction(
      result.hash as `0x${string}`
    );

    console.log("\nTransaction hash: ", txHash);

    const userOpReceipt = await smartAccountSigner.getUserOperationReceipt(
      result.hash as `0x${string}`
    );

    console.log("\nUser operation receipt: ", userOpReceipt);

    const txReceipt =
      await smartAccountSigner.rpcClient.waitForTransactionReceipt({
        hash: txHash,
      });

    console.log("\n txReceipt: ", txReceipt);
    showTxNotification(txReceipt, successMessage);
  }

  async function approveDai() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(walletSigner, "smartAccountSigner not defined");
      setLoadingApproval(true);

      const appConfig = dappConfigurations[chain.id];
      const walletDaiBalance = await erc4337Client.readContract({
        address: appConfig.daiAddress,
        abi: daiAbi,
        functionName: "balanceOf",
        args: [await walletSigner.getAddress()], // the default AA-SDK uses 0 for the salt
      });

      console.log("walletDaiBalance", walletDaiBalance);

      const data = encodeFunctionData({
        abi: daiAbi,
        functionName: "approve",
        // args: [appConfig.sDaiAddress, walletDaiBalance], // Approve whole wallet balance
        args: [
          appConfig.sDaiAddress,
          115792089237316195423570985008687907853269984665640564039457584007913129639935n,
        ], // Approve all DAI (max unit256 value for demo purposes)
      });

      const result: SendUserOperationResult =
        await walletSigner.sendUserOperation({
          target: appConfig.daiAddress,
          data: data,
          value: parseEther("0"),
        });

      await processUserOperationResult(result, walletSigner, "DAI approved!");
      await updateWalletState();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingApproval(false);
    }
  }

  async function deployWalletByOwner() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(entryPointAddress, "entryPointAddress not defined");
      invariant(particleProvider, "particleProvider not defined");
      invariant(walletSigner, "smartAccountSigner not defined");
      invariant(particleAccountAddress, "particleAccountAddress not defined");
      setLoadingDeployment(true);

      const appConfig = dappConfigurations[chain.id];
      const smartAccountAddress = await walletSigner.getAddress();

      const data = encodeFunctionData({
        abi: simpleFactoryAbi,
        functionName: "createAccount",
        args: [particleAccountAddress, walletSalt], // User's Smart Contract Wallet Address
      });

      // Just for screenshot purposes for Discord
      // const result: SendUserOperationResult =
      //   await smartAccountSigner.sendUserOperation({
      //     target: appConfig.accountFactoryAddress,
      //     data: data,
      //     value: parseEther("0"),
      //   });

      console.log("deployWalletByOwner", {
        entryPointAddress,
        particleAccountAddress,
        smartAccountAddress,
        data,
      });

      // // ============================
      // // TODO here you can create ADMIN signer that will sign the deploy transaction
      // // TODO test if deploy passes with arbitrary signature value
      // const userOp = await smartAccountSigner.buildUserOperation({
      //   target: appConfig.accountFactoryAddress as `0x${string}`,
      //   data: data,
      //   value: parseEther("0"),
      // });
      // console.log("userOp", userOp);

      // // send user operation
      // const request = deepHexlify(userOp);
      // // if (!isValidRequest(request)) {...}

      // const adminSigner = await getAdminSigner();
      // console.log("admin address", await adminSigner.getAddress());

      // // This opens Particle Modal
      // // request.signature = (await smartAccountSigner.account.signMessage(
      // request.signature = (await adminSigner.signMessage(
      //   getUserOperationHash(
      //     request,
      //     entryPointAddress as `0x${string}`,
      //     BigInt(chain.id)
      //   )
      // )) as `0x${string}`;

      // console.log("request", request);

      // // // Request to eth_sendUserOperation fails because of invalid signature
      // const resultHash = await smartAccountSigner.rpcClient.sendUserOperation(
      //   request,
      //   entryPointAddress
      // );
      // console.log("resultHash", resultHash);

      // ============================

      const result: SendUserOperationResult =
        await walletSigner.sendUserOperation({
          target: appConfig.accountFactoryAddress,
          data: data,
        });

      await processUserOperationResult(
        result,
        walletSigner,
        "Deployment successful!"
      );
      await updateWalletState();
    } catch (error) {
    } finally {
      setLoadingDeployment(false);
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
      invariant(erc4337Client, "Client not defined");
      invariant(entryPointAddress, "entryPointAddress not defined");
      invariant(particleProvider, "particleProvider not defined");
      setLoadingLogin(true);

      const particleSigner = await getParticleSigner();
      const particleSignerAddress =
        (await particleSigner.getAddress()) as `0x${string}`;
      localStorage.setItem("user", particleSignerAddress);
      setParticleAccountAddress(particleSignerAddress);

      const walletAddress = await getWalletAddressFromContract(
        erc4337Client,
        particleSignerAddress,
        walletSalt
      );

      // check if wallet is a deployed (is a contract)
      const bytecode = await erc4337Client.getBytecode({
        address: walletAddress,
      });

      setWalletAddress(walletAddress);
      setWalletExists(bytecode !== undefined);
      await setSigners();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLogin(false);
    }
  };

  async function updateWalletBalances() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(walletAddress, "walletAddress not defined");
      setUpdatingBalances(true);

      const appConfig = dappConfigurations[chain.id];

      const walletDaiBalance = await getErc20Balance(
        erc4337Client,
        walletAddress,
        appConfig.daiAddress
      );

      const walletSDaiBalance = await getErc20Balance(
        erc4337Client,
        walletAddress,
        appConfig.sDaiAddress
      );

      // const daiAllowance = await erc4337Client.readContract({
      //   address: appConfig.daiAddress,
      //   abi: daiAbi,
      //   functionName: "allowance",
      //   args: [walletAddress, appConfig.sDaiAddress],
      // });

      console.log({ walletDaiBalance, walletSDaiBalance, daiAllowance });
      setDaiBalance(new Decimal(walletDaiBalance.toString()));
      setSDaiBalance(new Decimal(walletSDaiBalance.toString()));
      // setDaiAllowance(new Decimal(daiAllowance.toString()));
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingBalances(false);
    }
  }

  async function updateWalletDaiAllowance() {
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(walletAddress, "walletAddress not defined");
      setUpdatingAllowance(true);

      const appConfig = dappConfigurations[chain.id];

      const daiAllowance = await erc4337Client.readContract({
        address: appConfig.daiAddress,
        abi: daiAbi,
        functionName: "allowance",
        args: [walletAddress, appConfig.sDaiAddress],
      });

      console.log({ daiAllowance });
      setDaiAllowance(new Decimal(daiAllowance.toString()));
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingAllowance(false);
    }
  }

  async function getWalletAddressFromContract(
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

  async function deployWalletByDeployer() {
    // Deploys user's smart account wallet
    // The transaction is signed and paid for by deployerAccount which is sponsoring user's first transaction
    // as part of the easier onboarding process
    try {
      invariant(erc4337Client, "Client not defined");
      invariant(deployerWalletClient, "deployerWalletClient not defined");
      invariant(particleAccountAddress, "particleAccount not defined");
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
      showTxNotification(receipt, "Deployment success!");
      await updateWalletState();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDeployment(false);
    }
  }

  async function buyDai(depositAddress: `0x${string}`, amount: bigint) {
    try {
      // This function is here just for demo purposes.
      // Fiat on-ramp service like Moonpay will handle the DAI transfer
      invariant(erc4337Client, "Client not defined");
      invariant(deployerWalletClient, "deployerWalletClient not defined");
      invariant(particleAccountAddress, "particleAccount not defined");
      invariant(walletAddress, "walletAddress not defined");
      setLoadingDaiDeposit(true);

      const appConfig = dappConfigurations[chain.id];
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
      console.log("receipt", receipt);
      showTxNotification(receipt, "Deposit success!");
      await updateWalletState();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDaiDeposit(false);
    }
  }

  function showTxNotification(
    receipt: TransactionReceipt,
    successMessage: string
  ) {
    const txSuccess = receipt.status === "success";
    notifications.show({
      title: txSuccess ? successMessage : "Tx reverted",
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
          onDeployWallet={deployWalletByDeployer}
          onLogout={logout}
          walletExists={walletExists}
          px="1rem"
          pt="1rem"
        />
        <Container className={classes.content} size="md" mt="xl">
          {/* <Group gap="0.4rem">
            <Button onClick={setSigners} color="orange">
              Set signers
            </Button>
            <Button onClick={() => buyDai("0x", 1n)} color="indigo">
              DEPOSIT DAI
            </Button>
            <Button onClick={deployWalletByOwner}>DEPLOY AA</Button>
            <Button onClick={approveDai} color="violet">
              APPROVE DAI
            </Button>
            <Button onClick={depositDaiToSpark} color="blue">
              DEPOSIT TO SPARK
            </Button>
            <Button onClick={batchApproveDeposit} color="pink">
              BATCH APPROVE DEPOSIT
            </Button>
          </Group> */}
          <Stack align="center">
            <Header mt="1rem" />
            {!walletAddress || updatingBalances ? (
              <Stack align="center" mt="2.5rem">
                <Stack align="center" gap="0.25rem" mb="2rem">
                  <Text className={classes["login-description"]}>
                    Get 5% APR on DAI stablecoin with{" "}
                    <Anchor
                      className={classes["spark-link"]}
                      target="_blank"
                      href="https://spark.fi/"
                    >
                      Spark Protocol
                    </Anchor>
                    .
                  </Text>
                  <Text className={classes["login-description"]}>
                    No need to own any crypto beforehand.
                  </Text>
                </Stack>
                <Button
                  onClick={login}
                  size="xl"
                  loading={loadingLogin}
                  className={classes["login-button"]}
                >
                  <ParticleLogo size={16} mr="xs" />
                  Log in
                </Button>
              </Stack>
            ) : (
              // Code below is shown when not loading login or token balances
              walletAddress &&
              (daiBalance.eq(0) && sDaiBalance.eq(0) ? (
                <LandingPage
                  walletAddress={walletAddress}
                  onBuyDai={openOnramp}
                />
              ) : (daiBalance.gt(0) || sDaiBalance.gt(0)) &&
                walletExists &&
                daiAllowance.gt(daiBalance) &&
                sDaiBalance.gt(0) ? (
                <FundedWallet
                  mt="3rem"
                  network={chain.network}
                  daiBalance={daiBalance}
                  sDaiBalance={sDaiBalance}
                  walletAddress={walletAddress}
                  loadingSparkDeposit={loadingSparkDeposit}
                  onBuyDai={openOnramp}
                  onSparkDeposit={depositDaiToSpark}
                />
              ) : (
                <OnboardingSteps
                  network={chain.network}
                  walletAddress={walletAddress}
                  walletExists={walletExists}
                  daiAllowance={daiAllowance}
                  daiBalance={daiBalance}
                  sDaiBalance={sDaiBalance}
                  loadingDeployment={loadingDeployment}
                  loadingApproval={loadingApproval}
                  loadingSparkDeposit={loadingSparkDeposit}
                  onCreateWallet={deployWalletByOwner}
                  onApproveDai={approveDai}
                  onSparkDeposit={depositDaiToSpark}
                />
              ))
            )}
          </Stack>

          <OnrampModal
            opened={onrampOpened}
            onClose={closeOnramp}
            depositAddress={walletAddress}
            loadingDeposit={loadingDaiDeposit}
            onDeposit={buyDai}
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
