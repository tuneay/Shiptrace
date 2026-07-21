export type PeriodDays = 7 | 30;

export type RepositoryRef = {
  owner: string;
  repo: string;
};

export type RepositoryMetadata = RepositoryRef & {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  defaultBranch: string;
  stars: number;
  forks: number;
};

export type NormalizedCommit = {
  sha: string;
  shortSha: string;
  message: string;
  date: string;
  authorName: string | null;
  url: string;
  isLikelyNoise: boolean;
};

export type GitHubActivity = {
  repository: RepositoryMetadata;
  periodDays: PeriodDays;
  periodStart: string;
  periodEnd: string;
  totalCommits: number;
  totalCommitsCapped: boolean;
  activeDays: number;
  contributorCount: number;
  lastCommitSha: string;
  meaningfulCommitCount: number;
  noiseCommitCount: number;
  commits: NormalizedCommit[];
};
