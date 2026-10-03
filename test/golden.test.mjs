import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateFinalResult } from "../src/validator.mjs";

test("golden V1 output passes deterministic final validation", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/golden-output.json", import.meta.url), "utf8"));
  const validation = validateFinalResult(fixture);
  assert.equal(validation.valid, true, JSON.stringify(validation.errors));
  assert.deepEqual(validation.errors, []);
});

test("golden V1 preserves evidence linkage", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/golden-output.json", import.meta.url), "utf8"));
  for (const scene of fixture.scenes) {
    assert.ok(scene.evidence_ids.length > 0);
    for (const id of scene.evidence_ids) {
      assert.ok(fixture.evidence.some((item) => item.evidence_id === id));
    }
  }
});