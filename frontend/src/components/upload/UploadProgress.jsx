import { Box, LinearProgress, Typography } from "@mui/material";

export default function UploadProgress({ progress }) {
  return (
    <Box>
      <Typography variant="body2" mb={1}>
        Uploading... {progress}%
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
