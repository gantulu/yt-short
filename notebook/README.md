# YT Short — NotebookLM Knowledge Package

**Package role:** primary knowledge and instruction source for NotebookLM + Gemini Native.

**knowledge_version:** 2.0.0  
**architecture_version:** 2.0.0  
**scene_schema_version:** 1.0.0

## Architecture

`NotebookLM knowledge` → `Gemini Native instructions` → `Gemini Video Understanding` → `V1 lifecycle` → `validated scene list`

NotebookLM stores and supplies the governing knowledge. Gemini Native performs the actual video understanding against the supplied YouTube target.

## Source-of-truth rule

This `notebook/` directory is the sole active source of truth for the project.

There is intentionally no separate active `docs/`, `agents/`, `system/`, `schemas/`, `src/`, `test/`, or Node.js runtime layer.

## Package map

- `00-system/` — governing identity and constraints.
- `01-workflow/` — lifecycle and processing rules.
- `02-agents/` — agent responsibilities.
- `03-gemini/` — Gemini-specific knowledge.
- `04-schemas/` — machine-readable-contract concepts expressed for NotebookLM.
- `05-validation/` — publication gates.
- `06-examples/` — canonical output example.
- `07-gemini-native/` — system instruction, execution contract, output contract, and invocation.

## Locked behavior

The original V1 evidence, timeline, continuity, persistent-ID, conditional-agentic, transcription, scene, and final-validation behavior remains the governing contract unless a new version explicitly changes it.
