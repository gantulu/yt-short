# Gemini Native Control Layer

This directory is the NotebookLM control layer for Gemini Native.

## Authority

- notebook-instruction.md — single master operating instruction.
- execution-contract.md — concise execution mapping; it does not override the master instruction.
- output-contract.md — single output authority.
- invocation.md — minimal user invocation.

## Usage model

The user supplies only a public YouTube URL, Shorts URL, or 11-character video ID.

The rest of the behavior is supplied by this Notebook knowledge package.

## Boundary

NotebookLM is the knowledge/instruction layer. Gemini Native is the video-understanding runtime.

The Notebook sources do not themselves execute video analysis. They define the role, workflow, evidence discipline, schema, validation, and provider capability guidance that Gemini Native should follow.
