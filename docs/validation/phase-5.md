# Phase 5 — Validation & Golden Test V1

## Objective

Verify the deterministic final-validation gate and establish a synthetic golden fixture representing the V1 output contract.

## Test layers

1. Input normalization.
2. Timeline arithmetic.
3. Scene overlap detection.
4. Evidence linkage.
5. Golden output validation.

## Golden fixture

`test/fixtures/golden-output.json` is synthetic. It is not an analysis of a real video and must not be treated as video evidence.

## Acceptance gate

A V1 result can be marked `valid` only when deterministic validation returns no errors and no blocking reconciliation or transcription conditions exist.

The validator checks the result and does not rewrite analysis content.

## Runtime verification

These tests require Node.js 20+ and must be executed in a runtime environment. Creating and inspecting the tests in GitHub is source verification, not proof of test execution.