import { z } from "zod";

import { traceAnalysisSchema } from "@/types/analysis";

const normalizedCommitSchema = z.object({
  sha: z.string(),
  shortSha: z.string(),
  message: z.string(),
  date: z.iso.datetime(),
  authorName: z.string().nullable(),
  url: z.url(),
  isLikelyNoise: z.boolean(),
});

export const traceRowSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  repo_owner: z.string(),
  repo_name: z.string(),
  repo_url: z.url(),
  repo_description: z.string().nullable(),
  default_branch: z.string().nullable(),
  period_days: z.union([z.literal(7), z.literal(30)]),
  period_start: z.iso.datetime({ offset: true }),
  period_end: z.iso.datetime({ offset: true }),
  total_commits: z.number().int().nonnegative(),
  active_days: z.number().int().nonnegative(),
  contributor_count: z.number().int().nonnegative(),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  last_commit_sha: z.string().nullable(),
  headline: z.string(),
  summary: z.string(),
  status_label: traceAnalysisSchema.shape.statusLabel,
  confidence: z.number().min(0).max(1).nullable(),
  highlights: traceAnalysisSchema.shape.highlights,
  change_groups: traceAnalysisSchema.shape.changeGroups,
  commits: z.array(normalizedCommitSchema),
  social_copy: traceAnalysisSchema.shape.socialCopy,
  raw_stats: z.object({
    totalCommitsCapped: z.boolean(),
    meaningfulCommitCount: z.number().int().nonnegative(),
    noiseCommitCount: z.number().int().nonnegative(),
    generatedByFallback: z.boolean(),
    ignoredCommitShas: z.array(z.string()),
  }),
  created_at: z.iso.datetime({ offset: true }),
});

export type ValidatedTraceRow = z.infer<typeof traceRowSchema>;
