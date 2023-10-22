import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
}

export function SavingsDAILogo({ size = 50, ...others }: LogoProps) {
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
        d="M50 0C77.6168 0 100 22.3877 100 50C100 77.6168 77.6168 100 50 100C22.3877 100 0 77.6145 0 50C0 22.3877 22.3877 0 50 0Z"
        fill="#0FC959"
      />
      <path
        d="M51.8418 53.5297H70.841C71.246 53.5297 71.4373 53.5297 71.4665 52.9987C71.6218 51.0659 71.6218 49.1219 71.4665 47.1869C71.4665 46.8112 71.2798 46.6559 70.8725 46.6559H33.0609C32.5929 46.6559 32.4669 46.8112 32.4669 47.2499V52.812C32.4669 53.5297 32.4669 53.5297 33.2162 53.5297H51.8418ZM69.3448 40.1556C69.3988 40.0138 69.3988 39.8586 69.3448 39.7191C69.0275 39.0283 68.6518 38.3691 68.2152 37.7503C67.5582 36.6928 66.7842 35.7185 65.9022 34.8433C65.486 34.3145 65.0045 33.8398 64.4645 33.437C61.7599 31.1352 58.5447 29.5062 55.0886 28.6872C53.3449 28.2957 51.5628 28.109 49.7763 28.1247H32.9956C32.5276 28.1247 32.4646 28.3115 32.4646 28.7187V39.8113C32.4646 40.2793 32.4646 40.4053 33.0586 40.4053H69.1198C69.1198 40.4053 69.4325 40.3423 69.4955 40.1556H69.3425H69.3448ZM69.3448 60.03C68.8138 59.9715 68.2783 59.9715 67.7472 60.03H33.0924C32.6244 60.03 32.4669 60.03 32.4669 60.6555V71.5006C32.4669 72.0002 32.4669 72.1262 33.0924 72.1262H49.0923C49.8573 72.1847 50.6223 72.1307 51.3716 71.9709C53.6936 71.8044 55.9774 71.3004 58.1554 70.4701C58.9474 70.1956 59.7124 69.8379 60.4347 69.4081H60.6529C64.4037 67.4574 67.4502 64.3928 69.3718 60.6308C69.3718 60.6308 69.59 60.1583 69.3448 60.0345V60.03ZM26.1871 77.749V77.5622V70.2811V67.8129V60.4688C26.1871 60.0615 26.1871 60.0008 25.6876 60.0008H18.906C18.5303 60.0008 18.375 60.0008 18.375 59.5013V53.5635H25.6246C26.0296 53.5635 26.1871 53.5635 26.1871 53.0325V47.1577C26.1871 46.7819 26.1871 46.6897 25.6876 46.6897H18.906C18.5303 46.6897 18.375 46.6897 18.375 46.1901V40.6911C18.375 40.3468 18.375 40.2546 18.8745 40.2546H25.5931C26.0611 40.2546 26.1871 40.2546 26.1871 39.6606V22.8169C26.1871 22.3174 26.1871 22.1914 26.8126 22.1914H50.2488C51.9498 22.2589 53.6396 22.4457 55.3114 22.7539C58.7562 23.3907 62.0659 24.6214 65.0922 26.3787C67.0992 27.56 68.9465 28.9865 70.5913 30.629C71.8288 31.9138 72.9448 33.3043 73.9348 34.7848C74.9181 36.2855 75.7348 37.8898 76.3761 39.5661C76.4548 40.0026 76.8733 40.2973 77.3098 40.2231H82.9034C83.6212 40.2231 83.6212 40.2231 83.6527 40.9116V46.0371C83.6527 46.5367 83.4659 46.6627 82.9641 46.6627H78.6509C78.2144 46.6627 78.0884 46.6627 78.1199 47.2252C78.2909 49.1287 78.2909 51.0389 78.1199 52.9425C78.1199 53.4735 78.1198 53.5365 78.7161 53.5365H83.6504C83.8687 53.8177 83.6504 54.099 83.6504 54.3825C83.6819 54.7447 83.6819 55.1115 83.6504 55.4737V59.256C83.6504 59.787 83.4952 59.9445 83.0249 59.9445H77.1186C76.7068 59.8658 76.3063 60.129 76.2118 60.5385C74.8056 64.1948 72.5555 67.4731 69.6485 70.1011C68.5865 71.0574 67.4705 71.9574 66.305 72.7877C65.054 73.5077 63.8367 74.2569 62.5542 74.8509C60.1939 75.9129 57.7189 76.6959 55.1786 77.1932C52.7666 77.6252 50.3208 77.821 47.866 77.7872H26.1781V77.7557L26.1871 77.749Z"
        fill="#FEFEFD"
      />
    </Box>
  );
}
