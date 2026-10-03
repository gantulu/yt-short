# yt-short

NotebookLM knowledge repository for Gemini Native YouTube Shorts Video Understanding.

## Purpose

This repository is dedicated to the **NotebookLM knowledge and instruction layer** used with Gemini Native. It contains the rules, workflow, agent roles, Gemini capability guidance, schemas, validation rules, examples, and invocation instructions required to analyze a public YouTube video and produce an evidence-grounded scene list.

**NotebookLM is the knowledge layer. Gemini Native is the analysis runtime.**

## Source of truth

`notebook/` is the sole active source of truth.

The repository intentionally contains no Node.js runtime, API-key configuration, executable pipeline, test harness, or duplicate documentation layer.

## Notebook package

- `00-system/` — identity, principles, constraints, source-of-truth rules.
- `01-workflow/` — complete analysis lifecycle.
- `02-agents/` — stage roles and responsibilities.
- `03-gemini/` — Gemini Video Understanding guidance.
- `04-schemas/` — input, evidence, timeline, global-reference, and scene-list contracts.
- `05-validation/` — evidence, timeline, continuity, output, completion, and acceptance rules.
- `06-examples/` — expected output examples.
- `07-gemini-native/` — instructions and invocation contract for Gemini Native.

## Usage

1. Add the `notebook/` directory contents to the intended NotebookLM notebook as the knowledge/instruction source package.
2. Use the Gemini Native workflow defined in `notebook/07-gemini-native/`.
3. Provide one public YouTube URL or 11-character YouTube video ID.
4. Require the complete lifecycle and final validation before accepting the scene list.

## Versioning

The historical V1 analysis contract remains preserved inside the Notebook package. Changes to locked behavior require an explicit version increment.

## Principle

Do not fabricate visual details, dialogue, timestamps, identities, events, or metadata. Preserve uncertainty and conflicts instead of silently inventing certainty.
