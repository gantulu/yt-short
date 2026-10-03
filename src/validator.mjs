export function validateFinalResult(result) {
  const errors = [];
  const warnings = [];
  const scenes = Array.isArray(result?.scenes) ? result.scenes : [];
  const evidence = Array.isArray(result?.evidence) ? result.evidence : [];
  const evidenceIds = new Set(evidence.map((item) => item?.evidence_id).filter(Boolean));
  const sceneIds = new Set();
  let previousEnd = null;

  if (result?.schema_version !== "1.0.0") errors.push("schema_version must be 1.0.0.");
  if (!result?.analysis_id) errors.push("analysis_id is required.");
  if (!result?.video?.video_id) errors.push("video.video_id is required.");

  for (const scene of scenes) {
    if (!scene?.scene_id) errors.push("Every scene requires scene_id.");
    if (sceneIds.has(scene.scene_id)) errors.push("Duplicate scene_id: " + scene.scene_id);
    sceneIds.add(scene.scene_id);

    const start = scene?.start_time;
    const end = scene?.end_time;
    const duration = scene?.duration;

    if (![start, end, duration].every((n) => typeof n === "number" && Number.isFinite(n))) {
      errors.push("Scene " + scene.scene_id + ": invalid numeric timeline.");
      continue;
    }

    if (start < 0 || end < start || duration < 0) {
      errors.push("Scene " + scene.scene_id + ": invalid time range.");
    }

    if (Math.abs((end - start) - duration) > 0.05) {
      errors.push("Scene " + scene.scene_id + ": duration arithmetic failed.");
    }

    if (previousEnd !== null && start < previousEnd - 0.05) {
      errors.push("Scene " + scene.scene_id + ": overlaps previous scene.");
    }
    previousEnd = end;

    if (!Array.isArray(scene.evidence_ids) || scene.evidence_ids.length === 0) {
      errors.push("Scene " + scene.scene_id + ": evidence_ids is required.");
    } else {
      for (const id of scene.evidence_ids) {
        if (!evidenceIds.has(id)) errors.push("Scene " + scene.scene_id + ": unknown evidence_id " + id + ".");
      }
    }
  }

  for (const item of evidence) {
    if (!item?.evidence_id) errors.push("Every evidence item requires evidence_id.");
    if (!["observed", "inferred", "unknown"].includes(item?.classification)) {
      errors.push("Evidence " + (item?.evidence_id || "<unknown>") + " has invalid classification.");
    }
  }

  if (!scenes.length) warnings.push("No scenes were produced.");

  return { valid: errors.length === 0, errors, warnings };
}
