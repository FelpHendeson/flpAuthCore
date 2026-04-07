# Engineering Standards

## Purpose
Standards to keep this authentication API maintainable as a portfolio project and future microservice.

## API and Contracts
1. Prefer route versioning from the start (`/v1/...`) when adding public endpoints.
2. Keep error response format consistent across all controllers.
3. Keep request/response DTOs explicit and strongly typed.

## Data Modeling
1. Use explicit key naming with entity context (`<entity>_id`).
2. Avoid ambiguous column names and table names.
3. Keep migration files atomic and descriptive.

## Code Quality
1. Use English in all code-level artifacts.
2. Use JSDoc in exported classes, interfaces, types, functions, and methods.
3. Keep strict typing and avoid silent coercions.
4. Favor small, reviewable commits with clear intent.

## Testing Strategy
1. Add unit tests for service rules.
2. Add integration tests for repository and route contracts.
3. Add regression tests for every bug fix.

## Observability and Operations
1. Keep structured logs with request context.
2. Avoid leaking stack traces or sensitive internals in HTTP responses.
3. Keep health endpoints lightweight and deterministic.

## Release Management
1. Keep Conventional Commits discipline.
2. Use `standard-version` for changelog and tags.
3. Ensure each release note explains user-visible impact.
