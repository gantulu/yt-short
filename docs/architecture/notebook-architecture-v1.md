# Notebook Architecture V1.0

Status: PROPOSED ARCHITECTURE — Phase 1
Repository: gantulu/yt-short
Purpose: define how the GitHub repository is projected into Gemini Notebook without changing the locked V1 contract.

## 1. Architectural Principle

GitHub remains the source of truth.

The Gemini Notebook is an AI-readable knowledge projection of the repository. It is not a replacement for the repository, executable runtime, schemas, or provider documentation.

```
GitHub Source of Truth
        |
        v
Curated Notebook Knowledge Projection
        |
        v
Gemini Notebook
        |
        v
Gemini Native
```

The Notebook projection must not introduce behavior that is absent from the locked V1 requirements.

## 2. Source-of-Truth Hierarchy

1. `docs/requirements/v1-requirements.md` — immutable V1 behavioral baseline.
2. `schemas/*.schema.json` — machine-readable data contracts.
3. `docs/architecture/*.md` — pipeline, state, recovery, and runtime architecture.
4. `system/*.md` — global agent principles and constraints.
5. `agents/*/role.md` — stage-level responsibilities.
6. `docs/gemini/*.md` — provider mapping, subject to current official Google documentation.
7. `notebook/*` — curated projection; it must remain consistent with the sources above.
8. `src/*` and `test/*` — executable implementation and deterministic verification, not primary Notebook knowledge.

If a Notebook document conflicts with a higher-level source, the higher-level source wins and the Notebook projection must be corrected.

## 3. Knowledge Classification

### A. REQUIRED — Agent Behavior

Project into Notebook:

- system identity
- principles
- constraints
- orchestrator behavior
- static analyzer behavior
- gap detector behavior
- agentic inspector behavior
- evidence reconciliation
- global reference
- scene decomposition
- final validation

### B. REQUIRED — Workflow

Project:

- lifecycle/state machine
- conditional Agentic branch
- evidence lifecycle
- recovery rules
- completion gate
- input/output contracts

### C. REQUIRED — Data Contracts

Project as human/AI-readable summaries of:

- input schema
- evidence schema
- global reference schema
- timeline schema
- scene-list schema

The canonical JSON Schema files remain authoritative.

### D. REQUIRED — Gemini Capability Mapping

Project:

- current Video Understanding behavior
- static processing
- agentic processing
- YouTube input behavior
- structured output
- transcription behavior
- capability limitations

Provider claims must be verified against current official Google documentation before release.

### E. OPTIONAL / REFERENCE ONLY

Potentially include:

- selected implementation examples
- expected-output examples
- troubleshooting guidance

These must not override the canonical requirements or schemas.

### F. EXCLUDE FROM PRIMARY NOTEBOOK KNOWLEDGE

Do not use as primary Agent knowledge:

- `src/*.mjs`
- `package.json`
- raw runtime implementation details
- secrets or environment values
- generated runtime artifacts
- test internals that do not define expected behavior
- obsolete/legacy prompts

## 4. Proposed Notebook Projection

Phase 2 will create the following package:

```
notebook/
├── README.md
├── 00-system/
│   ├── identity.md
│   ├── principles.md
│   └── constraints.md
├── 01-workflow/
│   ├── lifecycle.md
│   ├── pipeline.md
│   └── completion-rules.md
├── 02-agents/
│   ├── orchestrator.md
│   ├── static-analyzer.md
│   ├── gap-detector.md
│   ├── agentic-inspector.md
│   ├── evidence-reconciler.md
│   ├── global-reference.md
│   ├── scene-decomposer.md
│   └── final-validator.md
├── 03-gemini/
│   ├── video-understanding.md
│   ├── processing-modes.md
│   ├── structured-output.md
│   └── transcription.md
├── 04-schemas/
│   ├── input.md
│   ├── evidence.md
│   ├── global-reference.md
│   ├── timeline.md
│   └── scene-list.md
├── 05-validation/
│   ├── evidence-rules.md
│   ├── timeline-rules.md
│   ├── continuity-rules.md
│   └── output-rules.md
└── 06-examples/
    └── expected-output.md
```

This structure is an architecture target only. Creation of these files belongs to Phase 2.

## 5. Runtime Separation

The repository contains two complementary runtime paths:

### Gemini Native

```
User
 -> Gemini Native
 -> Gemini Notebook
 -> Notebook Knowledge
 -> Gemini Video Understanding
 -> V1 workflow
 -> Scene List
```

### Executable Runtime

```
User/Application
 -> yt-short runtime
 -> Gemini API
 -> V1 workflow
 -> Scene List
```

Both paths must follow the same V1 behavioral contract and schemas.

The Notebook must not become a substitute for the executable runtime.

## 6. Input Contract

The Native Agent should recognize:

- YouTube video ID
- YouTube watch URL
- YouTube Shorts URL

Canonical normalization remains defined by the implementation and input schema.

The user-facing goal is that a valid URL or video ID is sufficient to initiate the V1 workflow without requiring the user to paste the master prompt.

## 7. Output Contract

The canonical output remains:

`schemas/scene-list.schema.json`

Required top-level concepts:

- schema version
- analysis ID
- video
- global reference
- unified timeline
- chronological scenes
- validation result

The Notebook projection must explain the output contract but must not redefine it.

## 8. V1 Behavioral Invariants

The Notebook Agent must preserve these locked invariants:

1. Static analysis is mandatory at 1 FPS across the full duration.
2. Agentic inspection is conditional and gap-driven.
3. Evidence reconciliation preserves corrections and conflicts.
4. Character, object, and environment IDs persist within one video.
5. Audio and visual events share one timeline.
6. Dedicated transcription is conditional.
7. Scene decomposition is chronological and evidence-backed.
8. Final validation is a completion gate.
9. Observed, inferred, and unknown remain distinct.
10. No fabricated evidence, timestamps, dialogue, or identities.
11. Locked requirements cannot be changed without a version increment and approval.

## 9. Versioning

Every Notebook package release must record:

- knowledge version
- source repository commit
- schema version
- architecture version

Recommended metadata:

```
knowledge_version: 1.0.0
architecture_version: 1.0.0
schema_version: 1.0.0
source_commit: <git-sha>
```

A Notebook package must not silently drift from GitHub.

## 10. Phase Boundary

Phase 1 is complete when:

- the source-of-truth hierarchy is defined;
- repository content is classified;
- the Notebook projection structure is defined;
- runtime and knowledge responsibilities are separated;
- V1 invariants are explicitly preserved;
- no production Notebook files have been generated from this architecture yet.

Phase 2 is responsible for implementing the actual `notebook/` source package.
