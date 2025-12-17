import { LinearProgress } from "@mui/material";

const PROGRESS_MAP = {
  extracting_audio: 30,
  transcribing_audio: 65,
  normalizing_captions: 90,
};

export default function CaptionProgress({ status }) {
  return (
    <LinearProgress
      variant="determinate"
      value={PROGRESS_MAP[status] || 100}
    />
  );
}
