import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import UploadDropZone from "./UploadDropZone";
import UploadProgress from "./UploadProgress";
import { validateVideoFile } from "../../utils/validation";
import { uploadVideoApi } from "../../api/uploadApi";


export default function VideoUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (selectedFile) => {
    const validationError = validateVideoFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setProgress(0);
      const response = await uploadVideoApi(file, setProgress)

  
      const uploadedVideoId = response.data.videoId;

      localStorage.setItem("videoId",uploadedVideoId)
  
      if (onUploadSuccess) {
        onUploadSuccess(uploadedVideoId);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
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
            onClick={handleUpload}
          >
            Upload Video
          </Button>

          {uploading && <UploadProgress progress={progress} />}
        </Stack>
      </CardContent>
    </Card>
  );
}
