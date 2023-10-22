import type { StackProps } from "@mantine/core";
import { Button, Group, Stack, Text } from "@mantine/core";
import { IconExternalLink, IconTrendingUp } from "@tabler/icons-react";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { moveDecimalPointToLeft } from "../../utils/decimal";
import { getAddressExplorerLink } from "../../utils/explorer";
import * as f from "../../utils/format";
import classes from "./OnboardingSteps.module.css";

function getCurrentStep(
  walletExists: boolean,
  daiApproved: boolean,
  sDaiBalance: Decimal
) {
  if (!walletExists) return 1;
  if (!daiApproved) return 2;
  return 3;
}

interface OnboardingStepsProps extends StackProps {
  network: string;
  walletAddress: string;
  walletExists: boolean;
  daiAllowance: Decimal;
  daiBalance: Decimal;
  sDaiBalance: Decimal;
  loadingDeployment: boolean;
  loadingApproval: boolean;
  loadingSparkDeposit: boolean;
  onCreateWallet: () => void;
  onApproveDai: () => void;
  onSparkDeposit: () => void;
}

export function OnboardingSteps({
  network,
  walletAddress,
  walletExists,
  daiAllowance,
  daiBalance,
  sDaiBalance,
  loadingDeployment,
  loadingApproval,
  loadingSparkDeposit,
  onCreateWallet,
  onApproveDai,
  onSparkDeposit,
  ...others
}: OnboardingStepsProps) {
  const [currentStep, setCurrentStep] = useState(
    getCurrentStep(walletExists, daiAllowance.gt(daiBalance), sDaiBalance)
  );

  useEffect(() => {
    setCurrentStep(
      getCurrentStep(walletExists, daiAllowance.gt(daiBalance), sDaiBalance)
    );
  }, [daiAllowance, daiBalance, sDaiBalance, walletExists]);

  return (
    <Stack mt="lg" align="center">
      <Group gap="md" mb="1rem" mt="1.5rem" className={classes["header"]}>
        <Text
          className={[classes["highlighted"], classes["step-header"]].join(" ")}
        >
          1. Create Wallet
        </Text>
        <Text className={classes["step-arrow"]}>{">"}</Text>
        <Text
          className={
            currentStep >= 2
              ? [classes["highlighted"], classes["step-header"]].join(" ")
              : classes["step-header"]
          }
        >
          2. Approve DAI
        </Text>
        <Text className={classes["step-arrow"]}>{">"}</Text>
        <Text
          className={
            currentStep === 3
              ? [classes["highlighted"], classes["step-header"]].join(" ")
              : classes["step-header"]
          }
        >
          3. Deposit to Spark
        </Text>
      </Group>

      {currentStep === 1 && (
        <>
          <Text className={classes["description"]}>
            Wallet address holds{" "}
            <span>
              {f.formatTokenAmount(
                moveDecimalPointToLeft(daiBalance, 18),
                "DAI"
              )}
            </span>
            . Wallet is ready for deploy!
          </Text>
          <Button
            onClick={onCreateWallet}
            className={classes["button"]}
            size="xl"
            loading={loadingDeployment}
            loaderProps={{ color: "rgba(256, 256, 256, 0.8)" }}
          >
            Deploy Wallet
          </Button>
        </>
      )}
      {currentStep === 2 && (
        <>
          <Text className={classes["description"]}>
            Allow Spark Protocol to use your DAI.
          </Text>
          <Button
            onClick={onApproveDai}
            className={classes["button"]}
            size="xl"
            loading={loadingApproval}
            loaderProps={{ color: "rgba(256, 256, 256, 0.8)" }}
          >
            Approve DAI
          </Button>
        </>
      )}
      {currentStep === 3 && (
        <>
          <Text className={classes["description"]}>
            Ready to grow your DAI!
          </Text>
          <Button
            onClick={onSparkDeposit}
            className={classes["button"]}
            size="xl"
            loading={loadingSparkDeposit}
            loaderProps={{ color: "rgba(256, 256, 256, 0.8)" }}
            rightSection={
              <IconTrendingUp size="1.5rem" color="white" stroke={2.2} />
            }
          >
            Deposit to Spark
          </Button>
        </>
      )}
      <Stack align="center" gap="0.5rem">
        <Text className={classes["wallet-title"]}>Your wallet</Text>
        <Text
          className={classes["wallet-address"]}
          component="a"
          href={getAddressExplorerLink(network, walletAddress)}
          target="_blank"
        >
          {walletAddress}{" "}
          <IconExternalLink
            size="0.9rem"
            stroke={2.4}
            color="#543405"
            opacity={0.5}
            style={{ marginLeft: "0.25rem", marginTop: "0.2rem" }}
          />
        </Text>
      </Stack>
    </Stack>
  );
}
