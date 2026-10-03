# V1 Processing Pipeline

1. Validate and normalize YouTube URL/video ID; create analysis ID.
2. Perform mandatory static video analysis at 1 FPS for the full duration.
3. Detect explicit unresolved gaps.
4. Run Agentic inspection only for actionable unresolved gaps.
5. Reconcile Static, Agentic, and conditional transcription evidence.
6. Build persistent Global Reference IDs.
7. Construct the unified timeline and chronological scene list.
8. Run final validation.
9. Publish only a valid result; otherwise return NEEDS_REVIEW or FAILED.

Static 1 FPS is a sampling strategy, not frame-perfect coverage.
