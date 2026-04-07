# Commit and release convention

## Commit format

```txt
<type>(<optional-scope>): <description>

[optional body]

[optional footer]
```

Valid examples:

- `feat: add login route`
- `fix: correct token validation`
- `docs: update README`
- `chore: update dependencies`

## Release scripts

- `npm run release:first`: first release bootstrap.
- `npm run release`: automatic bump based on commits.
- `npm run release:patch`: force patch bump (`0.0.1 -> 0.0.2`).
- `npm run release:minor`: force minor bump (`0.0.1 -> 0.1.0`).
- `npm run release:major`: force major bump (`0.x.y -> 1.0.0`).

## Pre-1.0 strategy (current project policy)

While the project is still evolving, prefer controlled bumps:

1. Use `npm run release:patch` for incremental progress and bug fixes.
2. Use `npm run release:minor` when a meaningful feature block is complete.
3. Avoid `npm run release:major` until the API is considered stable and production-ready.

Expected progression example:

`0.0.1 -> 0.0.2 -> 0.0.3 -> 0.1.0 -> 0.1.1 -> 0.1.2 -> 0.2.0 -> ... -> 1.0.0`

## Commit types and semantic intent

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation change
- `style`: formatting only
- `refactor`: internal code change without behavior change
- `perf`: performance improvement
- `test`: tests
- `build`: build/dependency changes
- `chore`: maintenance tasks

## Workflow

1. On each commit: hooks validate commit message and run staged checks.
2. On each release: `standard-version` updates version, changelog, release commit, and git tag.
