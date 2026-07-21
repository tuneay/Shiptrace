import type { TraceRecord } from "@/types/trace";

export function Highlights({ trace }: { trace: TraceRecord }) {
  return (
    <section className="highlights-panel" aria-labelledby="highlights-title">
      <div className="trace-section-label"><span id="highlights-title">HIGHLIGHTS</span><span>{String(trace.analysis.highlights.length).padStart(2, "0")}</span></div>
      <ol>
        {trace.analysis.highlights.map((highlight, index) => (
          <li key={`${highlight.title}-${index}`} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="highlight-category">{highlight.category}</p>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
