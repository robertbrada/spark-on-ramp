import { Decimal } from "decimal.js";
import { moveDecimalPointToLeft } from "./decimal";

export function truncate(
  address: string,
  startCharsCount: number = 8,
  endChartCounts: number = 3
) {
  const start = address.slice(0, startCharsCount);
  const end = address.slice(-endChartCounts);
  return address.length > startCharsCount + endChartCounts
    ? [start, end].join("…")
    : address;
}

export const decimalFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 0,
});

export const fractionalDecimalFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 2,
});

export const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 0,
});

export const fractionalPercentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const compactFormater = Intl.NumberFormat("en-US", { notation: "compact" });

export function formatDecimal(valueParam: Decimal.Value) {
  const value = new Decimal(valueParam);
  const formatter = value.gt(100)
    ? decimalFormatter
    : fractionalDecimalFormatter;
  return typeof value === "number"
    ? formatter.format(value)
    : formatter.format(value.toNumber());
}

export function formatTokenAmount(
  value: Decimal | number,
  tokenSymbol?: string,
  shiftDecimals?: number
) {
  const shiftedValue =
    typeof shiftDecimals !== "number"
      ? value
      : moveDecimalPointToLeft(value, shiftDecimals);
  const formattedValue = formatDecimal(shiftedValue);
  return tokenSymbol ? `${formattedValue} ${tokenSymbol}` : formattedValue;
}

export function formatPercentage(value: number | bigint) {
  return percentageFormatter.format(value);
}

export function formatScore(value: number, unit?: string) {
  const formattedScore = decimalFormatter.format(value * 100);
  return unit ? [formattedScore, unit].join(" ") : formattedScore;
}

export function formatFractionalPercentage(value: number | bigint) {
  return fractionalPercentageFormatter.format(value);
}

export function formatUsd(value: number) {
  return `${usdFormatter.format(value)} USD`;
}

export function formatCompact(value: number) {
  return compactFormater.format(value);
}
