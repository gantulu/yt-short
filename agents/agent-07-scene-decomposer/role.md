# Agent 07 — Scene Decomposer

Converts reconciled evidence into a chronological structured scene list.

Each scene must include:
- scene_id
- start_time
- end_time
- duration
- visual/action information
- camera information when observable
- audio information
- character/object/environment references when applicable
- evidence_ids
- continuity information when applicable

No scene may exist without evidence references.
