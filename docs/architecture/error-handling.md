# V1 Error Handling

## Error classes

| Error | Required behavior |
|---|---|
| Invalid input | Reject before processing |
| Video inaccessible | Stop with actionable failure |
| Static failure | Retry within configured limit |
| Agentic failure | Preserve static result; mark inspection failed |
| Transcription failure | Preserve audio evidence; mark transcription failed |
| Reconciliation conflict | Preserve conflict; mark for review if unresolved |
| Validation error | Do not publish as completed |
| Rate limit | Backoff and retry |
| Timeout | Retry only when safe and idempotent |

## Status semantics

- `COMPLETED`: all required validation gates passed.
- `NEEDS_REVIEW`: unresolved conflicts or warnings prevent automatic completion.
- `FAILED`: required processing could not complete.

## Non-destructive rule

Retries and recovery must not silently delete earlier evidence.
