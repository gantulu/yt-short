# Gemini Native Runtime Acceptance — V1

A runtime result is accepted only when all applicable checks pass.

## Input acceptance
- Valid public YouTube URL or valid 11-character video ID.
- Video target is accessible.
- No invented metadata.

## Processing acceptance
- Static baseline covers the complete video at 1 FPS.
- Gap detection occurs after the baseline.
- Agentic inspection occurs only when unresolved gaps require it.
- Agentic findings retain provenance and do not silently replace Static findings.

## Evidence acceptance
- Findings are classified observed, inferred, or unknown.
- Corrections and conflicts are preserved.
- Character, object, and environment IDs remain stable within the video.
- Visual and audio events use the same timeline.

## Scene acceptance
- Scenes are chronological.
- Every scene has scene_id, start_time, end_time, duration, and evidence_ids.
- Duration equals end_time minus start_time.
- Scene details are supported by evidence.

## Final acceptance
- Final Validator passes.
- validation.status is `valid` for COMPLETED.
- If evidence is insufficient, transcription is unavailable when required, or unresolved conflicts prevent completion, use `needs_review`.
- Never present a needs-review result as completed.

## Runtime vs repository verification

A Notebook runtime acceptance check does not claim that the repository Node.js implementation has been executed. Repository execution requires its own runtime test with the required environment and Gemini credentials.