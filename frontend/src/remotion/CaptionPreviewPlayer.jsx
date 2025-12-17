import { Player } from "@remotion/player";
import { Box, Select, MenuItem } from "@mui/material";
import CaptionedVideo from "./CaptionedVideo";




export default function CaptionPreviewPlayer({
  videoId,
  captions,
  stylePreset,
  onStyleChange,
}) {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  
  const videoUrl = `${API_BASE_URL}/videos/${videoId}.mp4`;

  return (
    <Box>
      <Select
        value={stylePreset}
        onChange={(e) => onStyleChange(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="bottom">Bottom Subtitles</MenuItem>
        <MenuItem value="topBar">Top Bar</MenuItem>
        <MenuItem value="karaoke">Karaoke</MenuItem>
      </Select>

      <Player
        component={CaptionedVideo}
        durationInFrames={30 * 300}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        controls
        inputProps={{
          videoSrc: videoUrl,
          captions,
          stylePreset,
        }}
      />
    </Box>
  );
}
