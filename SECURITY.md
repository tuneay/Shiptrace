# Security policy

## Supported versions

Shiptrace is currently pre-1.0. Security fixes are applied to the latest commit on the `main` branch.

## Reporting a vulnerability

Please do not disclose security vulnerabilities, leaked credentials, or sensitive logs in public issues, discussions, or pull requests.

Use GitHub's private vulnerability reporting flow:

1. Open the repository's **Security** tab.
2. Select **Advisories**.
3. Choose **Report a vulnerability**.
4. Include reproduction steps, impact, affected files or routes, and any suggested mitigation.

Reports should avoid real API keys, personal data, private repository content, or unnecessary commit-message payloads. Redacted examples are preferred.

Relevant issues include, but are not limited to:

- server secret exposure;
- authorization or Row Level Security bypasses;
- prompt-injection paths that override system rules;
- unintended private repository access;
- stored or reflected script injection;
- denial-of-service or rate-limit bypasses;
- dependency vulnerabilities with a demonstrated impact on Shiptrace.

The maintainers will acknowledge valid reports, investigate them privately, and coordinate disclosure after a fix is available. Response times are best-effort because this is a community-maintained project.

## Security model

- Only public GitHub metadata and commit messages are processed.
- Repository source code and diffs are not downloaded.
- Commit messages are treated as untrusted input.
- Supabase service credentials and AI/GitHub tokens are server-only.
- Client-side database writes are not supported.

## Credential exposure

If a secret is exposed, revoke or rotate it immediately. Removing it from the latest commit is not sufficient because Git history and external caches may retain the value.
