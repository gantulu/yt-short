# yt-short

Gemini Video Understanding pipeline for YouTube Shorts.

## V1.0 status

**Requirement status: LOCKED**

**Release status: V1.0.0**

**Executable runtime: IMPLEMENTED**

V1 uses a Hybrid Static + Agentic strategy:
1. Static analysis — mandatory, 1 FPS, full duration.
2. Gap detection — identifies unresolved questions.
3. Agentic inspection — conditional investigation of unresolved gaps.
4. Evidence reconciliation — preserves findings, corrections, and conflicts.
5. Global Reference — persistent character, object, and environment IDs.
6. Unified timeline — visual and audio events share one time base.
7. Dedicated transcription — conditional dialogue/narration verification.
8. Scene decomposition — structured chronological scene list.
9. Final validator — timeline, continuity, evidence, and schema gate.

## Repository map
- docs/requirements/ — locked V1 requirements.
- docs/architecture/ — pipeline and recovery contracts.
- docs/gemini/ — Gemini-specific implementation guidance.
- docs/releases/ — release records.
- system/ — global agent rules and constraints.
- agents/ — stage-level agent contracts.
- schemas/ — machine-readable data contracts.
- src/ — executable V1 runtime and Gemini provider adapter.
- test/ — deterministic V1 tests.
- notebook/ — curated AI-readable package for Gemini Native/Notebook.

## Source of truth

The locked requirement document is `docs/requirements/v1-requirements.md`.

Gemini API behavior must be verified against current official Google documentation before provider-specific API changes.

## Local verification

```
npm install
npm test
npm run analyze -- <youtube-url-or-video-id>
```

A successful release does not imply that live Gemini execution occurred in every environment.

## Completion rule

No analysis may be reported as COMPLETED until Final Validator passes.
