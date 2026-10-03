# Gemini Video Understanding — Capability Reference

This document records provider capabilities that are relevant to the V1 workflow. It is not a replacement for the V1 project contract.

## Public YouTube input

Current Gemini API documentation supports public YouTube URLs as video input. This capability is distinct from NotebookLM YouTube-source ingestion.

Source: Google AI for Developers — Video understanding.

## Video processing

Gemini supports video understanding including visual description, segmentation, information extraction, timestamp references, and audio/visual analysis.

Current documentation describes:

- Static processing as the default mode, with frames sampled at 1 FPS.
- Agentic video understanding on supported recent Gemini Flash models, where the model dynamically navigates the video and selectively loads transcript, frames, and/or audio.
- Custom FPS and clipping intervals for Static processing.

## V1 mapping

The V1 project intentionally requires a full-duration Static 1 FPS baseline and uses Agentic processing only as conditional gap investigation.

This is a project workflow decision. It must not be rewritten merely because provider guidance recommends Agentic mode for other workloads.

## Evidence limitations

1 FPS sampling can miss rapid motion or very fast scene changes. Therefore the V1 evidence model must preserve uncertainty and use conditional deeper inspection when the baseline leaves actionable gaps.

Provider capabilities and model support can change. Verify this document against current official Google documentation before changing a locked workflow.
