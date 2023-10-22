import { Group, Stack, Text, Box } from "@mantine/core";
import { AlchemyLogo, MoonPayLogo, SparkLogo, ParticleLogoText } from "../logos";

export function Footer() {
  return (
    <Stack align="center" pt="1rem" pb="1.8rem">
      <Text c="white" mb="sm" size="sm" fw={500}>
        Powered by
      </Text>
      <Group gap="1.5rem">
        <SparkLogo size={65} w="6.5rem" />
        <MoonPayLogo size={80} w="6.5rem" variant="white" />
        <AlchemyLogo size={80} w="6.5rem" />
        <ParticleLogoText size={130} w="7.5rem" />
      </Group>
    </Stack>
  );
}
