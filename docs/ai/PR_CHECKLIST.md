# AI PR Checklist

Use this checklist before merging changes produced by Codex.

## Scope
- [ ] Changes match requested scope
- [ ] No unrelated refactor was introduced

## Architecture
- [ ] Layered flow preserved (`routes -> controller -> service -> repository -> prisma`)
- [ ] Business rules are in service layer
- [ ] Prisma access is isolated in repository layer

## Data and Contracts
- [ ] API contract change was intentional and documented
- [ ] Prisma schema/migration updated when DB contract changed
- [ ] Primary and foreign keys follow explicit naming (`<entity>_id`)
- [ ] Known persistence conflicts are mapped to meaningful app/domain errors

## Language and Docs
- [ ] Code and technical docs are in English
- [ ] JSDoc added/updated for exported classes, types, functions, and methods

## Quality
- [ ] `npx.cmd tsc --noEmit` passed
- [ ] `npm.cmd run build` passed
- [ ] `npm.cmd run prisma:generate` passed (if applicable)
- [ ] Tests added or updated for changed behavior (when test suite exists)
- [ ] No `any` was introduced without explicit justification

## Security and Ops
- [ ] No secrets or sensitive data committed
- [ ] Logging and error responses do not leak internals
- [ ] Rollback strategy is clear for risky changes
- [ ] Release note impact is clear (commit semantic intent and changelog impact)
