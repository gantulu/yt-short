# V1 Processing Pipeline

The pipeline is the operational summary of the canonical lifecycle.

1. Normalize one public YouTube URL or 11-character video ID.
2. Perform mandatory Static analysis at 1 FPS across the full video duration.
3. Detect explicit unresolved gaps.
4. Run Agentic inspection only for actionable unresolved gaps.
5. Reconcile Static, Agentic, and applicable transcription evidence.
6. Build persistent Global Reference IDs.
7. Construct one unified visual/audio timeline.
8. Decompose the timeline into chronological scenes.
9. Run Final Validation.
10. Publish only a valid result; otherwise return NEEDS_REVIEW or FAILED.

Static 1 FPS is a V1 project requirement and sampling strategy, not a claim that 1 FPS is frame-perfect coverage. Provider capabilities are documented separately under 03-gemini/.
