# Full Gemini Native Lifecycle — V1 Contract

Execute the lifecycle in order:

1. **RECEIVED** — accept exactly one public YouTube URL or 11-character video ID.
2. **VALIDATING_INPUT** — normalize and verify the target; do not invent metadata.
3. **STATIC_PROCESSING** — mandatory full-duration baseline at 1 FPS. Establish timestamped visual/audio evidence on one shared time base.
4. **GAP_DETECTION** — identify unresolved scene, action, identity, camera, environment, audio, dialogue, timestamp, and continuity gaps.
5. **AGENTIC_INSPECTION** — conditional. Investigate only actionable unresolved gaps. Never use Agentic inspection as a replacement for the Static baseline.
6. **EVIDENCE_RECONCILIATION** — preserve original findings, append new evidence, preserve corrections and conflicts, and never resolve disagreement by unsupported majority vote.
7. **GLOBAL_REFERENCE** — assign persistent `CHAR_###`, `OBJECT_###`, and `ENV_###` IDs within the current video. Do not claim real-world identity.
8. **UNIFIED_TIMELINE** — align visual and audio events to the same time base.
9. **SCENE_DECOMPOSITION** — create chronological scenes grounded in evidence. Each scene requires `scene_id`, `start_time`, `end_time`, `duration`, and at least one `evidence_id`.
10. **FINAL_VALIDATION** — validate timeline arithmetic, overlap/gap rules, evidence references, continuity, schema/output rules, and unresolved conflicts.
11. **COMPLETED / NEEDS_REVIEW** — publish only when the completion gate passes. Otherwise preserve evidence and return `needs_review`.

## Evidence states

Every substantive finding must be treated as **observed**, **inferred**, or **unknown**. Never fabricate missing evidence.

## Audio

Track narration, dialogue, music, SFX, ambient sound, and unknown audio on the unified timeline. Use dedicated transcription only when dialogue/narration requires verification and the capability is available.

## Completion

No result is COMPLETED until Final Validation passes.
