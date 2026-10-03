# Expected Output — V1

The example below is intentionally minimal and demonstrates the contract shape. It is not a factual analysis of a real video.

```json
{
  "schema_version": "1.0.0",
  "analysis_id": "analysis_example_001",
  "video": { "video_id": "EXAMPLE12345", "duration": 10, "language": null, "aspect_ratio": null },
  "global_reference": { "characters": [], "objects": [], "environments": [] },
  "timeline": { "visual_events": [], "audio_events": [], "scene_boundaries": [] },
  "scenes": [
    { "scene_id": "SCENE_001", "start_time": 0, "end_time": 10, "duration": 10, "evidence_ids": ["EV_001"] }
  ],
  "validation": { "status": "valid", "errors": [], "warnings": [] }
}
```