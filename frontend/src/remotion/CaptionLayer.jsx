import { useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTION_STYLES } from "./captionStyles";
import { fontFamily } from "./fonts";

export default function CaptionLayer({ captions, stylePreset }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const active = captions.find(
    (c) => frame >= c.start * fps && frame <= c.end * fps
  );

  if (!active) return null;

  return (
    <div
      style={{
        ...CAPTION_STYLES[stylePreset],
        fontFamily,
        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
      }}
    >
      {active.text}
    </div>
  );
}
