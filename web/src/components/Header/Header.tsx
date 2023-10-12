import { Stack, Title } from "@mantine/core";
import type { TitleProps } from "@mantine/core";
import classes from "./Header.module.css";

export function Header(props: TitleProps) {
  return (
    <Title className={classes.title} {...props}>
      Earn <span className={classes.highlight}>5%</span> on USD
    </Title>
  );
}
