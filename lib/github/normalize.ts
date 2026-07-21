import type { GitHubCommitResponse } from "@/lib/github/schemas";
import type { NormalizedCommit } from "@/types/github";

const noisePatterns = [
  /^merge\b/i,
  /^(?:chore|style|format|lint|docs)(?:\([^)]*\))?:/i,
  /^(?:bump|deps?|dependency|lockfile|readme|typo|wip)\b/i,
  /^(?:update|regenerate)\s+(?:package-lock|yarn\.lock|pnpm-lock)/i,
];

function cleanCommitMessage(message: string) {
  return message
    .split(/\r?\n/, 1)[0]
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 220);
}

export function isLikelyNoise(message: string) {
  return noisePatterns.some((pattern) => pattern.test(message.trim()));
}

export function normalizeCommit(commit: GitHubCommitResponse): NormalizedCommit {
  const message = cleanCommitMessage(commit.commit.message) || "Untitled commit";
  const author = commit.commit.author ?? commit.commit.committer;

  return {
    sha: commit.sha,
    shortSha: commit.sha.slice(0, 7),
    message,
    date: author?.date ?? new Date(0).toISOString(),
    authorName: author?.name.trim() || null,
    url: commit.html_url,
    isLikelyNoise: isLikelyNoise(message),
  };
}

export function calculateActivityStats(commits: NormalizedCommit[]) {
  const activeDates = new Set(commits.map((commit) => commit.date.slice(0, 10)));
  const contributors = new Set(
    commits
      .map((commit) => commit.authorName?.trim().toLocaleLowerCase("en-US"))
      .filter((name): name is string => Boolean(name)),
  );
  const noiseCommitCount = commits.filter((commit) => commit.isLikelyNoise).length;

  return {
    activeDays: activeDates.size,
    contributorCount: contributors.size,
    noiseCommitCount,
    meaningfulCommitCount: commits.length - noiseCommitCount,
  };
}
