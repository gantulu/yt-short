const API_BASE = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-3.8-flash";

function apiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is required.");
  return key;
}

export function normalizeYouTubeInput(input) {
  const value = String(input ?? "").trim();
  if (!value) throw new Error("Video URL or video ID is required.");

  if (/^[A-Za-z0-9_-]{11}$/.test(value)) {
    return { video_id: value, url: "https://www.youtube.com/watch?v=" + value };
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid YouTube URL.");
  }

  if (!["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(url.hostname)) {
    throw new Error("Input must be a YouTube URL or an 11-character YouTube video ID.");
  }

  const id = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v") ?? "";
  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
    throw new Error("Could not extract a valid 11-character YouTube video ID.");
  }

  return { video_id: id, url: "https://www.youtube.com/watch?v=" + id };
}

async function request(path, body) {
  const response = await fetch(API_BASE + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey()
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  if (!response.ok) throw new Error("Gemini API " + response.status + ": " + text);
  return JSON.parse(text);
}

function outputText(interaction) {
  if (typeof interaction?.output_text === "string") return interaction.output_text;

  const modelOutput = interaction?.steps?.find((step) => step?.type === "model_output");
  const textPart = modelOutput?.content?.find((part) => part?.type === "text");
  if (typeof textPart?.text === "string") return textPart.text;

  throw new Error("Gemini interaction did not return output_text.");
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Gemini returned non-JSON output where structured JSON was required.");
  }
}

export async function interact({ model = process.env.GEMINI_MODEL || DEFAULT_MODEL, videoUrl, prompt, processing, schema, generationConfig }) {
  const video = { type: "video", uri: videoUrl };
  if (processing) video.processing = processing;

  const body = {
    model,
    input: [{ type: "text", text: prompt }, video]
  };

  if (schema) {
    body.response_format = {
      type: "text",
      mime_type: "application/json",
      schema
    };
  }

  if (generationConfig) body.generation_config = generationConfig;

  const interaction = await request("/interactions", body);
  return {
    data: schema ? parseJson(outputText(interaction)) : outputText(interaction),
    raw: interaction
  };
}

export function hasAgenticProcessingSteps(interaction) {
  return Array.isArray(interaction?.steps) &&
    interaction.steps.some((step) => step?.type === "processing_call") &&
    interaction.steps.some((step) => step?.type === "processing_result");
}

export async function transcribeAudio(audioUri, mimeType = "audio/mp3") {
  const interaction = await request("/interactions", {
    model: "gemini-3.5-transcribe",
    input: [{ type: "audio", uri: audioUri, mime_type: mimeType }],
    generation_config: {
      transcription_config: {
        mode: { type: "verbatim", timestamp_granularities: ["word"] }
      }
    }
  });

  return { text: outputText(interaction), raw: interaction };
}
