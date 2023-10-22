import type { StackProps } from "@mantine/core";

import { Button, Group, Stack, Table, Text } from "@mantine/core";
import { IconExternalLink, IconTrendingUp } from "@tabler/icons-react";
import Decimal from "decimal.js";
import { moveDecimalPointToLeft } from "../../utils/decimal";
import { getAddressExplorerLink } from "../../utils/explorer";
import * as f from "../../utils/format";
import { DAILogo, SavingsDAILogo } from "../logos";

import classes from "./FundedWallet.module.css";

interface FundedWalletProps extends StackProps {
  network: string;
  walletAddress: string;
  daiBalance: Decimal;
  sDaiBalance: Decimal;
  loadingSparkDeposit: boolean;
  onSparkDeposit: () => void;
  onBuyDai: () => void;
  // onWithdrawFromSpark: () => void; // TODO
}

export function FundedWallet({
  network,
  walletAddress,
  daiBalance,
  sDaiBalance,
  loadingSparkDeposit,
  onSparkDeposit,
  onBuyDai,
  ...others
}: FundedWalletProps) {
  const hasDai = daiBalance.gt(0);

  // heads
  const ths = (
    <Table.Tr>
      {/* <Table.Th className={classes["th-logo"]} /> */}
      <Table.Th className={classes["th-amount"]} />
      <Table.Th className={classes["th-symbol"]} />
      <Table.Th />
      {hasDai && <Table.Th />}
    </Table.Tr>
  );

  const rows = [
    <Table.Tr>
      {/* <Table.Td className={classes["logo-td"]}>
        <SavingsDAILogo size={26}  mt="0.4rem" />
      </Table.Td> */}
      <Table.Td>
        <Text className={classes["token-amount"]}>
          {f.formatTokenAmount(moveDecimalPointToLeft(sDaiBalance, 18))}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="0.5rem">
          <SavingsDAILogo size={24} />
          <Text className={classes["token-symbol"]}>sDAI</Text>
        </Group>
      </Table.Td>
      <Table.Td colSpan={hasDai ? 2 : 1}>
        <Button
          color="black"
          className={classes["button"]}
          fullWidth
          onClick={() => alert("Not implemented yet")}
        >
          Withdraw
        </Button>
      </Table.Td>
    </Table.Tr>,
    // ---- ANOTHER ROW -----
    <Table.Tr>
      {/* <Table.Td className={classes["logo-td"]}>
        <DAILogo size={26} variant="dark" mt="0.4rem" />
      </Table.Td> */}
      <Table.Td>
        <Text className={classes["token-amount"]}>
          {f.formatTokenAmount(moveDecimalPointToLeft(daiBalance, 18))}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="0.5rem">
          <DAILogo variant="dark" size={24} />
          <Text className={classes["token-symbol"]}>DAI</Text>
        </Group>
      </Table.Td>
      {hasDai && (
        <Table.Td>
          <Button
            color="black"
            variant="light"
            className={classes["button"]}
            fullWidth
            rightSection={<IconTrendingUp size="0.9rem" stroke={2.5} />}
            onClick={onSparkDeposit}
            loading={loadingSparkDeposit}
          >
            Earn
          </Button>{" "}
        </Table.Td>
      )}
      <Table.Td>
        <Button
          color="yellow"
          className={classes["button"]}
          fullWidth
          onClick={onBuyDai}
        >
          Buy DAI
        </Button>
      </Table.Td>
    </Table.Tr>,
  ];

  return (
    <Stack {...others} align="center" gap={0} className={classes["root"]}>
      <Text className={classes["title"]} mb="1rem">
        Your wallet
      </Text>

      <Table
        captionSide="bottom"
        withColumnBorders={false}
        withRowBorders={false}
        classNames={{ table: classes["table"], td: classes["table-td"] }}
      >
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

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
  );
}
