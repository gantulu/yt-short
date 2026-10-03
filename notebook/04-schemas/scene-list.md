# Scene List Contract — V1

The final top-level object contains: schema_version, analysis_id, video, global_reference, timeline, scenes, validation.

schema_version must be 1.0.0.

## Scene minimum
Every scene requires scene_id, start_time, end_time, duration, and evidence_ids.

Additional scene fields are permitted by the schema and must remain evidence-grounded.

## Validation
validation.status is valid, invalid, or needs_review. A pipeline may publish COMPLETED only after final validation passes.