import { CopyButton } from "@/components/trace/copy-button";
import { formatPeriod } from "@/lib/format";
import type { TraceRecord } from "@/types/trace";

export function SharePanel({ trace }: { trace: TraceRecord }) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const traceUrl = `${appUrl.replace(/\/$/, "")}/t/${trace.slug}`;

  return (
    <section className="share-section" id="share">
      <div className="shell share-grid">
        <div className="share-card-preview" data-reveal aria-label="Share card preview">
          <header><span>SHIPTRACE</span><span>PROOF / {trace.slug.slice(-5).toUpperCase()}</span></header>
          <p>{trace.repository.name}</p>
          <h2>{trace.analysis.headline}</h2>
          <footer>
            <span>{trace.totalCommits}{trace.totalCommitsCapped ? "+" : ""} COMMITS</span>
            <span>{trace.activeDays} ACTIVE DAYS</span>
            <strong>{trace.analysis.statusLabel}</strong>
          </footer>
        </div>
        <div className="share-tools" data-reveal>
          <p className="eyebrow"><span aria-hidden="true" /> SHARE THIS TRACE</p>
          <h2>Make the progress visible.</h2>
          <p>Share the public proof, or use the ready-made update in your next build-in-public post.</p>
          <div className="copy-actions">
            <CopyButton label="Copy trace link" value={traceUrl} />
            <CopyButton label="Copy LinkedIn post" value={trace.analysis.socialCopy.linkedin} />
            <CopyButton label="Copy X post" value={trace.analysis.socialCopy.x} />
            <a className="copy-button" href={`/api/og/${trace.slug}`} target="_blank" rel="noreferrer">
              <span>Open share card</span><span className="copy-icon" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="share-context"><span>{formatPeriod(trace.periodStart, trace.periodEnd)}</span><span>{trace.repository.fullName}</span></div>
        </div>
      </div>
    </section>
  );
}
