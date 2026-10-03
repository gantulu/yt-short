# V1 Lifecycle

This document is the canonical lifecycle contract. It consolidates the former lifecycle and full-lifecycle documents without changing locked V1 behavior.

## Ordered lifecycle

1. RECEIVED — accept exactly one public YouTube URL or 11-character video ID.
2. VALIDATING_INPUT — normalize and verify the target; do not invent metadata.
3. STATIC_PROCESSING — mandatory full-duration baseline at 1 FPS. Establish timestamped visual/audio evidence on one shared time base.
4. GAP_DETECTION — identify unresolved scene, action, identity, camera, environment, audio, dialogue, timestamp, and continuity gaps.
5. AGENTIC_INSPECTION — conditional. Investigate only actionable unresolved gaps. Agentic inspection never replaces the mandatory Static baseline.
6. EVIDENCE_RECONCILIATION — preserve original findings, append new evidence, preserve corrections and conflicts, and never resolve disagreement by unsupported majority vote.
7. GLOBAL_REFERENCE — assign persistent CHAR_###, OBJECT_###, and ENV_### IDs within the current video. Do not claim real-world identity.
8. UNIFIED_TIMELINE — align visual and audio events to the same chronological time base.
9. SCENE_DECOMPOSITION — create chronological scenes grounded in reconciled evidence. Each scene requires scene_id, start_time, end_time, duration, and at least one evidence_id.
10. FINAL_VALIDATION — validate timeline arithmetic, overlap/gap rules, evidence references, continuity, schema/output rules, and unresolved conflicts.
11. COMPLETED / NEEDS_REVIEW / FAILED — publish only when the completion gate passes; otherwise preserve evidence and return the appropriate state.

## Evidence states

Every substantive finding is classified as observed, inferred, or unknown. Never fabricate missing evidence.

## Audio

Track narration, dialogue, music, SFX, ambient sound, and unknown audio on the unified timeline. Dedicated transcription is conditional and may be used when dialogue/narration requires verification and the capability is available.

## Recovery

Recovery is non-destructive. Preserve successful prior evidence across retries and conditional-stage failures.

## V1 lock

The mandatory Static 1 FPS baseline, gap-driven Agentic inspection, evidence reconciliation, Global Reference, unified timeline, scene decomposition, and Final Validation gate are locked V1 behavior. A behavioral change requires a new version and explicit approval.
