# Evidence Contract — V1

Evidence is the atomic traceability unit used across analysis stages.

## Required concepts
- evidence_id: stable identifier.
- source_stage: stage that produced the evidence.
- timestamps: source time or time range.
- observation: factual observation or extracted event.
- classification: observed, inferred, or unknown.

## Rules
1. Evidence remains traceable to its producing stage.
2. Do not convert inference into observation.
3. Unknown is valid when evidence is insufficient.
4. Reconciliation preserves original evidence when later evidence corrects or conflicts with it.
5. Scene output references supporting evidence through evidence_ids.