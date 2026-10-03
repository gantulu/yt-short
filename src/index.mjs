import { runPipeline } from "./pipeline.mjs";

const input = process.argv[2];

if (!input) {
  console.error("Usage: npm run analyze -- <youtube-url-or-video-id>");
  process.exit(2);
}

try {
  const result = await runPipeline(input);
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
} catch (error) {
  console.error(error?.stack || error);
  process.exit(1);
}
