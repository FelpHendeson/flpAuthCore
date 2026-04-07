# Codex Instructions

## Agent Scope
Single-agent workflow using Codex (VSCode extension).
Work incrementally, keep changes small, and preserve architecture boundaries.

## Architecture Boundaries
Follow:
`routes -> controller -> service -> repository -> prisma`.

Do not place business rules in controller or repository.
Keep Prisma access inside repository layer.

## Language and Documentation
1. Use English in code and technical documentation.
2. Add JSDoc to exported classes, interfaces, types, functions, and methods.
3. Keep comments concise and technical.

## Data Modeling Rules
1. Avoid generic PK names such as `id`.
2. Use explicit key naming with entity context, preferably `<entity>_id`.
3. Apply the same convention for foreign keys.
4. Keep Prisma schema and migrations aligned for every DB contract change.

## Type Safety
1. Keep TypeScript strict checks passing.
2. Avoid `any`; use typed interfaces and `unknown` with narrowing when needed.
3. Preserve explicit return types in service and controller methods.

## Error Mapping
1. Validation errors -> `400`
2. Conflict errors (duplicate constraints) -> `409`
3. Unexpected failures -> `500`

## Quality Gate Before Delivery
Run:
1. `npx.cmd tsc --noEmit`
2. `npm.cmd run build`
3. `npm.cmd run prisma:generate` (if Prisma contracts changed)
4. `npm.cmd run test` (if tests exist)

## Release Discipline
1. Keep Conventional Commits.
2. Keep release automation with `standard-version`.
3. Keep `CHANGELOG.md` updated via releases.
