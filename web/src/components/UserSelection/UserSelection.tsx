import type { BoxProps } from "@mantine/core";
import { SegmentedControl } from "@mantine/core";

export type SegmentValue = "new" | "existing";

interface UserSelectionProps extends BoxProps {
  value: SegmentValue;
  onChange: (value: SegmentValue) => void;
}

export function UserSelection({
  value,
  onChange,
  ...others
}: UserSelectionProps) {
  return (
    <SegmentedControl
      mt="3rem"
      mb="2rem"
      color="yellow"
      radius="md"
      size="md"
      value={value}
      onChange={(value: SegmentValue) => onChange(value)}
      data={[
        { label: "New user", value: "new" },
        { label: "Existing user", value: "existing" },
      ]}
      {...others}
    />
  );
}
