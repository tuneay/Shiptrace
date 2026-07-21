import type { TraceAnalysis } from "@/types/analysis";
import type { NormalizedCommit, RepositoryMetadata } from "@/types/github";

export type TraceRecord = {
  id: string;
  slug: string;
  repository: RepositoryMetadata;
  periodDays: 7 | 30;
  periodStart: string;
  periodEnd: string;
  totalCommits: number;
  totalCommitsCapped: boolean;
  activeDays: number;
  contributorCount: number;
  stars: number;
  forks: number;
  lastCommitSha: string;
  analysis: TraceAnalysis;
  commits: NormalizedCommit[];
  generatedByFallback: boolean;
  meaningfulCommitCount: number;
  noiseCommitCount: number;
  createdAt: string;
};
