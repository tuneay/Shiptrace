"use client";

import { CSSProperties, FormEvent, useEffect, useState } from "react";
import { z } from "zod";

import { AnalysisProgress } from "@/components/landing/analysis-progress";

type Period = 7 | 30;

const analyzeResponseSchema = z.discriminatedUnion("ok", [
  z.object({
    ok: z.literal(true),
    slug: z.string(),
    url: z.string(),
    data: z.object({
      repository: z.object({ name: z.string() }),
      totalCommits: z.number().int().nonnegative(),
      activeDays: z.number().int().nonnegative(),
    }),
  }),
  z.object({
    ok: z.literal(false),
    code: z.string(),
    message: z.string(),
  }),
]);

type ProgressSummary = {
  repositoryName: string;
  totalCommits: number;
  activeDays: number;
};

function hasRepositoryShape(value: string) {
  const normalized = value.trim().replace(/^https?:\/\//, "").replace(/^(?:www\.)?github\.com\//, "");
  const parts = normalized.split("/").filter(Boolean);
  return parts.length === 2 && parts.every((part) => /^[a-zA-Z0-9_.-]+$/.test(part));
}

export function TraceForm() {
  const [repository, setRepository] = useState("");
  const [period, setPeriod] = useState<Period>(7);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [summary, setSummary] = useState<ProgressSummary | null>(null);

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setInterval(() => setActiveStep((step) => Math.min(step + 1, 4)), 850);
    return () => window.clearInterval(timer);
  }, [isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasRepositoryShape(repository)) {
      setError("Enter a valid GitHub repository URL.");
      setErrorCode("INVALID_REPOSITORY");
      return;
    }

    setError("");
    setErrorCode("");
    setSummary(null);
    setActiveStep(0);
    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repository, periodDays: period }),
      });
      const result = analyzeResponseSchema.safeParse(await response.json());

      if (!result.success) throw new Error("Invalid API response");
      if (!result.data.ok) {
        setError(result.data.message);
        setErrorCode(result.data.code);
        return;
      }

      setActiveStep(2);
      setSummary({
        repositoryName: result.data.data.repository.name,
        totalCommits: result.data.data.totalCommits,
        activeDays: result.data.data.activeDays,
      });
      window.location.assign(result.data.url);
    } catch {
      setError("We could not generate this trace. Your repository was not changed. Please try again.");
      setErrorCode("UNKNOWN_ERROR");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className="trace-form" onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor="repository">Public GitHub repository</label>
        <div className={`repo-field ${error ? "repo-field-error" : ""}`}>
          <span className="repo-mark" aria-hidden="true">GH</span>
          <input
            id="repository"
            name="repository"
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={repository}
            aria-invalid={Boolean(error)}
            aria-describedby="repository-hint repository-error"
            placeholder="github.com/owner/repository"
            onChange={(event) => {
              setRepository(event.target.value);
              if (error) setError("");
              if (summary) setSummary(null);
            }}
          />
        </div>

        <div className="form-actions">
          <fieldset
            className="period-selector"
            aria-label="Analysis period"
            style={{ "--thumb-x": period === 30 ? "100%" : "0%" } as CSSProperties}
          >
            <legend className="sr-only">Analysis period</legend>
            {([7, 30] as const).map((days) => (
              <button
                className={period === days ? "period-active" : ""}
                type="button"
                key={days}
                aria-pressed={period === days}
                disabled={isLoading}
                onClick={() => setPeriod(days)}
              >
                {days} DAYS
              </button>
            ))}
          </fieldset>
          <button className="button generate-button focus-ring" type="submit" disabled={!repository.trim() || isLoading}>
            <span>{isLoading ? "Reading GitHub activity" : "Generate your trace"}</span>
            <span className={isLoading ? "loading-dot" : ""} aria-hidden="true">{isLoading ? "●" : "↗"}</span>
          </button>
        </div>

        <div className="form-meta" aria-live="polite">
          <p id="repository-hint"><span className="secure-dot" aria-hidden="true" /> Public repositories only. No source code is downloaded.</p>
          <p className="form-error" id="repository-error">{error}</p>
        </div>

        {errorCode === "NO_COMMITS" && period === 7 ? (
          <button className="retry-period" type="button" onClick={() => { setPeriod(30); setError(""); setErrorCode(""); }}>
            Try the last 30 days →
          </button>
        ) : null}
      </form>

      {isLoading || summary ? <AnalysisProgress activeStep={activeStep} summary={summary} /> : null}
    </>
  );
}
