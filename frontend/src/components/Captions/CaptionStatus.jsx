import { Typography } from "@mui/material";

const STATUS_LABELS = {
  extracting_audio: "Extracting audio…",
  transcribing_audio: "Transcribing speech…",
  normalizing_captions: "Normalizing captions…",
  completed: "Captions generated successfully",
  error: "Something went wrong",
};

export default function CaptionStatus({ status, error }) {
  if (status === "idle") return null;

  return (
    <Typography
      textAlign="center"
      color={status === "error" ? "error" : "text.secondary"}
    >
      {error || STATUS_LABELS[status]}
    </Typography>
  );
}
