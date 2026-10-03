# Completion Gate — V1

A result may be reported as `COMPLETED` only when all applicable conditions pass:

- input is valid and the target is accessible;
- the complete video has a Static baseline at 1 FPS;
- gap detection follows the baseline;
- Agentic inspection, when used, is limited to actionable gaps;
- evidence provenance is preserved;
- observed/inferred/unknown states are respected;
- corrections and conflicts are preserved;
- persistent character/object/environment IDs are stable within the video;
- visual and audio events share one timeline;
- required transcription is available or the affected result is marked for review;
- scenes are chronological and evidence-grounded;
- scene duration equals `end_time - start_time`;
- all referenced evidence IDs exist;
- Final Validator passes;
- no unresolved blocking conflict remains.

If any blocking condition fails, return `NEEDS_REVIEW` rather than fabricating completion.
