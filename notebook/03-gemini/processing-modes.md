# Gemini Video Processing Modes — Capability Reference

## Static

Static processing uses fixed frame sampling. Current Google documentation states that the default sampling rate is 1 FPS.

Static processing is suitable for short clips and cases where broad, consistent coverage is required. Rapid action can be missed at 1 FPS.

Google also documents custom FPS and clipping intervals for Static processing.

## Agentic

Agentic video understanding dynamically navigates the video and can selectively inspect transcript, frames, and audio. Current documentation lists support for specific recent Gemini Flash models.

Agentic processing is useful for targeted or long-form investigation, but navigation behavior and supported models are provider capabilities, not V1 requirements.

## V1 rule

V1 remains:

1. Static full-duration 1 FPS baseline.
2. Gap Detection.
3. Agentic Inspection only for actionable unresolved gaps.
4. Evidence Reconciliation.

Do not replace the V1 baseline with Agentic processing without an explicit versioned contract change.

## Source-of-truth boundary

Current provider capability facts belong here. Required project behavior belongs in 00-system, 01-workflow, and 07-gemini-native.
