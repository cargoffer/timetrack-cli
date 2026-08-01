# timetrack-cli

Open-source CLI for timetrack. This file exists to help AI coding agents contribute safely.

## Project context

- Repo: https://github.com/boomerdev/timetrack-cli
- Stack: TypeScript ESM, Commander, Vitest, tsdown
- Node: >=20
- Package dir: `/home/admin/code/BoomerDev/grupo2/timetrack/cli-public`
- Backend API: `https://timetracker.cargoffer.com/api/v1`
- Auth: `X-API-Key`

## Commands

- `npm run dev` — run CLI in dev mode
- `npm run build` — build to `dist/`
- `npm test` — run vitest
- `npm run lint` — eslint

## Rules

- Do not expose secrets in tests or examples
- Do not add interactive auth flows requiring browsers
- Keep commands composable and scriptable
- Preserve JSON output as default for machine use
