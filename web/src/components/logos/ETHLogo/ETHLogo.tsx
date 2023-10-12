import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
}

export function ETHLogo({ size = 50, ...others }: LogoProps) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlSpace="preserve"
      {...others}
    >
      <path
        d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
        fill="#627EEA"
      />
      <path
        d="M51.5562 12.5V40.2187L74.9843 50.6875L51.5562 12.5Z"
        fill="white"
        fillOpacity="0.602"
      />
      <path
        d="M51.5562 12.5L28.125 50.6875L51.5562 40.2187V12.5Z"
        fill="white"
      />
      <path
        d="M51.5562 68.6527V87.4871L74.9999 55.0527L51.5562 68.6527Z"
        fill="white"
        fillOpacity="0.602"
      />
      <path
        d="M51.5562 87.4871V68.6496L28.125 55.0527L51.5562 87.4871Z"
        fill="white"
      />
      <path
        d="M51.5562 64.2893L74.9843 50.6861L51.5562 40.2236V64.2893Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path
        d="M28.125 50.6861L51.5562 64.2893V40.2236L28.125 50.6861Z"
        fill="white"
        fillOpacity="0.602"
      />
    </Box>
  );
}
