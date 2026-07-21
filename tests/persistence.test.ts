import assert from "node:assert/strict";
import test from "node:test";

import { createFallbackAnalysis } from "../lib/ai/fallback.ts";
import { toTraceInsert, validateTraceRow } from "../lib/persistence/mapping.ts";
import { clearDevelopmentTraceStore, getTraceBySlug, saveTrace } from "../lib/persistence/store.ts";
import { createTraceSlug } from "../lib/persistence/slug.ts";
import type { GitHubActivity } from "../types/github.ts";

function persistenceActivity(): GitHubActivity {
  return {
    repository: {
      owner: "acme",
      repo: "shiptrace",
      name: "shiptrace",
      fullName: "acme/shiptrace",
      description: "Proof of progress",
      url: "https://github.com/acme/shiptrace",
      defaultBranch: "main",
      stars: 12,
      forks: 3,
    },
    periodDays: 7,
    periodStart: "2026-07-14T00:00:00.000Z",
    periodEnd: "2026-07-21T00:00:00.000Z",
    totalCommits: 1,
    totalCommitsCapped: false,
    activeDays: 1,
    contributorCount: 1,
    lastCommitSha: "abcdef1234567890abcdef1234567890abcdef12",
    meaningfulCommitCount: 1,
    noiseCommitCount: 0,
    commits: [{
      sha: "abcdef1234567890abcdef1234567890abcdef12",
      shortSha: "abcdef1",
      message: "feat: persist public traces",
      date: "2026-07-20T12:00:00.000Z",
      authorName: "Ada",
      url: "https://github.com/acme/shiptrace/commit/abcdef1",
      isLikelyNoise: false,
    }],
  };
}

test("slug is readable, unique-shaped, and bounded", () => {
  const slug = createTraceSlug("A Very Long Repository Name With Spaces And Symbols !!!", "2026-07-14T00:00:00Z", "2026-07-21T00:00:00Z");
  assert.match(slug, /^a-very-long-repository-name-with-spaces-and-symbols-jul-14-21-[a-f0-9]{5}$/);
  assert.ok(slug.length <= 80);
});

test("development store saves, fetches, and deduplicates a trace", async () => {
  clearDevelopmentTraceStore();
  const activity = persistenceActivity();
  const analysis = createFallbackAnalysis(activity);
  const result = { analysis, generatedByFallback: true };

  const saved = await saveTrace(activity, result);
  const duplicate = await saveTrace(activity, result);
  const fetched = await getTraceBySlug(saved.slug);

  assert.equal(saved.slug, duplicate.slug);
  assert.equal(fetched?.analysis.headline, analysis.headline);
  assert.equal(fetched?.generatedByFallback, true);
  assert.equal(fetched?.commits[0].shortSha, "abcdef1");
});

test("development store returns null for an unknown slug", async () => {
  clearDevelopmentTraceStore();
  assert.equal(await getTraceBySlug("missing-trace"), null);
});

test("database rows accept Supabase timestamp offsets", () => {
  const activity = persistenceActivity();
  const analysis = createFallbackAnalysis(activity);
  const insert = toTraceInsert(activity, { analysis, generatedByFallback: true }, "shiptrace-jul-14-21-a8f3");

  const row = validateTraceRow({
    ...insert,
    id: "7df95866-df6c-47f4-985a-02284d86d017",
    period_start: "2026-07-14T00:00:00+00:00",
    period_end: "2026-07-21T00:00:00+00:00",
    created_at: "2026-07-21T00:29:49.770112+00:00",
  });

  assert.equal(row.created_at, "2026-07-21T00:29:49.770112+00:00");
});
