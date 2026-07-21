import type { AnalysisResult } from "@/types/analysis";
import type { GitHubActivity } from "@/types/github";
import type { TraceRecord } from "@/types/trace";
import type { TraceInsert } from "@/lib/persistence/database.types";
import { traceRowSchema, type ValidatedTraceRow } from "@/lib/persistence/schemas";

export function toTraceInsert(activity: GitHubActivity, result: AnalysisResult, slug: string): TraceInsert {
  return {
    slug,
    repo_owner: activity.repository.owner,
    repo_name: activity.repository.name,
    repo_url: activity.repository.url,
    repo_description: activity.repository.description,
    default_branch: activity.repository.defaultBranch,
    period_days: activity.periodDays,
    period_start: activity.periodStart,
    period_end: activity.periodEnd,
    total_commits: activity.totalCommits,
    active_days: activity.activeDays,
    contributor_count: activity.contributorCount,
    stars: activity.repository.stars,
    forks: activity.repository.forks,
    last_commit_sha: activity.lastCommitSha,
    headline: result.analysis.headline,
    summary: result.analysis.summary,
    status_label: result.analysis.statusLabel,
    confidence: result.analysis.confidence,
    highlights: result.analysis.highlights,
    change_groups: result.analysis.changeGroups,
    commits: activity.commits,
    social_copy: result.analysis.socialCopy,
    raw_stats: {
      totalCommitsCapped: activity.totalCommitsCapped,
      meaningfulCommitCount: activity.meaningfulCommitCount,
      noiseCommitCount: activity.noiseCommitCount,
      generatedByFallback: result.generatedByFallback,
      ignoredCommitShas: result.analysis.ignoredCommitShas,
    },
  };
}

export function toTraceRecord(row: ValidatedTraceRow): TraceRecord {
  return {
    id: row.id,
    slug: row.slug,
    repository: {
      owner: row.repo_owner,
      repo: row.repo_name,
      name: row.repo_name,
      fullName: `${row.repo_owner}/${row.repo_name}`,
      description: row.repo_description,
      url: row.repo_url,
      defaultBranch: row.default_branch ?? "main",
      stars: row.stars,
      forks: row.forks,
    },
    periodDays: row.period_days,
    periodStart: row.period_start,
    periodEnd: row.period_end,
    totalCommits: row.total_commits,
    totalCommitsCapped: row.raw_stats.totalCommitsCapped,
    activeDays: row.active_days,
    contributorCount: row.contributor_count,
    stars: row.stars,
    forks: row.forks,
    lastCommitSha: row.last_commit_sha ?? "",
    analysis: {
      headline: row.headline,
      summary: row.summary,
      statusLabel: row.status_label,
      confidence: row.confidence ?? 0.5,
      highlights: row.highlights,
      changeGroups: row.change_groups,
      socialCopy: row.social_copy,
      ignoredCommitShas: row.raw_stats.ignoredCommitShas,
    },
    commits: row.commits,
    generatedByFallback: row.raw_stats.generatedByFallback,
    meaningfulCommitCount: row.raw_stats.meaningfulCommitCount,
    noiseCommitCount: row.raw_stats.noiseCommitCount,
    createdAt: row.created_at,
  };
}

export function validateTraceRow(value: unknown) {
  return traceRowSchema.parse(value);
}
