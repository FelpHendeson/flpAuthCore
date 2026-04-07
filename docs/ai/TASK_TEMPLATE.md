# AI Task Template

Use this template when opening a task for Codex.

## 1) Context
- Business context:
- Current behavior:
- Relevant files:

## 2) Objective
- Expected outcome:
- Out of scope:

## 3) Constraints
- Architectural constraints:
- Backward compatibility constraints:
- Performance/security constraints:
- Data key naming constraints (`<entity>_id`):
- Language constraints (English only in code/docs):
- Documentation constraints (JSDoc required):
- Type safety constraints (strong typing, no `any`):

## 4) Acceptance Criteria
1. 
2. 
3. 

## 5) Implementation Notes
- Preferred approach:
- Explicitly avoid:
- Release impact expectation (`feat`, `fix`, `refactor`, etc.):

## 6) Validation Commands
1. `npx.cmd tsc --noEmit`
2. `npm.cmd run build`
3. `npm.cmd run prisma:generate` (only if Prisma contract changed)
4. `npm.cmd run test` (when test suite exists)

## 7) Expected Delivery Format
1. Files changed and summary of each change
2. Risks and mitigations
3. Command results
4. Suggested next steps
