# Source of Truth — NotebookLM

The `notebook/` package is the sole active source of truth.

## Precedence

1. `00-system/` — global rules and constraints.
2. `01-workflow/` — lifecycle behavior.
3. `02-agents/` — agent responsibilities.
4. `03-gemini/` — Gemini capability guidance.
5. `04-schemas/` — output contracts.
6. `05-validation/` — acceptance and completion gates.
7. `06-examples/` — examples only; never override rules.
8. `07-gemini-native/` — runtime invocation instructions that must follow the layers above.

## No duplicate authority

Do not look for an alternative active requirement in repository paths outside `notebook/`. Historical executable/runtime material has been removed from the active repository.

## Change rule

Locked V1 behavior must not be silently changed. A behavioral change requires a new version and explicit documentation of the changed contract.
