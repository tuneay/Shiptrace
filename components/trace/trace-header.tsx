import { formatPeriod } from "@/lib/format";
import type { TraceRecord } from "@/types/trace";

export function TraceHeader({ trace }: { trace: TraceRecord }) {
  return (
    <header className="trace-hero shell">
      <div className="trace-kicker-row">
        <p className="eyebrow"><span aria-hidden="true" /> PROOF OF PROGRESS</p>
        <p>{formatPeriod(trace.periodStart, trace.periodEnd)} / {trace.periodDays} DAYS</p>
      </div>
      <div className="trace-title-row">
        <div>
          <p className="trace-repo-label">{trace.repository.fullName}</p>
          <h1>{trace.repository.name}</h1>
        </div>
        <span className="status-chip">{trace.analysis.statusLabel}</span>
      </div>
      <h2>{trace.analysis.headline}</h2>
      <p className="trace-summary">{trace.analysis.summary}</p>
      {trace.generatedByFallback ? (
        <p className="fallback-note"><span aria-hidden="true">i</span> Generated with a simplified summary.</p>
      ) : null}
      <div className="trace-actions">
        <a className="button focus-ring" href="#share">Share trace <span aria-hidden="true">↓</span></a>
        <a className="secondary-button focus-ring" href={trace.repository.url} target="_blank" rel="noreferrer">
          View repository <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
