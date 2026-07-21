import { NextResponse } from "next/server";

import { analyzeGitHubActivity } from "@/lib/ai/analyze";
import { fetchGitHubActivity } from "@/lib/github/client";
import { GitHubPipelineError } from "@/lib/github/errors";
import { PersistenceError } from "@/lib/persistence/errors";
import { saveTrace } from "@/lib/persistence/store";
import { consumeRateLimit } from "@/lib/rate-limit";
import { analyzeRequestSchema, parseGitHubRepository } from "@/lib/validators";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, code: "INVALID_REPOSITORY", message: "Enter a valid GitHub repository URL." },
        { status: 400 },
      );
    }

    const input = analyzeRequestSchema.safeParse(body);
    if (!input.success) {
      return NextResponse.json(
        { ok: false, code: "INVALID_REPOSITORY", message: "Enter a valid GitHub repository URL." },
        { status: 400 },
      );
    }

    const repository = parseGitHubRepository(input.data.repository);
    if (!repository) {
      return NextResponse.json(
        { ok: false, code: "INVALID_REPOSITORY", message: "Enter a valid GitHub repository URL." },
        { status: 400 },
      );
    }

    if (process.env.NODE_ENV === "production") {
      const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
      const clientIp = forwardedFor || request.headers.get("x-real-ip") || "local";
      const ipLimit = consumeRateLimit(`ip:${clientIp}`, { limit: 5, windowMs: 60 * 60 * 1000 });
      const repoLimit = consumeRateLimit(
        `repo:${repository.owner.toLowerCase()}/${repository.repo.toLowerCase()}:${input.data.periodDays}`,
        { limit: 2, windowMs: 10 * 60 * 1000 },
      );
      if (!ipLimit.allowed || !repoLimit.allowed) {
        return NextResponse.json(
          { ok: false, code: "RATE_LIMITED", message: "Too many analyses were requested. Try again in a moment." },
          { status: 429, headers: { "Retry-After": "60" } },
        );
      }
    }

    const activity = await fetchGitHubActivity(repository, input.data.periodDays);
    const analysis = await analyzeGitHubActivity(activity);
    const trace = await saveTrace(activity, analysis);
    return NextResponse.json({
      ok: true,
      slug: trace.slug,
      url: `/t/${trace.slug}`,
      data: {
        repository: { name: trace.repository.name },
        totalCommits: trace.totalCommits,
        activeDays: trace.activeDays,
      },
    });
  } catch (error) {
    if (error instanceof GitHubPipelineError) {
      return NextResponse.json(
        { ok: false, code: error.code, message: error.message },
        { status: error.status },
      );
    }

    if (error instanceof PersistenceError) {
      return NextResponse.json(
        { ok: false, code: error.code, message: "We could not save this trace. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { ok: false, code: "UNKNOWN_ERROR", message: "We could not generate this trace. Please try again." },
      { status: 500 },
    );
  }
}
