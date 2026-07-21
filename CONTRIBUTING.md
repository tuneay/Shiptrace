# Contributing to Shiptrace

Thanks for helping make technical progress easier to understand and share.

## Before you start

Shiptrace intentionally has a narrow product scope:

```text
Public repo URL → 7/30 days → GitHub metadata → analysis → public trace → share card
```

Please read `AGENTS.md`, `PROJECT_STATE.md`, and the relevant files under `docs/` before changing behavior. Authentication, private repositories, payments, dashboards, webhooks, and unrelated SaaS features are outside the current scope.

For substantial changes, open an issue first so the approach can be discussed before implementation begins.

## Development setup

Requirements:

- Node.js 20.9 or newer
- npm

Install and start the app:

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
npm.cmd run dev
```

Never commit `.env.local`, API keys, database credentials, access tokens, production logs, or user data.

## Pull requests

1. Fork the repository and create a focused branch.
2. Keep changes within the documented product scope.
3. Add or update tests when behavior changes.
4. Preserve strict TypeScript and Zod validation at external boundaries.
5. Verify mobile layout, keyboard access, and reduced-motion behavior for UI changes.
6. Run the complete validation suite:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

7. Complete the pull request template and explain any important tradeoffs.

## Commit style

Prefer concise conventional-style messages:

```text
feat: add trace metadata
fix: accept Supabase timestamp offsets
docs: clarify local setup
test: cover fallback analysis
```

## Security reports

Do not report vulnerabilities or exposed credentials in a public issue. Follow `SECURITY.md` instead.

## License of contributions

By submitting a contribution, you agree that it will be licensed under the GNU Affero General Public License v3.0 only, the same license as the project.
