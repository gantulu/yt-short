# NotebookLM / Gemini Native Acceptance — V1

## Input
- One public YouTube URL or one 11-character video ID.
- Target is accessible.
- No invented metadata.

## Processing
- Full Static baseline at 1 FPS.
- Gap detection after Static.
- Agentic inspection only for unresolved actionable gaps.
- Reconciliation preserves provenance, corrections, and conflicts.

## Evidence and identity
- Findings are observed, inferred, or unknown.
- Persistent `CHAR_###`, `OBJECT_###`, and `ENV_###` IDs remain stable within the video.
- Visual and audio events use the same timeline.

## Scenes
- Chronological coverage.
- Required scene fields are present.
- Duration arithmetic is exact.
- Every scene is supported by evidence.

## Final
- Final Validator passes.
- Only then is the result published as COMPLETED.
- Otherwise use NEEDS_REVIEW and preserve the unresolved evidence.
