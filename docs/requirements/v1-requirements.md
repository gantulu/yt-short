# Gemini Video Understanding V1.0 — Locked Requirements

Status: LOCKED

## Scope

This document is the immutable requirement baseline for the Gemini Video Understanding pipeline in `yt-short`.

## Locked requirements

1. **Hybrid Static + Agentic**
   - Static is the primary analysis.
   - Agentic is conditional inspection.

2. **Static baseline**
   - 1 FPS.
   - Entire video duration.

3. **Adaptive inspection**
   - Agentic is invoked only for unresolved gaps identified after the primary analysis.

4. **Evidence reconciliation**
   - Static and Agentic findings are merged.
   - Conflicts and corrections are preserved.

5. **Global Reference**
   - Persistent character IDs.
   - Persistent object IDs.
   - Persistent environment IDs.

6. **Audio analysis**
   - Visual and audio events share one unified timeline.

7. **Dedicated transcription**
   - Used when dialogue/narration requires transcription verification.

8. **Scene decomposition**
   - Produces a structured chronological scene list.

9. **Final validator**
   - Validates timeline, continuity, evidence references, and cross-stage consistency.

## Version policy

Locked requirements must not be silently changed. Any requirement change requires an explicit version increment and approval.

Implementation details may evolve when they do not alter the locked behavior above.
