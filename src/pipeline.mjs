import crypto from "node:crypto";
import { interact, normalizeYouTubeInput, hasAgenticProcessingSteps, transcribeAudio } from "./gemini.mjs";
import { validateFinalResult } from "./validator.mjs";

const GAP_SCHEMA = {
  type: "object",
  properties: {
    gaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          gap_id: { type: "string" },
          category: { type: "string" },
          timestamp_range: { type: "string" },
          question: { type: "string" },
          reason: { type: "string" },
          priority: { type: "string", enum: ["high", "medium", "low"] },
          status: { type: "string", enum: ["pending", "resolved", "unresolved"] }
        },
        required: ["gap_id", "category", "timestamp_range", "question", "reason", "priority", "status"]
      }
    }
  },
  required: ["gaps"]
};

const EVIDENCE_SCHEMA = {
  type: "object",
  properties: {
    evidence: {
      type: "array",
      items: {
        type: "object",
        properties: {
          evidence_id: { type: "string" },
          source_stage: { type: "string" },
          start_time: { type: ["number", "null"] },
          end_time: { type: ["number", "null"] },
          classification: { type: "string", enum: ["observed", "inferred", "unknown"] },
          observation: { type: "string" },
          evidence_ids: { type: "array", items: { type: "string" } }
        },
        required: ["evidence_id", "source_stage", "classification", "observation"]
      }
    }
  },
  required: ["evidence"]
};

const RECON_SCHEMA = {
  type: "object",
  properties: {
    evidence: {
      type: "array",
      items: {
        type: "object",
        properties: {
          evidence_id: { type: "string" },
          source_stage: { type: "string" },
          start_time: { type: ["number", "null"] },
          end_time: { type: ["number", "null"] },
          classification: { type: "string", enum: ["observed", "inferred", "unknown"] },
          observation: { type: "string" },
          evidence_ids: { type: "array", items: { type: "string" } }
        },
        required: ["evidence_id", "source_stage", "classification", "observation"]
      }
    },
    conflicts: { type: "array", items: { type: "string" } }
  },
  required: ["evidence", "conflicts"]
};

const GLOBAL_SCHEMA = {
  type: "object",
  properties: {
    characters: { type: "array", items: { type: "object" } },
    objects: { type: "array", items: { type: "object" } },
    environments: { type: "array", items: { type: "object" } }
  },
  required: ["characters", "objects", "environments"]
};

const SCENE_SCHEMA = {
  type: "object",
  properties: {
    scenes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          scene_id: { type: "string" },
          start_time: { type: "number" },
          end_time: { type: "number" },
          duration: { type: "number" },
          visual: { type: "string" },
          action: { type: "string" },
          camera: { type: "string" },
          audio: { type: "string" },
          transition: { type: "string" },
          character_ids: { type: "array", items: { type: "string" } },
          object_ids: { type: "array", items: { type: "string" } },
          environment_ids: { type: "array", items: { type: "string" } },
          evidence_ids: { type: "array", items: { type: "string" } },
          continuity: { type: "string" }
        },
        required: ["scene_id", "start_time", "end_time", "duration", "evidence_ids"]
      }
    }
  },
  required: ["scenes"]
};

const STATIC_SCHEMA = {
  type: "object",
  properties: {
    duration: { type: ["number", "null"] },
    language: { type: ["string", "null"] },
    aspect_ratio: { type: ["string", "null"] },
    visual_events: { type: "array", items: { type: "object" } },
    audio_events: { type: "array", items: { type: "object" } },
    scene_boundaries: { type: "array", items: { type: "object" } },
    evidence: { type: "array", items: { type: "object" } }
  },
  required: ["visual_events", "audio_events", "scene_boundaries", "evidence"]
};

function analysisId() {
  return "analysis_" + crypto.randomUUID().replaceAll("-", "").slice(0, 12);
}

function withEvidenceIds(items, prefix) {
  return (items ?? []).map((item, index) => ({
    evidence_id: item.evidence_id || prefix + "_" + String(index + 1).padStart(3, "0"),
    source_stage: item.source_stage || prefix,
    start_time: item.start_time ?? null,
    end_time: item.end_time ?? null,
    classification: item.classification || "observed",
    observation: item.observation || item.description || "No observation text supplied.",
    evidence_ids: Array.isArray(item.evidence_ids) ? item.evidence_ids : []
  }));
}

export async function runPipeline(input) {
  const normalized = normalizeYouTubeInput(input);
  const id = analysisId();
  const trace = { analysis_id: id, states: [] };
  const state = (name) => trace.states.push({ state: name, at: new Date().toISOString() });

  state("RECEIVED");
  state("VALIDATING_INPUT");
  state("STATIC_PROCESSING");

  const staticResult = await interact({
    videoUrl: normalized.url,
    processing: { type: "static", fps: 1 },
    schema: STATIC_SCHEMA,
    prompt: "Perform the mandatory V1 primary analysis of the entire YouTube Short. Analyze the full duration using static 1 FPS processing. Record visual and audio events on one timeline, candidate scene boundaries, and evidence with timestamps when observable. Separate observed, inferred, and unknown. Do not invent transcript, visual details, duration, or metadata. Return only the requested JSON."
  });

  const staticEvidence = withEvidenceIds(staticResult.data.evidence, "static");

  state("GAP_DETECTION");
  const gapResult = await interact({
    videoUrl: normalized.url,
    schema: GAP_SCHEMA,
    prompt: "Detect actionable unresolved gaps after this mandatory static 1 FPS pass. Only create gaps that materially affect scene boundaries, action, identity, camera, environment, audio, dialogue, timestamps, or continuity. Do not create gaps merely because more detail could be added. Static analysis follows:\n" + JSON.stringify({
      duration: staticResult.data.duration,
      visual_events: staticResult.data.visual_events,
      audio_events: staticResult.data.audio_events,
      scene_boundaries: staticResult.data.scene_boundaries,
      evidence: staticEvidence
    })
  });

  const unresolvedGaps = gapResult.data.gaps.filter((gap) => gap.status === "pending" || gap.status === "unresolved");

  let agenticEvidence = [];
  if (unresolvedGaps.length) {
    state("AGENTIC_INSPECTION");
    try {
      const agentic = await interact({
        videoUrl: normalized.url,
        processing: "agentic",
        schema: EVIDENCE_SCHEMA,
        prompt: "Investigate only these unresolved gaps in the YouTube Short. Inspect the necessary video moments and/or transcript. Return additional or corrective evidence only. Preserve uncertainty and do not silently replace static findings. Gaps:\n" + JSON.stringify(unresolvedGaps) + "\nStatic evidence:\n" + JSON.stringify(staticEvidence)
      });
      agenticEvidence = withEvidenceIds(agentic.data.evidence, "agentic");
      trace.agentic_processing_verified = hasAgenticProcessingSteps(agentic.raw);
    } catch (error) {
      trace.agentic_error = error.message;
    }
  }

  const needsDialogueVerification = unresolvedGaps.some((gap) => gap.category === "dialogue");
  let transcriptionEvidence = [];

  if (needsDialogueVerification) {
    const audioUri = process.env.GEMINI_AUDIO_URI;
    if (audioUri) {
      try {
        const transcription = await transcribeAudio(audioUri, process.env.GEMINI_AUDIO_MIME || "audio/mp3");
        transcriptionEvidence = [{
          evidence_id: "transcription_001",
          source_stage: "transcription",
          start_time: null,
          end_time: null,
          classification: "observed",
          observation: transcription.text,
          evidence_ids: []
        }];
      } catch (error) {
        trace.transcription_error = error.message;
      }
    } else {
      trace.transcription_unavailable = "Dialogue verification requires dedicated transcription, but GEMINI_AUDIO_URI was not supplied.";
    }
  }

  state("EVIDENCE_RECONCILIATION");
  const recon = await interact({
    videoUrl: normalized.url,
    schema: RECON_SCHEMA,
    prompt: "Reconcile these V1 evidence sets. The video is the primary source. Preserve original evidence, append new evidence, preserve corrections and conflicts, and never use majority vote. Classify findings as observed, inferred, or unknown. Do not manufacture evidence. STATIC:\n" + JSON.stringify(staticEvidence) + "\nAGENTIC:\n" + JSON.stringify(agenticEvidence) + "\nTRANSCRIPTION:\n" + JSON.stringify(transcriptionEvidence)
  });

  const reconciledEvidence = withEvidenceIds(recon.data.evidence, "reconciled");

  state("GLOBAL_REFERENCE");
  const global = await interact({
    videoUrl: normalized.url,
    schema: GLOBAL_SCHEMA,
    prompt: "Build the V1 Global Reference from this reconciled evidence. Create stable within-video IDs CHAR_001, OBJECT_001, and ENV_001 style. Do not claim real-world identity. Do not create a new ID solely because of camera angle, position change, or temporary occlusion. Include evidence_ids when supported. Evidence:\n" + JSON.stringify(reconciledEvidence)
  });

  state("SCENE_DECOMPOSITION");
  const scenes = await interact({
    videoUrl: normalized.url,
    schema: SCENE_SCHEMA,
    prompt: "Convert the reconciled evidence into a chronological V1 scene list. Cover observed chronology without invented events. Every scene requires numeric start_time, end_time, duration and one or more evidence_ids. Duration must equal end_time minus start_time. Include visual/action, camera, audio, transition, persistent entity IDs, and continuity only when supported. Do not add creative recommendations. Evidence:\n" + JSON.stringify(reconciledEvidence) + "\nGlobal Reference:\n" + JSON.stringify(global.data)
  });

  const result = {
    schema_version: "1.0.0",
    analysis_id: id,
    video: {
      video_id: normalized.video_id,
      duration: staticResult.data.duration ?? null,
      language: staticResult.data.language ?? null,
      aspect_ratio: staticResult.data.aspect_ratio ?? null
    },
    global_reference: global.data,
    timeline: {
      visual_events: staticResult.data.visual_events ?? [],
      audio_events: staticResult.data.audio_events ?? [],
      scene_boundaries: staticResult.data.scene_boundaries ?? []
    },
    evidence: reconciledEvidence,
    scenes: scenes.data.scenes ?? [],
    validation: { status: "invalid", errors: [], warnings: [] },
    trace
  };

  state("FINAL_VALIDATION");
  const validation = validateFinalResult(result);
  const hasUnresolvedConflict = Array.isArray(recon.data.conflicts) && recon.data.conflicts.length > 0;
  const transcriptionBlocked = needsDialogueVerification && !transcriptionEvidence.length;

  const warnings = [...validation.warnings];
  if (hasUnresolvedConflict) warnings.push(...recon.data.conflicts.map((c) => "Unresolved reconciliation conflict: " + c));
  if (transcriptionBlocked) warnings.push("Dedicated transcription was required but unavailable.");

  result.validation = {
    status: validation.valid && !hasUnresolvedConflict && !transcriptionBlocked ? "valid" : "needs_review",
    errors: validation.errors,
    warnings
  };

  state(result.validation.status === "valid" ? "COMPLETED" : "NEEDS_REVIEW");
  return result;
}
