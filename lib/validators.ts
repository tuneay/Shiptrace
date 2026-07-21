import { z } from "zod";

import type { RepositoryRef } from "@/types/github";

const ownerPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const repositoryPattern = /^[a-zA-Z0-9._-]{1,100}$/;

export const analyzeRequestSchema = z.object({
  repository: z.string().trim().min(3).max(240),
  periodDays: z.union([z.literal(7), z.literal(30)]),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

export function parseGitHubRepository(input: string): RepositoryRef | null {
  const raw = input.trim();
  if (!raw || /[?#]/.test(raw)) return null;

  let path = raw;

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (!["github.com", "www.github.com"].includes(url.hostname.toLowerCase())) return null;
      if (url.port || url.username || url.password) return null;
      path = url.pathname;
    } catch {
      return null;
    }
  } else {
    path = path.replace(/^(?:www\.)?github\.com\//i, "");
  }

  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 2) return null;

  const owner = parts[0];
  const repo = parts[1].replace(/\.git$/i, "");
  if (!ownerPattern.test(owner) || !repositoryPattern.test(repo)) return null;

  return { owner, repo };
}
