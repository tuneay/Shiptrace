import assert from "node:assert/strict";
import test from "node:test";

import { clearRateLimits, consumeRateLimit } from "../lib/rate-limit.ts";

test("rate limit allows the configured count and blocks the next request", () => {
  clearRateLimits();
  const options = { limit: 2, windowMs: 1_000, now: 10_000 };
  assert.equal(consumeRateLimit("ip:test", options).allowed, true);
  assert.equal(consumeRateLimit("ip:test", options).allowed, true);
  assert.equal(consumeRateLimit("ip:test", options).allowed, false);
});

test("rate limit window expires", () => {
  clearRateLimits();
  assert.equal(consumeRateLimit("repo:test", { limit: 1, windowMs: 1_000, now: 1_000 }).allowed, true);
  assert.equal(consumeRateLimit("repo:test", { limit: 1, windowMs: 1_000, now: 2_001 }).allowed, true);
});
