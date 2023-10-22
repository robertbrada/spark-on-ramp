import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
  variant?: "color" | "white";
}

export function SparkLogoOnly({
  size = 50,
  variant = "color",
  ...others
}: LogoProps) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (72 / 58)}
      viewBox="0 0 58 72"
      xmlSpace="preserve"
      {...others}
    >
      <path
        d="M24.6636 71.1934L0.159244 42.8671C-0.301059 42.3378 0.321704 41.5665 0.944467 41.9073L17.4251 50.7963C18.2013 51.2179 18.806 51.8996 19.1129 52.7248L25.7467 70.5745C25.9814 71.2203 25.1239 71.7316 24.6636 71.1934Z"
        fill={variant === "color" ? "url(#paint0_linear_215_660)" : "white"}
      />
      <path
        d="M28.2026 64.6809L21.4424 31.4661C21.3432 30.9727 21.4424 30.4525 21.7132 30.0309L33.5096 11.6789C33.7443 11.3111 34.3219 11.5085 34.2768 11.948L29.0239 64.645C28.9878 65.1204 28.3019 65.1473 28.2026 64.6809Z"
        fill={variant === "color" ? "url(#paint1_linear_215_660)" : "white"}
      />
      <path
        d="M34.0584 54.895L47.0281 36.1393C47.4704 35.5025 48.2466 35.1706 49.0228 35.2872L57.3173 36.534C57.8498 36.6147 58.0303 37.2875 57.6061 37.6193L34.7082 55.505C34.3021 55.8189 33.7696 55.3256 34.0584 54.895Z"
        fill={variant === "color" ? "url(#paint2_linear_215_660)" : "white"}
      />
      <path
        d="M35.9997 42.0415L42.6335 0.359181C42.7057 -0.071365 43.3014 -0.125183 43.4458 0.287423L49.3305 17.3119C49.502 17.8232 49.4659 18.3793 49.2132 18.8547L36.785 42.3015C36.5593 42.7141 35.9185 42.5079 35.9997 42.0415Z"
        fill={variant === "color" ? "url(#paint3_linear_215_660))" : "white"}
      />
      <path
        d="M7.56076 33.8158L9.04096 23.3481C9.10413 22.9176 9.69982 22.8369 9.87131 23.2405L19.0232 44.4449C19.2037 44.8755 18.6712 45.2522 18.3283 44.9293L8.11132 35.3855C7.68712 34.9819 7.47051 34.3899 7.56076 33.8158Z"
        fill={variant === "color" ? "url(#paint4_linear_215_660)" : "white"}
      />
      <defs>
        <linearGradient
          id="paint0_linear_215_660"
          x1="-5.14842"
          y1="0.0689298"
          x2="18.0871"
          y2="73.8173"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F78E1E" />
          <stop offset="1" stopColor="#F2A529" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_215_660"
          x1="26.141"
          y1="-5.37909"
          x2="30.763"
          y2="68.3396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F78E1E" />
          <stop offset="1" stopColor="#F2A529" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_215_660"
          x1="41.1944"
          y1="8.21591"
          x2="47.4842"
          y2="59.4635"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F78E1E" />
          <stop offset="1" stopColor="#F2A529" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_215_660"
          x1="39.5929"
          y1="-1.84102"
          x2="46.6457"
          y2="71.0597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F78E1E" />
          <stop offset="1" stopColor="#F2A529" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_215_660"
          x1="0.554135"
          y1="11.8589"
          x2="28.9469"
          y2="71.7836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F78E1E" />
          <stop offset="1" stopColor="#F2A529" />
        </linearGradient>
      </defs>
    </Box>
  );
}
