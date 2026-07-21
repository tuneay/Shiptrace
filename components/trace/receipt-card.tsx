import { formatMetric, formatPeriod } from "@/lib/format";
import type { TraceRecord } from "@/types/trace";

export function GeneratedReceipt({ trace }: { trace: TraceRecord }) {
  return (
    <article className="generated-receipt" data-reveal>
      <header><span>SHIPTRACE / PROOF OF PROGRESS</span><span>{trace.slug.slice(-5).toUpperCase()}</span></header>
      <div className="receipt-divider" />
      <dl>
        <div><dt>PROJECT</dt><dd>{trace.repository.name.toUpperCase()}</dd></div>
        <div><dt>PERIOD</dt><dd>{formatPeriod(trace.periodStart, trace.periodEnd)}</dd></div>
        <div><dt>COMMITS</dt><dd>{formatMetric(trace.totalCommits, trace.totalCommitsCapped)}</dd></div>
        <div><dt>ACTIVE DAYS</dt><dd>{String(trace.activeDays).padStart(2, "0")}</dd></div>
        <div><dt>CONTRIBUTORS</dt><dd>{String(trace.contributorCount).padStart(2, "0")}</dd></div>
      </dl>
      <div className="receipt-divider" />
      <div className="generated-status"><span>STATUS</span><strong>{trace.analysis.statusLabel}</strong></div>
      <div className="receipt-divider" />
      <ol>
        {trace.analysis.highlights.slice(0, 3).map((highlight, index) => (
          <li key={highlight.title}><span>{String(index + 1).padStart(2, "0")}</span><p>{highlight.title}</p></li>
        ))}
      </ol>
      <footer><span>TRACE / {trace.slug.slice(-5).toUpperCase()}</span><span>VERIFIED METADATA</span></footer>
    </article>
  );
}
