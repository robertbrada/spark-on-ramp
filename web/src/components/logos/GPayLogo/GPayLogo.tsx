import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
  variant?: "color" | "white-text" | "white";
}

export function GPayLogo({
  size = 50,
  variant = "color",
  ...others
}: LogoProps) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (351 / 881)}
      viewBox="0 0 881 351"
      xmlSpace="preserve"
      {...others}
    >
      <path
        d="M416.418 170.698V273.082H383.391V19.8735H469.261C490.179 19.8735 509.995 27.5799 525.408 41.8917C540.82 55.1026 548.527 74.9189 548.527 95.8361C548.527 116.753 540.82 135.469 525.408 149.781C509.995 164.092 491.28 171.799 469.261 171.799L416.418 170.698ZM416.418 50.6989V138.772H471.463C483.573 138.772 495.683 134.368 503.39 125.561C521.004 109.047 521.004 81.5243 504.49 65.0107L503.39 63.9098C494.582 55.1026 483.573 49.598 471.463 50.6989H416.418Z"
        fill={variant === "color" ? "#5F6368" : "white"}
      />
      <path
        d="M624.488 94.7329C648.708 94.7329 667.424 101.338 681.736 114.549C696.047 127.76 702.653 145.375 702.653 167.393V273.08H671.827V248.86H670.727C657.516 268.676 638.8 278.584 616.782 278.584C598.067 278.584 581.553 273.08 568.342 262.071C556.232 251.062 548.526 235.649 548.526 219.135C548.526 201.521 555.131 187.209 568.342 176.2C581.553 165.191 600.269 160.787 622.287 160.787C642.103 160.787 657.516 164.09 669.626 171.796V164.09C669.626 153.081 665.222 142.072 656.415 135.466C647.608 127.76 636.598 123.356 624.488 123.356C605.773 123.356 591.461 131.063 581.553 146.476L552.93 128.861C570.544 105.742 593.663 94.7329 624.488 94.7329ZM582.654 220.236C582.654 229.044 587.058 236.75 593.663 241.154C601.369 246.658 610.177 249.961 618.984 249.961C632.195 249.961 645.406 244.456 655.314 234.548C666.323 224.64 671.827 212.53 671.827 199.319C661.919 191.613 647.608 187.209 628.892 187.209C615.681 187.209 604.672 190.512 595.865 197.117C587.058 202.622 582.654 210.328 582.654 220.236Z"
        fill={variant === "color" ? "#5F6368" : "white"}
      />
      <path
        d="M881 100.237L772.01 350.143H738.983L779.717 263.172L708.158 101.338H743.387L795.129 225.741H796.23L846.872 101.338H881V100.237Z"
        fill={variant === "color" ? "#5F6368" : "white"}
      />
      <path
        d="M285.408 148.68C285.408 138.771 284.307 128.863 283.206 118.955H145.593V175.101H223.757C220.454 192.716 210.546 209.229 195.134 219.138V255.468H242.473C269.995 230.147 285.408 192.716 285.408 148.68Z"
        // fill="#4285F4"
        fill={variant === "white" ? "white" : "#4285F4"}
      />
      <path
        d="M145.593 290.696C185.225 290.696 218.252 277.485 242.472 255.466L195.133 219.137C181.923 227.944 165.409 233.448 145.593 233.448C108.162 233.448 75.1345 208.127 64.1255 172.898H15.6855V210.329C41.0064 259.87 90.5472 290.696 145.593 290.696Z"
        // fill="#34A853"
        fill={variant === "white" ? "white" : "#34A853"}
      />
      <path
        d="M64.1278 172.898C57.5224 155.284 57.5224 135.468 64.1278 116.752V79.3213H15.6879C-5.22931 120.055 -5.22931 168.495 15.6879 210.329L64.1278 172.898Z"
        // fill="#FBBC04"
        fill={variant === "white" ? "white" : "#FBBC04"}
      />
      <path
        d="M145.594 57.3064C166.511 57.3064 186.327 65.0128 201.74 79.3245L243.574 37.4901C217.153 13.2701 181.924 -1.04168 146.695 0.0592304C91.6493 0.0592304 41.0076 30.8846 16.7876 80.4255L65.2275 117.856C75.1357 82.6273 108.163 57.3064 145.594 57.3064Z"
        // fill="#EA4335"
        fill={variant === "white" ? "white" : "#EA4335"}
      />
    </Box>
  );
}