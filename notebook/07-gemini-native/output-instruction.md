# Gemini Native Output Instruction — V1

Return the final result as the V1 scene-list structure defined by the Notebook schema documentation and canonical JSON Schema.

Required top-level fields:
- schema_version
- analysis_id
- video
- global_reference
- timeline
- scenes
- validation

Required scene fields:
- scene_id
- start_time
- end_time
- duration
- evidence_ids

Output rules:
1. Chronological order.
2. Evidence-grounded observations only.
3. Preserve unknowns rather than guessing.
4. Preserve conflicts and corrections in evidence.
5. Do not omit required evidence references.
6. Do not expose internal reasoning or hidden chain-of-thought.
7. Do not add undocumented provider fields as if they were guaranteed.
8. If validation does not pass, use the appropriate validation state rather than presenting the result as completed.

The final response is a scene-list result, not an explanatory essay.