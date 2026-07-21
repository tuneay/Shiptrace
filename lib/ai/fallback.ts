import type { TraceAnalysis, TraceCategory } from "@/types/analysis";
import type { GitHubActivity, NormalizedCommit } from "@/types/github";

const categoryOrder: TraceCategory[] = [
  "feature", "fix", "improvement", "infrastructure", "documentation", "maintenance",
];

const categoryLabels: Record<TraceCategory, string> = {
  feature: "features",
  fix: "fixes",
  improvement: "product improvements",
  infrastructure: "infrastructure",
  documentation: "documentation",
  maintenance: "maintenance",
};

function categorizeCommit(commit: NormalizedCommit): TraceCategory {
  const message = commit.message.toLowerCase();
  if (/^feat(?:\([^)]*\))?[!:]/.test(message)) return "feature";
  if (/^fix(?:\([^)]*\))?[!:]/.test(message)) return "fix";
  if (/^(?:refactor|perf|style)(?:\([^)]*\))?[!:]/.test(message)) return "improvement";
  if (/^(?:build|ci|infra)(?:\([^)]*\))?[!:]/.test(message)) return "infrastructure";
  if (/^docs?(?:\([^)]*\))?[!:]/.test(message)) return "documentation";
  if (/^(?:chore|deps?|bump|merge)(?:\([^)]*\))?[!: ]/.test(message) || commit.isLikelyNoise) return "maintenance";
  if (/\b(?:fix|bug|error|crash)\b/.test(message)) return "fix";
  if (/\b(?:add|introduce|implement|create)\b/.test(message)) return "feature";
  return "improvement";
}

function cleanTitle(message: string) {
  const title = message
    .replace(/^(?:feat|fix|refactor|perf|style|build|ci|infra|docs?|chore|deps?)(?:\([^)]*\))?[!:]\s*/i, "")
    .replace(/^merge\s+(?:pull request|branch)\s*/i, "")
    .trim();
  return `${title.charAt(0).toUpperCase()}${title.slice(1)}`.slice(0, 90);
}

function joinCategories(categories: TraceCategory[]) {
  const labels = categories.map((category) => categoryLabels[category]);
  if (labels.length <= 1) return labels[0] ?? "maintenance";
  return `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}`;
}

export function createFallbackAnalysis(activity: GitHubActivity): TraceAnalysis {
  if (activity.commits.length === 0) {
    throw new Error("Fallback analysis requires at least one commit");
  }

  const grouped = new Map<TraceCategory, NormalizedCommit[]>();
  for (const commit of activity.commits) {
    const category = categorizeCommit(commit);
    grouped.set(category, [...(grouped.get(category) ?? []), commit]);
  }

  const meaningful = activity.commits.filter((commit) => !commit.isLikelyNoise);
  const highlightSource = (meaningful.length ? meaningful : activity.commits).slice(0, 5);
  const topCategories = categoryOrder.filter((category) => grouped.has(category)).slice(0, 3);
  const dominant = topCategories[0] ?? "maintenance";
  const hasRelease = activity.commits.some((commit) => /\b(?:release|ship|launch)(?:d|ed)?\b/i.test(commit.message));
  const statusLabel: TraceAnalysis["statusLabel"] = hasRelease
    ? "SHIPPING"
    : dominant === "feature" || dominant === "infrastructure"
      ? "BUILDING"
      : dominant === "fix" || dominant === "improvement"
        ? "REFINING"
        : "MAINTAINING";

  const headline = `${activity.repository.name} recorded ${activity.totalCommits}${activity.totalCommitsCapped ? "+" : ""} updates across ${activity.activeDays} active days`;
  const summary = `The repository showed consistent development activity during this period, with work spanning ${joinCategories(topCategories)}. This simplified summary was generated directly from commit metadata.`;
  const highlights = highlightSource.map((commit) => {
    const category = categorizeCommit(commit);
    const title = cleanTitle(commit.message) || "Repository activity recorded";
    return {
      title,
      description: `Commit metadata records this ${categoryLabels[category].replace(/s$/, "")} update during the selected period.`,
      category,
      relatedCommitShas: [commit.shortSha],
    };
  });

  const changeGroups = categoryOrder.flatMap((category) => {
    const commits = grouped.get(category);
    if (!commits?.length) return [];
    const label = categoryLabels[category];
    return [{
      category,
      title: `${label.charAt(0).toUpperCase()}${label.slice(1)} activity`,
      summary: `${commits.length} ${commits.length === 1 ? "commit was" : "commits were"} grouped as ${label} from the available metadata.`,
      commitShas: commits.map((commit) => commit.shortSha),
    }];
  });

  const socialCore = `${activity.repository.name}: ${activity.totalCommits}${activity.totalCommitsCapped ? "+" : ""} updates across ${activity.activeDays} active days, spanning ${joinCategories(topCategories)}.`;

  return {
    headline: headline.slice(0, 100),
    summary,
    statusLabel,
    confidence: meaningful.length / activity.commits.length >= 0.7 ? 0.68 : 0.52,
    highlights,
    changeGroups,
    socialCopy: {
      linkedin: `Recent progress on ${socialCore} This summary is grounded in public commit metadata.`,
      x: socialCore.slice(0, 280),
    },
    ignoredCommitShas: activity.commits.filter((commit) => commit.isLikelyNoise).map((commit) => commit.shortSha),
  };
}
