# Codex Agent Playbook

## Mode
This repository uses single-agent collaboration with Codex in VSCode.

## Product Intent
This project is an authentication and user management API built for study and portfolio growth, with future reuse as a microservice in other applications.

## Technical Snapshot
- Runtime: Node.js (ESM), TypeScript
- HTTP: Fastify
- Database: Prisma + MySQL
- Entry point: `src/server.ts`
- Composition root: `src/app.ts`

## Architecture Contract
- `routes` wires HTTP endpoints.
- `controller` translates HTTP request/response and maps known errors.
- `service` contains business rules and validations.
- `repository` is the only layer that talks to Prisma.
- `prisma/schema.prisma` is the database source of truth.

Do not bypass these layers unless explicitly requested by the maintainer.

## Naming and Language Rules
1. Use English for code, identifiers, file names, commits, and technical docs.
2. Do not use generic key names such as `id` for database primary keys.
3. Use explicit keys with entity context, preferably `<entity>_id` (example: `user_id`).
4. Keep foreign keys explicit too (example: `user_id`, `role_id`, `session_id`).

## Documentation Rules
1. Add JSDoc to exported classes, interfaces, types, functions, and methods.
2. Keep JSDoc objective: purpose, params, return, throws when applicable.
3. Add short contextual comments only for non-obvious logic.

## Type Safety Rules
1. Keep strong typing end to end.
2. Do not introduce `any` unless there is a temporary blocker and it is justified.
3. Prefer `unknown` with narrowing over unsafe casts.
4. Keep strict TypeScript checks passing.

## Data and Error Rules
1. Never commit secrets (`.env`, tokens, credentials).
2. Any DB contract change requires Prisma schema update and migration.
3. Keep error mapping explicit: validation -> `400`, conflict -> `409`, unexpected -> `500`.
4. Map persistence-level conflicts into application/domain errors when needed.

## Versioning and Releases
1. Keep Conventional Commits and `standard-version` workflow.
2. Maintain `CHANGELOG.md` as release source of truth.
3. Classify commits with semantic intent (`feat`, `fix`, `refactor`, `docs`, `chore`, etc.).

## Recommended Validation Flow
1. `npm.cmd ci`
2. `npm.cmd run prisma:generate`
3. `npx.cmd tsc --noEmit`
4. `npm.cmd run build`
5. `npm.cmd run test`

## Delivery Standard
Every delivery should include:
1. What changed
2. Why it changed
3. Risks and compatibility notes
4. Validation commands and outcomes
5. Suggested next step

## Related Documents
- `.github/codex-instructions.md`
- `docs/ai/TASK_TEMPLATE.md`
- `docs/ai/PR_CHECKLIST.md`
- `docs/ai/ENGINEERING_STANDARDS.md`
