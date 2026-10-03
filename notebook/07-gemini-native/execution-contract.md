# Gemini Native Execution Contract — V1

## Input
- Accept a public YouTube URL or an 11-character YouTube video ID.
- Normalize the input before analysis.
- Reject invalid or ambiguous input.

## Processing
Static is mandatory at 1 FPS for the complete duration.
Gap detection classifies unresolved questions such as scene transition, visual action, character identity, object identity, environment, camera motion, audio event, dialogue, timestamp, and continuity.
Agentic inspection is conditional on unresolved gaps.

## Evidence
Every meaningful observation must remain traceable to an evidence item. Evidence records source stage, timestamps, observation, and classification.

## Scene contract
Each scene requires scene_id, start_time, end_time, duration, and evidence_ids. Additional fields must remain evidence-grounded.

## Timeline
Visual and audio events use the same chronological time base. Audio categories are narration, dialogue, music, sfx, ambient, and unknown.

## Final state
VALIDATING_INPUT → STATIC_PROCESSING → GAP_DETECTION → AGENTIC_INSPECTION when needed → EVIDENCE_RECONCILIATION → GLOBAL_REFERENCE → SCENE_DECOMPOSITION → FINAL_VALIDATION → COMPLETED / NEEDS_REVIEW / FAILED.

Final validation is a publication gate. The validator checks the result; it does not rewrite unsupported content.