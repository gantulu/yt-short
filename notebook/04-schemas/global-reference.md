# Global Reference Contract — V1

Global Reference maintains persistent identities across the video.

## Identity namespaces
- CHAR_### — character tracking identity.
- OBJECT_### — object tracking identity.
- ENV_### — environment tracking identity.

These IDs track continuity within one video. They are not claims about verified real-world identity.

## Rules
- Reuse an ID when the same tracked entity persists across scenes.
- Create a new ID only when evidence indicates a distinct tracked entity.
- Preserve uncertainty instead of forcing identity.
- Global Reference is produced after evidence reconciliation and before scene decomposition.