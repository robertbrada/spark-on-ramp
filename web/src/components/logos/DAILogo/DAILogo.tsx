import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
}

export function DAILogo({ size = 50, ...others }: LogoProps) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlSpace="preserve"
      {...others}
    >
      <path
        d="M25 0C38.8084 0 50 11.1939 50 25C50 38.8084 38.8084 50 25 50C11.1939 50 0 38.8073 0 25C0 11.1939 11.1939 0 25 0Z"
        fill="#F5AC37"
      />
      <path
        d="M26.4763 27.2729H35.9534C36.1554 27.2729 36.2508 27.2729 36.2654 27.0134C36.3429 26.0688 36.3429 25.1186 36.2654 24.1729C36.2654 23.9893 36.1723 23.9134 35.9691 23.9134H17.1081C16.8747 23.9134 16.8118 23.9893 16.8118 24.2037V26.9221C16.8118 27.2729 16.8118 27.2729 17.1856 27.2729H26.4763ZM35.207 20.7364C35.234 20.6671 35.234 20.5912 35.207 20.5231C35.0488 20.1854 34.8614 19.8632 34.6436 19.5608C34.3159 19.044 33.9298 18.5678 33.4899 18.14C33.2822 17.8816 33.042 17.6496 32.7727 17.4527C31.4236 16.3278 29.8198 15.5316 28.0959 15.1313C27.2261 14.94 26.3372 14.8487 25.446 14.8564H17.0756C16.8421 14.8564 16.8107 14.9477 16.8107 15.1467V20.5681C16.8107 20.7969 16.8107 20.8585 17.107 20.8585H35.0948C35.0948 20.8585 35.2508 20.8277 35.2822 20.7364H35.2059H35.207ZM35.207 30.4499C34.9422 30.4213 34.6751 30.4213 34.4102 30.4499H17.1238C16.8904 30.4499 16.8118 30.4499 16.8118 30.7556V36.0561C16.8118 36.3002 16.8118 36.3618 17.1238 36.3618H25.1048C25.4864 36.3904 25.868 36.364 26.2418 36.2859C27.4 36.2045 28.5392 35.9582 29.6256 35.5524C30.0207 35.4183 30.4023 35.2434 30.7626 35.0334H30.8714C32.7424 34.08 34.262 32.5822 35.2205 30.7435C35.2205 30.7435 35.3294 30.5126 35.207 30.4521V30.4499ZM13.6794 39.1099V39.0186V35.4601V34.2537V30.6643C13.6794 30.4653 13.6794 30.4356 13.4302 30.4356H10.0475C9.86003 30.4356 9.78259 30.4356 9.78259 30.1915V27.2894H13.3988C13.6008 27.2894 13.6794 27.2894 13.6794 27.0299V24.1586C13.6794 23.975 13.6794 23.9299 13.4302 23.9299H10.0475C9.86003 23.9299 9.78259 23.9299 9.78259 23.6857V20.9981C9.78259 20.8299 9.78259 20.7848 10.0318 20.7848H13.3831C13.6165 20.7848 13.6794 20.7848 13.6794 20.4945V12.2622C13.6794 12.0181 13.6794 11.9565 13.9914 11.9565H25.6817C26.5302 11.9895 27.3731 12.0808 28.207 12.2314C29.9253 12.5426 31.5763 13.1442 33.0858 14.003C34.0869 14.5804 35.0084 15.2776 35.8288 16.0803C36.4461 16.7082 37.0028 17.3879 37.4966 18.1114C37.9871 18.8449 38.3945 19.629 38.7144 20.4483C38.7537 20.6616 38.9624 20.8057 39.1801 20.7694H41.9703C42.3283 20.7694 42.3283 20.7694 42.344 21.1059V23.611C42.344 23.8551 42.2509 23.9167 42.0006 23.9167H39.8491C39.6313 23.9167 39.5685 23.9167 39.5842 24.1916C39.6695 25.1219 39.6695 26.0556 39.5842 26.9859C39.5842 27.2454 39.5842 27.2762 39.8816 27.2762H42.3429C42.4518 27.4137 42.3429 27.5511 42.3429 27.6897C42.3586 27.8667 42.3586 28.046 42.3429 28.223V30.0716C42.3429 30.3311 42.2655 30.4081 42.0309 30.4081H39.0847C38.8794 30.3696 38.6796 30.4983 38.6324 30.6984C37.931 32.4854 36.8086 34.0877 35.3586 35.3721C34.8288 35.8395 34.2721 36.2793 33.6908 36.6851C33.0667 37.037 32.4595 37.4032 31.8198 37.6935C30.6425 38.2126 29.4079 38.5953 28.1408 38.8383C26.9376 39.0494 25.7176 39.1451 24.4932 39.1286H13.6749V39.1132L13.6794 39.1099Z"
        fill="#FEFEFD"
      />
    </Box>
  );
}