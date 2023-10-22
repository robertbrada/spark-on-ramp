import type { StackProps } from "@mantine/core";
import {
  Modal,
  Button,
  NumberInput,
  TextInput,
  Stack,
  Group,
  Text,
  Select,
  ActionIcon,
  CopyButton,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import {
  MoonPayLogo,
  DAILogo,
  VisaLogo,
  GPayLogo,
  ApplePayLogo,
  MastercardLogo,
} from "../logos";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons-react";

import classes from "./LandingPage.module.css";

interface LandingPageProps extends StackProps {
  walletAddress: string;
  onBuyDai: () => void;
}

export function LandingPage({
  walletAddress,
  onBuyDai,
  ...others
}: LandingPageProps) {
  return (
    <Stack mt="2rem" gap="0rem" align="center">
      <Text className={classes["wallet-address-title"]}>
        Your wallet address:
      </Text>
      <Text className={classes["wallet-address-desc"]}>
        First, deposit DAI to this address. Then we'll create your wallet.
      </Text>
      <Group className={classes["wallet-address-wrapper"]} gap="xs" mt="1.5rem">
        <Text className={classes["wallet-address"]}>{walletAddress}</Text>
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
                  <IconCopy size="1.3rem" stroke={2.5} color="white" />
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
        onClick={onBuyDai}
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
  );
}
