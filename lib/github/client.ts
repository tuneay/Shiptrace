import { GitHubPipelineError, mapGitHubResponseError } from "@/lib/github/errors";
import { calculateActivityStats, normalizeCommit } from "@/lib/github/normalize";
import { githubCommitListSchema, githubRepositorySchema } from "@/lib/github/schemas";
import type { GitHubActivity, PeriodDays, RepositoryRef } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";

function githubHeaders() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Shiptrace-MVP",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function githubFetch(path: string) {
  try {
    const response = await fetch(`${GITHUB_API_URL}${path}`, {
      headers: githubHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw mapGitHubResponseError(response);
    return response;
  } catch (error) {
    if (error instanceof GitHubPipelineError) throw error;
    throw new GitHubPipelineError("NETWORK_ERROR", 502, error);
  }
}

export async function fetchGitHubActivity(
  reference: RepositoryRef,
  periodDays: PeriodDays,
  now = new Date(),
): Promise<GitHubActivity> {
  const encodedOwner = encodeURIComponent(reference.owner);
  const encodedRepo = encodeURIComponent(reference.repo);
  const repositoryResponse = await githubFetch(`/repos/${encodedOwner}/${encodedRepo}`);
  const repository = githubRepositorySchema.safeParse(await repositoryResponse.json());
  if (!repository.success) throw new GitHubPipelineError("UNKNOWN_ERROR", 502, repository.error);
  if (repository.data.private) throw new GitHubPipelineError("PRIVATE_REPOSITORY", 403);

  const periodEnd = now;
  const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
  const query = new URLSearchParams({
    since: periodStart.toISOString(),
    until: periodEnd.toISOString(),
    per_page: "100",
  });
  const commitsResponse = await githubFetch(`/repos/${encodedOwner}/${encodedRepo}/commits?${query}`);
  const commitsResult = githubCommitListSchema.safeParse(await commitsResponse.json());
  if (!commitsResult.success) throw new GitHubPipelineError("UNKNOWN_ERROR", 502, commitsResult.error);

  const commits = commitsResult.data.map(normalizeCommit);
  if (commits.length === 0) throw new GitHubPipelineError("NO_COMMITS", 404);

  const stats = calculateActivityStats(commits);

  return {
    repository: {
      owner: reference.owner,
      repo: reference.repo,
      name: repository.data.name,
      fullName: repository.data.full_name,
      description: repository.data.description,
      url: repository.data.html_url,
      defaultBranch: repository.data.default_branch,
      stars: repository.data.stargazers_count,
      forks: repository.data.forks_count,
    },
    periodDays,
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
    totalCommits: commits.length,
    totalCommitsCapped: commits.length === 100,
    activeDays: stats.activeDays,
    contributorCount: stats.contributorCount,
    lastCommitSha: commits[0].sha,
    meaningfulCommitCount: stats.meaningfulCommitCount,
    noiseCommitCount: stats.noiseCommitCount,
    commits,
  };
}
