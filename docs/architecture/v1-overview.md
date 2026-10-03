# Gemini Video Understanding V1.0 — Architecture

## Principle

> Analyze completely, investigate selectively, reconcile transparently, and validate before publishing.

## Pipeline

```
Input
  ↓
Input Validation
  ↓
Static Video Analysis — 1 FPS / full duration
  ↓
Gap Detection
  ↓
Agentic Inspection — conditional
  ↓
Evidence Reconciliation
  ↓
Global Reference
  ↓
Unified Timeline
  ↓
Scene Decomposition
  ↓
Final Validator
  ↓
COMPLETED / NEEDS_REVIEW / FAILED
```

## Stage contracts

### Input Validation
Normalizes a YouTube URL or video ID and creates an analysis ID.

### Static Analysis
Mandatory primary pass. It covers the entire video at the V1 1 FPS baseline.

### Gap Detection
Creates explicit unresolved gaps. A gap must have an ID, timestamp range when available, category, question, reason, priority, and status.

### Agentic Inspection
Conditional. It investigates unresolved gaps rather than blindly repeating the full analysis.

### Evidence Reconciliation
Combines findings while preserving corrections and conflicts.

### Global Reference
Creates persistent IDs for observed characters, objects, and environments within one video.

### Unified Timeline
Visual and audio events use the same time base.

### Scene Decomposition
Produces chronological scenes with evidence references and continuity information.

### Final Validator
Blocks completion when required integrity checks fail.

## Completion rule

An analysis cannot enter `COMPLETED` until Final Validator has finished and returned a valid result.
