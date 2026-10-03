# Gemini Video Understanding — V1 Source of Truth

## Purpose

This document defines how the project maps the locked V1 requirements to Gemini video processing capabilities.

## Processing strategy

### Static — primary

- Processing mode: static
- Baseline sampling: 1 FPS
- Coverage: full video duration
- Purpose: establish complete baseline coverage and initial evidence

The 1 FPS baseline is a sampling strategy, not a claim of frame-perfect coverage.

### Agentic — conditional

Agentic processing is used when the static pass leaves unresolved gaps such as ambiguous actions, scene transitions, identity continuity, or timestamp uncertainty.

The agentic result is additional evidence. It does not automatically replace the static result.

## Evidence states

Every important finding should be classified as:

- `observed`
- `inferred`
- `unknown`

Never manufacture a numeric confidence score when the underlying model does not provide a defensible score.

## Unified timeline

All visual and audio events use the same video time base.

Supported audio categories:

- narration
- dialogue
- music
- sfx
- ambient
- unknown

## Dedicated transcription

Dedicated transcription is conditional. Invoke it when exact dialogue/narration verification, speaker information, or detailed timing is required.

The transcription result is evidence for reconciliation, not an automatic replacement for the broader video understanding result.

## Source-of-truth rule

The implementation must follow the current official Google Gemini API documentation for:

- Video Understanding
- Processing modes
- Interactions API
- Audio understanding
- Transcription
- Structured output
- Models and supported capabilities

Do not hard-code undocumented model names, fields, or processing parameters without verification against the current API documentation.

## API key security

Gemini credentials must remain server-side. They must never be embedded in client-side code, repository source, or generated scene output.
