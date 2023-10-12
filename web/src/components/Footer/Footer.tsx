import { Group, Stack, Text } from "@mantine/core";
import { AlchemyLogo, MoonPayLogo, SparkLogo } from "../logos";

export function Footer() {
  return (
    <Stack align="center" pt="1rem" pb="1.8rem">
      <Text c="white" mb="sm" size="sm" fw={500}>
        Powered by
      </Text>
      <Group gap="2rem">
        <SparkLogo size={75} w="6.5rem" />
        <MoonPayLogo size={95} w="6.5rem" variant="white" />
        <AlchemyLogo size={95} w="6.5rem" />
      </Group>
    </Stack>
  );
}
