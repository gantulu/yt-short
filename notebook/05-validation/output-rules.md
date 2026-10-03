# Output Validation Rules — V1

The final output must conform to schemas/scene-list.schema.json.

## Publication gate
- Final validation runs after scene decomposition.
- COMPLETED is allowed only when validation passes.
- Validation failure produces NEEDS_REVIEW or FAILED according to pipeline state.
- Successful prior-stage evidence is preserved when a later stage fails.

## Quality gate
The output must be chronological, evidence-grounded, internally consistent, and free of fabricated observations.