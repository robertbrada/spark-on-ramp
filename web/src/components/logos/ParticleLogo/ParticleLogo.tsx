import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
}

export function ParticleLogo({ size = 50, ...others }: LogoProps) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (842 / 734)}
      viewBox="0 0 734 842"
      xmlSpace="preserve"
      {...others}
    >
      <circle cx="63.5" cy="156.5" r="54.5" fill="white" />
      <circle cx="157.5" cy="89.5" r="54.5" fill="white" />
      <circle cx="267.5" cy="54.5" r="54.5" fill="white" />
      <circle cx="380.5" cy="56.5" r="54.5" fill="white" />
      <circle cx="580.5" cy="164.5" r="54.5" fill="white" />
      <circle cx="489.5" cy="94.5" r="54.5" fill="white" />
      <circle cx="647.5" cy="258.5" r="54.5" fill="white" />
      <circle cx="679.5" cy="368.5" r="54.5" fill="white" />
      <circle cx="679.5" cy="484.5" r="54.5" fill="white" />
      <circle cx="641.5" cy="593.5" r="54.5" fill="white" />
      <circle cx="571.5" cy="686.5" r="54.5" fill="white" />
      <circle cx="478.5" cy="753.5" r="54.5" fill="white" />
      <circle cx="369.5" cy="787.5" r="54.5" fill="white" />
      <circle cx="254.5" cy="785.5" r="54.5" fill="white" />
      <circle cx="145.5" cy="746.5" r="54.5" fill="white" />
      <circle cx="54.5" cy="677.5" r="54.5" fill="white" />
      <circle cx="155.979" cy="252.881" r="32.5961" fill="white" />
      <circle cx="213.2" cy="210.808" r="32.5961" fill="white" />
      <circle cx="281.99" cy="187.875" r="32.5961" fill="white" />
      <circle cx="353.575" cy="187.072" r="32.5961" fill="white" />
      <circle cx="480.193" cy="251.665" r="32.5961" fill="white" />
      <circle cx="422.766" cy="209.799" r="32.5961" fill="white" />
      <circle cx="523.265" cy="310.887" r="32.5961" fill="white" />
      <circle cx="546.404" cy="379.677" r="32.5961" fill="white" />
      <circle cx="546.404" cy="452.055" r="32.5961" fill="white" />
      <circle cx="523.676" cy="522.247" r="32.5961" fill="white" />
      <circle cx="481.81" cy="580.87" r="32.5961" fill="white" />
      <circle cx="423.188" cy="623.942" r="32.5961" fill="white" />
      <circle cx="355.996" cy="647.277" r="32.5961" fill="white" />
      <circle cx="283.215" cy="646.081" r="32.5961" fill="white" />
      <circle cx="214.023" cy="624.755" r="32.5961" fill="white" />
      <circle cx="156.596" cy="581.487" r="32.5961" fill="white" />
      <circle cx="215.029" cy="325.004" r="18.0288" fill="white" />
      <circle cx="246.677" cy="301.733" r="18.0288" fill="white" />
      <circle cx="284.725" cy="289.049" r="18.0288" fill="white" />
      <circle cx="324.318" cy="288.605" r="18.0288" fill="white" />
      <circle cx="394.35" cy="324.331" r="18.0288" fill="white" />
      <circle cx="362.587" cy="301.175" r="18.0288" fill="white" />
      <circle cx="418.173" cy="357.086" r="18.0288" fill="white" />
      <circle cx="430.971" cy="395.134" r="18.0288" fill="white" />
      <circle cx="430.971" cy="435.166" r="18.0288" fill="white" />
      <circle cx="418.401" cy="473.99" r="18.0288" fill="white" />
      <circle cx="395.245" cy="506.414" r="18.0288" fill="white" />
      <circle cx="362.821" cy="530.236" r="18.0288" fill="white" />
      <circle cx="325.658" cy="543.143" r="18.0288" fill="white" />
      <circle cx="285.403" cy="542.482" r="18.0288" fill="white" />
      <circle cx="247.133" cy="530.686" r="18.0288" fill="white" />
      <circle cx="215.371" cy="506.755" r="18.0288" fill="white" />
    </Box>
  );
}
