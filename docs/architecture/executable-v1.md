# Executable V1

The repository now contains an executable Node.js implementation of the locked V1 pipeline.

Runtime:
- Node.js 20+
- Gemini Interactions API
- GEMINI_API_KEY is required at runtime
- GEMINI_MODEL defaults to gemini-3.8-flash

Pipeline:
YouTube URL / video ID -> input validation -> static 1 FPS -> gap detection -> conditional agentic inspection -> evidence reconciliation -> global reference -> scene decomposition -> deterministic final validator.

Dedicated transcription is conditional. When a dialogue gap requires dedicated transcription, the runtime uses GEMINI_AUDIO_URI with gemini-3.5-transcribe. If that audio input is unavailable, the result becomes NEEDS_REVIEW rather than pretending transcription completed.

Official references:
- https://ai.google.dev/gemini-api/docs/video-understanding
- https://ai.google.dev/gemini-api/docs/interactions-overview
- https://ai.google.dev/gemini-api/docs/structured-output
- https://ai.google.dev/gemini-api/docs/transcribe
