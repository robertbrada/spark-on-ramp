import { Decimal } from "decimal.js";

export function moveDecimalPointToLeft(
  value: Decimal.Value,
  scale: number
): Decimal {
  return new Decimal(value).div(Decimal.pow(10, scale));
}
