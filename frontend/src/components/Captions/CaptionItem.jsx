import { Box, Typography } from "@mui/material";
import { memo } from "react";

function CaptionItem({ caption }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {caption.start.toFixed(2)}s – {caption.end.toFixed(2)}s
      </Typography>
      <Typography variant="body2">{caption.text}</Typography>
    </Box>
  );
}

export default memo(CaptionItem);
