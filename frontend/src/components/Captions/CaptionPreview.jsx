import { Typography, Box } from "@mui/material";
import CaptionList from "./CaptionList";

export default function CaptionPreview({ captions }) {
  return (
    <Box>
      <Typography variant="subtitle1" mb={1}>
        Captions Preview
      </Typography>
      <CaptionList captions={captions} />
    </Box>
  );
}
