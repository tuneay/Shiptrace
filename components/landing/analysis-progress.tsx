import type { CSSProperties } from "react";

type ProgressSummary = {
  repositoryName: string;
  totalCommits: number;
  activeDays: number;
};

const steps = [
  "Reading repository history",
  "Filtering maintenance noise",
  "Finding meaningful progress",
  "Writing your trace",
  "Preparing the share card",
] as const;

export function AnalysisProgress({ activeStep, summary }: { activeStep: number; summary: ProgressSummary | null }) {
  const currentStep = summary ? 2 : activeStep;
  // Fraction of the connector rail that reads as "done", from the first dot to
  // the current one. Drives a single CSS-scaled fill, so no per-step geometry.
  const railFill = currentStep / (steps.length - 1);

  return (
    <section className="analysis-progress" aria-live="polite" aria-label="Analysis progress">
      <header>
        <span>{summary?.repositoryName ?? "PUBLIC REPOSITORY"}</span>
        <span>GITHUB PIPELINE</span>
      </header>
      <ol style={{ "--rail-fill": railFill } as CSSProperties}>
        {steps.map((step, index) => {
          const isComplete = summary ? index < 2 : index < activeStep;
          const isActive = summary ? index === 2 : index === activeStep;
          return (
            <li key={step} className={isActive ? "progress-active" : isComplete ? "progress-complete" : ""}>
              <span className="progress-dot" aria-hidden="true" />
              <span>{step}</span>
            </li>
          );
        })}
      </ol>
      {summary ? (
        <p className="progress-summary">
          <strong>{summary.totalCommits}</strong> commits across <strong>{summary.activeDays}</strong> active days are ready for analysis.
        </p>
      ) : (
        <p className="progress-summary">Collecting public commit metadata. Source code stays untouched.</p>
      )}
    </section>
  );
}
