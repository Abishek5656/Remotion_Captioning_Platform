import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export default function UploadDropZone({ onFileSelect }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/mp4": [] },
    multiple: false,
    onDrop: (files) => onFileSelect(files[0]),
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 2,
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">
        Drag & drop an MP4 file here
      </Typography>
      <Typography variant="body2" color="text.secondary">
        or click to select
      </Typography>
    </Box>
  );
}
