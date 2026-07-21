import { traceAnalysisSchema, type TraceAnalysis } from "@/types/analysis";
import type { GitHubActivity } from "@/types/github";

const bannedHype = /\b(?:revolutionary|game-changing|massive|incredible)\b/i;

export function sanitizeAnalysis(candidate: TraceAnalysis, activity: GitHubActivity) {
  const parsed = traceAnalysisSchema.parse(candidate);
  const allowedShas = new Set(activity.commits.flatMap((commit) => [commit.sha, commit.shortSha]));
  const headline = parsed.headline.trim().replace(/[.!]+$/, "");

  if (bannedHype.test(`${headline} ${parsed.summary}`)) {
    throw new Error("Analysis contains unsupported hype");
  }

  const highlights = parsed.highlights
    .map((highlight) => ({
      ...highlight,
      title: highlight.title.trim().replace(/[.!]+$/, ""),
      relatedCommitShas: highlight.relatedCommitShas.filter((sha) => allowedShas.has(sha)),
    }))
    .filter((highlight) => highlight.relatedCommitShas.length > 0)
    .slice(0, 5);

  const changeGroups = parsed.changeGroups
    .map((group) => ({ ...group, commitShas: group.commitShas.filter((sha) => allowedShas.has(sha)) }))
    .filter((group) => group.commitShas.length > 0)
    .slice(0, 6);

  return traceAnalysisSchema.parse({
    ...parsed,
    headline,
    highlights,
    changeGroups,
    socialCopy: { ...parsed.socialCopy, x: parsed.socialCopy.x.slice(0, 280) },
    ignoredCommitShas: parsed.ignoredCommitShas.filter((sha) => allowedShas.has(sha)),
  });
}
