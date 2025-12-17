
import { AbsoluteFill, Video } from "remotion";
import CaptionLayer from "./CaptionLayer";

export default function CaptionedVideo({
  videoSrc,
  captions,
  stylePreset,
}) {
  return (
    <AbsoluteFill>
      <Video src={videoSrc} />
      <CaptionLayer
        captions={captions}
        stylePreset={stylePreset}
      />
    </AbsoluteFill>
  );
}
