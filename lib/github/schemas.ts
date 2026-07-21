import { z } from "zod";

export const githubRepositorySchema = z.object({
  name: z.string(),
  full_name: z.string(),
  html_url: z.url(),
  description: z.string().nullable(),
  default_branch: z.string(),
  private: z.boolean(),
  stargazers_count: z.number().int().nonnegative(),
  forks_count: z.number().int().nonnegative(),
});

export const githubCommitSchema = z.object({
  sha: z.string().min(7),
  html_url: z.url(),
  commit: z.object({
    message: z.string(),
    author: z.object({
      name: z.string(),
      date: z.iso.datetime(),
    }).nullable(),
    committer: z.object({
      name: z.string(),
      date: z.iso.datetime(),
    }).nullable(),
  }),
});

export const githubCommitListSchema = z.array(githubCommitSchema).max(100);

export type GitHubRepositoryResponse = z.infer<typeof githubRepositorySchema>;
export type GitHubCommitResponse = z.infer<typeof githubCommitSchema>;
