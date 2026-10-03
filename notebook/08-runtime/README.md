# Gemini Native Runtime Workflow — V1

Phase 4 defines how a user invokes the Gemini Native agent using the Phase 3 instruction layer.

This is an operational workflow, not a new schema or requirement layer.

## Runtime contract

Input:
- public YouTube URL, or
- 11-character YouTube video ID.

Execution:
1. Load the Gemini Native notebook containing the curated source package and Phase 3 instructions.
2. Provide the YouTube URL or video ID.
3. Instruct the agent to execute the complete V1 lifecycle.
4. Allow the agent to inspect the video and resolve only evidence gaps.
5. Require Final Validation before accepting the result.
6. Return the V1 scene-list structure.

GitHub remains the source of truth; the Notebook is its curated AI-readable projection.

## Important distinction

Gemini Native runtime is separate from the repository Node.js runtime. The Node.js runtime uses the Gemini API directly and requires GEMINI_API_KEY. Gemini Native notebook execution does not expose that credential through notebook instructions.