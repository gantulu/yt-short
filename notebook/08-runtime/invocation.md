# Gemini Native Invocation — V1

## User input

The user supplies exactly one video target:

`https://www.youtube.com/watch?v=VIDEO_ID`

or:

`VIDEO_ID`

The agent must normalize the target and verify that it is a public YouTube video.

## Invocation instruction

Use the current Notebook sources and execute the V1 Gemini Video Understanding lifecycle.

Analyze the complete video:
- mandatory Static processing at 1 FPS;
- detect unresolved gaps;
- conditionally investigate unresolved gaps with Agentic processing;
- reconcile evidence;
- construct Global Reference;
- construct the unified visual/audio timeline;
- decompose scenes;
- run Final Validation.

Do not replace the lifecycle with a simple summary request.

## Runtime behavior

The agent should perform the work internally and return only the contracted final scene-list result unless the user explicitly requests diagnostic information.

Do not expose hidden reasoning or chain-of-thought.

If a required capability is unavailable, preserve the affected evidence as unknown or return NEEDS_REVIEW rather than fabricating completion.