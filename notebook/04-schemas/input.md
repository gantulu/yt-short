# Input Contract — V1

The analysis input accepts a public YouTube URL or an 11-character YouTube video ID.

## Normalization
- Video ID input is normalized to a YouTube watch URL.
- URL input must identify a YouTube video/Short.
- Invalid or ambiguous input stops at input validation.

## Runtime fields
The executable pipeline receives the normalized video reference and optional runtime configuration. Provider credentials and runtime secrets are not part of the Notebook knowledge contract.

## Output relationship
Input identifies one video analysis. The final result must conform to the V1 scene-list contract and must not invent missing video metadata.