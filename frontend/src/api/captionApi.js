import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * STEP 1 — Extract audio from uploaded video
 * Backend: POST /api/extract-audio
 */
export const extractAudio = (videoId) => {
  return axios.post(`${API_BASE_URL}/api/extract-audio`, {
    videoId,
  });
};

/**
 * STEP 2 — Run Speech-to-Text (Whisper – free, local)
 * Backend: POST /api/transcribe
 */
export const transcribeAudio = (videoId) => {
  return axios.post(`${API_BASE_URL}/api/transcribe`, {
    videoId,
  });
};

/**
 * STEP 3 — Normalize captions and fetch render-ready data
 * Backend: POST /api/captions
 */
export const fetchNormalizedCaptions = (videoId) => {
  return axios.post(`${API_BASE_URL}/api/captions`, {
    videoId,
  });
};

/**
 * OPTIONAL (recommended)
 * Orchestrates full auto-caption pipeline
 * UI can call ONE function instead of three
 */
export const runAutoCaptionPipeline = async (
  videoId,
  onStatusChange
) => {
  if (onStatusChange) onStatusChange("extracting_audio");
  await extractAudio(videoId);

  if (onStatusChange) onStatusChange("transcribing_audio");
  await transcribeAudio(videoId);

  if (onStatusChange) onStatusChange("normalizing_captions");
  const response = await fetchNormalizedCaptions(videoId);

  if (onStatusChange) onStatusChange("completed");
  return response.data;
};
