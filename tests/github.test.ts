import assert from "node:assert/strict";
import test from "node:test";

import { calculateActivityStats, isLikelyNoise, normalizeCommit } from "../lib/github/normalize.ts";
import { parseGitHubRepository } from "../lib/validators.ts";

test("parses every supported repository format", () => {
  assert.deepEqual(parseGitHubRepository("https://github.com/openai/openai-node"), { owner: "openai", repo: "openai-node" });
  assert.deepEqual(parseGitHubRepository("github.com/vercel/next.js"), { owner: "vercel", repo: "next.js" });
  assert.deepEqual(parseGitHubRepository("facebook/react"), { owner: "facebook", repo: "react" });
});

test("rejects non-GitHub and nested repository paths", () => {
  assert.equal(parseGitHubRepository("https://example.com/openai/openai-node"), null);
  assert.equal(parseGitHubRepository("github.com/openai/openai-node/issues"), null);
  assert.equal(parseGitHubRepository("missing-slash"), null);
});

test("marks maintenance noise without deleting it", () => {
  assert.equal(isLikelyNoise("chore(deps): bump zod"), true);
  assert.equal(isLikelyNoise("Merge pull request #42"), true);
  assert.equal(isLikelyNoise("feat: add trace cards"), false);
});

test("normalizes commit titles and calculates activity stats", () => {
  const first = normalizeCommit({
    sha: "1234567890abcdef",
    html_url: "https://github.com/acme/product/commit/1234567890abcdef",
    commit: { message: "feat: add trace cards\n\nlong body", author: { name: "Ada", date: "2026-07-20T10:00:00Z" }, committer: null },
  });
  const second = { ...first, sha: "abcdef1234567890", shortSha: "abcdef1", date: "2026-07-21T10:00:00Z", authorName: "ada", message: "chore: format", isLikelyNoise: true };

  assert.equal(first.message, "feat: add trace cards");
  assert.deepEqual(calculateActivityStats([first, second]), {
    activeDays: 2,
    contributorCount: 1,
    noiseCommitCount: 1,
    meaningfulCommitCount: 1,
  });
});
