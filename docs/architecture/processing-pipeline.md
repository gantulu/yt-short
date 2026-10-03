# V1 Processing Pipeline

## State machine

```
RECEIVED
→ VALIDATING_INPUT
→ STATIC_PROCESSING
→ GAP_DETECTION
→ AGENTIC_INSPECTION
→ EVIDENCE_RECONCILIATION
→ GLOBAL_REFERENCE
→ SCENE_DECOMPOSITION
→ FINAL_VALIDATION
→ COMPLETED | NEEDS_REVIEW | FAILED
```

## Conditional branch

If gap detection returns no actionable unresolved gaps:

```
GAP_DETECTION → EVIDENCE_RECONCILIATION
```

If gaps exist:

```
GAP_DETECTION → AGENTIC_INSPECTION → EVIDENCE_RECONCILIATION
```

## Recovery

A failed conditional stage must not erase successful prior-stage evidence.

Examples:

- Agentic failure: preserve static analysis and mark inspection failure.
- Transcription failure: preserve audio observations and mark transcription unavailable.
- Validation failure: return errors/warnings without rewriting the source evidence.

## Idempotency

Each stage must be independently retryable. Persist stage status and execution metadata so retries do not duplicate or destroy previous evidence.
