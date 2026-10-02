# timetrack-cli

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://img.shields.io/badge/CI-passing-brightgreen.svg)](.github/workflows/ci.yml)
[![npm version](https://img.shields.io/badge/npm-0.1.0-blue.svg)](https://www.npmjs.com/package/timetrack-cli)

Open-source CLI for [timetrack](https://github.com/boomerdev/timetrack). Track time from the terminal. Built for developers, teams, and AI agents.

## Install

```bash
npm install -g timetrack-cli
```

## Quickstart

```bash
# Configure API base and key
export TIMETRACK_API_URL=https://api.timetracker.cargoffer.com/api/v1
export TIMETRACK_API_KEY=your-api-key

# Or login via CLI
timetrack auth-login your-api-key

# Start tracking
timetrack time-entries start --project-id <projectId> --description 'Deep work'

# Stop timer
timetrack time-entries stop <entry-id>

# List today's entries
timetrack time-entries list

# Projects and clients
timetrack projects list
timetrack clients list
timetrack tasks list --project-id <projectId>

# Summaries
timetrack summary weekly
timetrack summary daily

# Export
timetrack export time-entries --format csv
```

## MCP integration

Use `timetrack-cli` as a helper for MCP workflows:

```bash
# Get active timer
timetrack time-entries active --json

# Export week for agent context
timetrack summary weekly --json
```

AI agents can shell out to `timetrack` for reliable time-tracking context.

## Contributing

Issues and PRs welcome. See `AGENTS.md` for AI coding context.

## License

MIT — see [LICENSE](LICENSE).
