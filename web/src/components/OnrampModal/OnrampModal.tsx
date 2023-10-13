import type { ModalProps } from "@mantine/core";
import {
  Modal,
  Button,
  NumberInput,
  TextInput,
  Stack,
  Group,
  Text,
  Select,
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

import classes from "./OnrampModal.module.css";

const DEFAULT_USD_VALUE = 100;

type FiatCurrency = "eur" | "usd" | "gbp";

interface SelectData {
  value: FiatCurrency;
  label: string;
}

const currencySelectData: SelectData[] = [
  { value: "eur", label: "🇪🇺 EUR" },
  { value: "usd", label: "🇺🇸 USD" },
  { value: "gbp", label: "🇬🇧 GBP" },
];

// Random exchange rates for demo purposes
const exchangeRateData = {
  eur: 1.02,
  usd: 0.99,
  gbp: 1.09,
};

interface OnrampModalProps extends ModalProps {
  address?: `0x${string}`;
}

export function OnrampModal({ address, ...others }: OnrampModalProps) {
  const [fiatCurrency, setFiatCurrency] = useState<FiatCurrency>("usd");
  const [fiatValue, setFiatValue] = useState<string | number>(
    DEFAULT_USD_VALUE
  );
  const [daiValue, setDaiValue] = useState<string | number>(
    DEFAULT_USD_VALUE * exchangeRateData["usd"]
  );

  function handleUsdChange(usdValue: string | number) {
    setFiatValue(usdValue);
    setDaiValue((Number(usdValue) * exchangeRateData[fiatCurrency]).toFixed(2));
  }

  function handleDaiChange(daiValue: string | number) {
    setDaiValue(daiValue);
    setFiatValue(
      (Number(daiValue) * (1 / exchangeRateData[fiatCurrency])).toFixed(2)
    );
  }

  function handleCurrencyChange(currency: FiatCurrency | null) {
    if (!currency) return;
    setFiatCurrency(currency);
    setDaiValue((Number(fiatValue) * exchangeRateData[currency]).toFixed(2));
  }

  const currencySelect = (
    <Select
      size="sm"
      data={currencySelectData}
      rightSectionWidth={28}
      value={fiatCurrency}
      onChange={(value) => handleCurrencyChange(value as FiatCurrency)}
      allowDeselect={false}
      classNames={{
        input: classes["currency-select-input"],
      }}
    />
  );

  return (
    <Modal
      title={<MoonPayLogo size={110} ml="xs" />}
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 5,
      }}
      classNames={{
        root: classes["modal-root"],
        content: classes["modal-content"],
        body: classes["modal-body"],
      }}
      {...others}
    >
      <Stack mt="lg">
        <NumberInput
          value={fiatValue}
          onChange={(value) => handleUsdChange(value)}
          hideControls
          rightSectionWidth="7rem"
          rightSection={currencySelect}
          size="lg"
          fw={600}
          classNames={{ input: classes["text-input"] }}
        />
        <NumberInput
          value={daiValue}
          rightSectionWidth="6rem"
          onChange={(value) => handleDaiChange(value)}
          rightSection={
            <Group gap="0.35rem" pr="1.3rem">
              <DAILogo size={18} />
              <Text fw={500} w="2.8rem" size="1.1rem" c="black">
                DAI
              </Text>
            </Group>
          }
          size="lg"
          fw={600}
          classNames={{ input: classes["text-input"] }}
        />
        <Stack gap="0.1rem" mt="1rem">
          <Text c="dimmed" ml="md" size="sm">
            Receiving Ethereum address
          </Text>
          <TextInput
            value={address}
            size="lg"
            classNames={{
              input: [
                classes["text-input"],
                classes["text-input-address"],
              ].join(" "),
            }}
          />
        </Stack>
        <Button
          className={classes["pay-button"]}
          fullWidth
          variant="light"
          onClick={() => console.log("Deposit!")}
          size="lg"
        >
          Buy DAI
        </Button>
        <Group mx="auto" mt="md" gap="lg">
          <GPayLogo size={38} />
          <VisaLogo size={38} />
          <ApplePayLogo size={38} />
          <MastercardLogo size={30} />
        </Group>
      </Stack>
    </Modal>
  );
}
