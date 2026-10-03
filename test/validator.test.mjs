import test from "node:test";
import assert from "node:assert/strict";
import { normalizeYouTubeInput } from "../src/gemini.mjs";
import { validateFinalResult } from "../src/validator.mjs";

test("normalizes YouTube video ID", () => {
  assert.deepEqual(normalizeYouTubeInput("WpO3Owaqp5E"), {
    video_id: "WpO3Owaqp5E",
    url: "https://www.youtube.com/watch?v=WpO3Owaqp5E"
  });
});

test("rejects invalid YouTube input", () => {
  assert.throws(() => normalizeYouTubeInput("not-a-video"));
});

test("validator rejects a scene without evidence", () => {
  const result = validateFinalResult({
    schema_version: "1.0.0",
    analysis_id: "analysis_test",
    video: { video_id: "WpO3Owaqp5E" },
    evidence: [],
    scenes: [{
      scene_id: "SCENE_001",
      start_time: 0,
      end_time: 1,
      duration: 1,
      evidence_ids: []
    }]
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes("evidence_ids")));
});
