# Scene List Contract — V1

This is the canonical human-readable scene-list contract. It replaces the removed executable JSON Schema as the active schema authority.

## Top-level object

Required fields:

- schema_version — string; V1 is 1.0.0.
- analysis_id — stable identifier for the current analysis.
- video — normalized target and available factual metadata.
- global_reference — persistent within-video entity tracking.
- timeline — unified visual/audio timeline.
- scenes — chronological scene list.
- validation — final validation state and findings.

Do not invent missing video metadata.

## Scene minimum

Every scene requires:

- scene_id
- start_time
- end_time
- duration
- evidence_ids

Additional scene fields are allowed when they are evidence-grounded and consistent with the other schema documents.

## Validation

validation.status is one of:

- valid
- invalid
- needs_review

COMPLETED is permitted only when final validation is valid.

## Evidence relationship

Every substantive scene claim must be traceable through evidence_ids. Unknown information remains unknown rather than being filled with guesses.

## Canonical schema relationship

input.md, evidence.md, timeline.md, and global-reference.md define the semantics of their respective nested sections. This file defines the final composition and minimum required fields.
