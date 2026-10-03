# Gemini Native Output Contract — V1

This is the single output authority for Gemini Native.

## Required top-level fields

- schema_version
- analysis_id
- video
- global_reference
- timeline
- scenes
- validation

See 04-schemas/scene-list.md for canonical composition and nested schema semantics.

## Required scene fields

Every scene must include scene_id, start_time, end_time, duration, and evidence_ids.

Additional fields must remain evidence-grounded.

## Output rules

1. Keep scenes chronological.
2. Ground substantive claims in evidence.
3. Preserve observed, inferred, and unknown distinctions.
4. Preserve corrections and conflicts.
5. Never omit required evidence references.
6. Never expose internal reasoning or hidden chain-of-thought.
7. Never present undocumented provider fields as guaranteed behavior.
8. If validation fails, return the appropriate validation state rather than presenting the result as completed.
9. Do not turn examples into additional requirements.
10. Do not add fields solely because a provider supports them; they must first belong to the V1 contract.

The final response is a scene-list result, not an explanatory essay, unless diagnostics are explicitly requested.
