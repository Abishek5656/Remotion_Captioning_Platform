import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import UploadDropZone from "./UploadDropZone";
import UploadProgress from "./UploadProgress";
import { validateVideoFile } from "../../utils/validation";

export default function VideoUploader() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (selectedFile) => {
    const validationError = validateVideoFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 560,
        mx: "auto",
        mt: { xs: 4, md: 8 },
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6" textAlign="center">
            Upload Video
          </Typography>

          <UploadDropZone onFileSelect={handleFileSelect} />

          {file && (
            <Typography variant="body2" textAlign="center">
              Selected: {file.name}
            </Typography>
          )}

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            disabled={!file || uploading}
          >
            Upload Video
          </Button>

          {uploading && <UploadProgress />}
        </Stack>
      </CardContent>
    </Card>
  );
}
