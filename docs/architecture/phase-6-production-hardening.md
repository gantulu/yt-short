# Phase 6 — Production Hardening V1

Phase 6 hardens the existing V1 runtime without changing locked analysis requirements.

## Reliability
- AbortController request timeout.
- Bounded retries for HTTP 408, 429, and 5xx.
- Bounded retries for transient network failures.
- Retry-After support when supplied.
- Configurable GEMINI_TIMEOUT_MS and GEMINI_MAX_RETRIES.
- Bounded provider error output.

Defaults: 120000 ms timeout and 3 retries.

## Credential safety
GEMINI_API_KEY remains runtime-only. Local environment files are ignored by Git. Credentials are not written to analysis output.

## Validation
The deterministic validator remains the publication gate for schema version, required identity, unique scenes, timeline arithmetic, chronological non-overlap, evidence linkage, and evidence classification.

## Failure policy
Persistent provider failures propagate as errors rather than producing fabricated fallback data. Existing evidence is not silently replaced.

## Idempotency boundary
No undocumented Gemini idempotency header or API field is introduced. Application-level persistence/idempotency remains future work.

## Verification
GitHub source verification is performed after changes. Runtime execution of npm test and live Gemini calls still requires Node.js 20+ and valid provider credentials.