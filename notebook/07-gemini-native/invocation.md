# Gemini Native Invocation — V1

## Input

Provide exactly one target:

`https://www.youtube.com/watch?v=VIDEO_ID`

or:

`VIDEO_ID`

A Shorts URL is also valid.

## Invocation

Execute the complete V1 Gemini Video Understanding lifecycle defined by the NotebookLM package.

Internally:

1. validate the target;
2. perform complete Static processing at 1 FPS;
3. detect gaps;
4. conditionally inspect actionable gaps;
5. reconcile evidence;
6. build Global Reference;
7. build the unified visual/audio timeline;
8. decompose scenes;
9. run Final Validation;
10. publish only if the completion gate passes.

Return only the contracted scene-list result unless diagnostic information is explicitly requested.

Do not expose hidden reasoning or chain-of-thought.

If a required capability is unavailable, preserve the affected information as unknown or return NEEDS_REVIEW. Never fabricate completion.
