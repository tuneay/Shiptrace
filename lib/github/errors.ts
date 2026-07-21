export type GitHubErrorCode =
  | "INVALID_REPOSITORY"
  | "REPOSITORY_NOT_FOUND"
  | "PRIVATE_REPOSITORY"
  | "NO_COMMITS"
  | "GITHUB_RATE_LIMIT"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

const messages: Record<GitHubErrorCode, string> = {
  INVALID_REPOSITORY: "Enter a valid GitHub repository URL.",
  REPOSITORY_NOT_FOUND: "We could not find this repository. Check the owner and repository name, then try again.",
  PRIVATE_REPOSITORY: "This repository is not publicly accessible. Private repository support is not available in this version.",
  NO_COMMITS: "No visible progress in this period. We found the repository, but there were no commits in the selected time range.",
  GITHUB_RATE_LIMIT: "GitHub is temporarily limiting requests. Try again in a moment.",
  NETWORK_ERROR: "We could not reach GitHub. Check your connection and try again.",
  UNKNOWN_ERROR: "We could not read this repository. Please try again.",
};

export class GitHubPipelineError extends Error {
  readonly code: GitHubErrorCode;
  readonly status: number;

  constructor(code: GitHubErrorCode, status = 500, cause?: unknown) {
    super(messages[code], { cause });
    this.name = "GitHubPipelineError";
    this.code = code;
    this.status = status;
  }
}

export function mapGitHubResponseError(response: Response): GitHubPipelineError {
  const remaining = response.headers.get("x-ratelimit-remaining");
  if (response.status === 429 || (response.status === 403 && remaining === "0")) {
    return new GitHubPipelineError("GITHUB_RATE_LIMIT", 429);
  }
  if (response.status === 404) return new GitHubPipelineError("REPOSITORY_NOT_FOUND", 404);
  return new GitHubPipelineError("UNKNOWN_ERROR", 502);
}
