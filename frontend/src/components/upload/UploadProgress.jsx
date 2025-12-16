import { Box, LinearProgress, Typography } from "@mui/material";

export default function UploadProgress() {
  return (
    <Box>
      <Typography variant="body2" mb={1}>
        Uploading...
      </Typography>
      <LinearProgress />
    </Box>
  );
}
