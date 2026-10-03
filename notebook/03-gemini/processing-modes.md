# Gemini Processing Modes — V1

## Static
- Primary baseline for every analysis.
- Process the complete video timeline at 1 FPS.
- Sampling at 1 FPS is not frame-perfect coverage.
- Record observations with timestamps and evidence references.

## Agentic
- Conditional inspection only.
- Invoke after gap detection identifies an unresolved question.
- Inspect the smallest useful timestamp range.
- Agentic evidence supplements or corrects Static evidence; it never silently replaces it.
- Verify Agentic execution from returned processing steps when available.

## Selection rule
Static → gap detection → Agentic only for unresolved gaps → reconciliation.

## Invariants
- Preserve stage provenance.
- Preserve conflicts rather than choosing by majority vote.
- Use observed, inferred, or unknown; do not invent numeric confidence.