# Timeline Validation Rules — V1

1. Scene times are non-negative.
2. end_time must not precede start_time.
3. duration must equal end_time minus start_time within implementation tolerance.
4. Scenes must be chronologically ordered.
5. Overlaps and unexplained gaps are validation findings.
6. Visual and audio events use the same timeline.