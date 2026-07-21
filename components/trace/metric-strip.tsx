import { formatMetric } from "@/lib/format";
import type { TraceRecord } from "@/types/trace";

export function MetricStrip({ trace }: { trace: TraceRecord }) {
  const metrics = [
    [formatMetric(trace.totalCommits, trace.totalCommitsCapped), "COMMITS"],
    [String(trace.activeDays).padStart(2, "0"), "ACTIVE DAYS"],
    [String(trace.contributorCount).padStart(2, "0"), "CONTRIBUTORS"],
    [`${Math.round(trace.analysis.confidence * 100)}%`, "CONFIDENCE"],
  ] as const;

  return (
    <section className="metric-strip shell" aria-label="Trace metrics">
      {metrics.map(([value, label]) => (
        <div key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>
      ))}
    </section>
  );
}
