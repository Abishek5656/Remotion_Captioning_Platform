import { useState, useCallback } from "react";
import { Stack, Typography, Card, CardContent } from "@mui/material";
import AutoCaptionButton from "./AutoCaptionButton";
import CaptionStatus from "./CaptionStatus";
import CaptionProgress from "./CaptionProgress";
import { runAutoCaptionPipeline } from "../../api/captionApi";

export default function AutoCaptionSection({
  videoId,
  onCaptionsGenerated,
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleAutoCaption = useCallback(async () => {
    try {
      setError("");
      setStatus("extracting_audio");

      const data = await runAutoCaptionPipeline(videoId, setStatus);

      if (onCaptionsGenerated) {
        onCaptionsGenerated(data.captions);
      }

      setStatus("completed");
    } catch (err) {
      setStatus("error");
      setError("Failed to generate captions");
    }
  }, [videoId, onCaptionsGenerated]);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",
        mt: { xs: 4, md: 6 },
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6" textAlign="center">
            Auto-Captioning
          </Typography>

          <AutoCaptionButton
            disabled={!videoId || status !== "idle"}
            onClick={handleAutoCaption}
          />

          <CaptionStatus status={status} error={error} />

          {status !== "idle" && status !== "completed" && (
            <CaptionProgress status={status} />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
