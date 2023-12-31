import type { BoxProps } from "@mantine/core";
import { Button, Group, Text, ThemeIcon } from "@mantine/core";
import { ETHLogo } from "../logos";
import { getAddressExplorerLink } from "../../utils/explorer";
import { truncate } from "../../utils/format";
import { IconExternalLink } from "@tabler/icons-react";

interface ToolbarProps extends BoxProps {
  network: string;
  eoaAddress?: string;
  walletAddress?: string;
  loadingDeploy: boolean;
  walletExists: boolean;
  onDeployWallet: () => void;
  onLogout: () => void;
}

export function Toolbar({
  network,
  eoaAddress,
  walletAddress,
  loadingDeploy,
  walletExists,
  onDeployWallet,
  onLogout,
  ...others
}: ToolbarProps) {
  return (
    <Group justify="space-between" {...others}>
      <Group gap="xs">
        <Group>
          <Group gap="xs">
            <ETHLogo size={20} />
            <Text fw={600} mt={1}>
              Goerli Testnet
            </Text>
          </Group>
        </Group>
      </Group>
      <Group>
        {/* {walletAddress && !walletExists && (
          <Button
            color="black"
            size="xs"
            variant="light"
            onClick={onDeployWallet}
            loading={loadingDeploy}
            loaderProps={{ color: "rgba(0, 0, 0, 0.4)" }}
          >
            Deploy Wallet
          </Button>
        )} */}
        {eoaAddress && (
          <>
            <Button
              component="a"
              target="_blank"
              href={getAddressExplorerLink(network, eoaAddress)}
              color="black"
              size="xs"
              variant="light"
              rightSection={<IconExternalLink stroke={2} size={14} />}
            >
              <Group gap='xs'>
                <span style={{opacity: 0.5}}>Wallet Owner:</span>
                <span> {truncate(eoaAddress)}</span>
              </Group>
            </Button>
            <Button color="black" size="xs" variant="light" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
      </Group>
    </Group>
  );
}
