# Gemini Video Understanding Mapping

The project maps V1 to current official Gemini Video Understanding capabilities.

- Public YouTube URLs can be supplied directly as video input; current Google documentation describes this capability as preview.
- Static processing is the mandatory V1 baseline and is explicitly configured at 1 FPS.
- Agentic processing is conditional and used to investigate unresolved gaps.
- Agentic findings are additional evidence, not automatic replacement of Static findings.
- Provider capabilities and model support must be verified against current official Google documentation before release.

Never invent undocumented fields, models, or processing parameters.