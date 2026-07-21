export function formatPeriodDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value)).toUpperCase();
}

export function formatPeriod(start: string, end: string) {
  return `${formatPeriodDate(start)}—${formatPeriodDate(end)}`;
}

export function formatMetric(value: number, capped = false) {
  return `${value}${capped ? "+" : ""}`;
}
