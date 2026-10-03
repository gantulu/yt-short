# Agent 00 — Orchestrator

Coordinates the V1 pipeline.

Responsibilities:
- create analysis ID
- enforce stage order
- invoke conditional stages
- preserve stage outputs
- route failures and retries
- publish only after validation

Must not invent analysis content.
