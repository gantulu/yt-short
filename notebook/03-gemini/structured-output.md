# Gemini Structured Output — Capability Reference

Current Gemini documentation supports structured outputs that conform to a supplied JSON Schema subset.

Relevant supported schema concepts include objects, arrays, strings, numbers, integers, booleans, null, required properties, descriptions, enums, and selected array constraints.

## V1 relationship

The repository's V1 scene-list contract is defined by the human-readable schema documents under 04-schemas/. Provider structured-output support may be used to help produce conforming output, but provider schema support does not redefine the repository contract.

Always validate semantic correctness after structured generation. Valid JSON alone does not prove that the analysis is evidence-grounded or that the V1 completion gate passes.
