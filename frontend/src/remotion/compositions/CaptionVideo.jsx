
import { Video, AbsoluteFill } from "remotion";

export default function CaptionVideo({ videoSrc, captions, captionStyle }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentCaption = captions.find(
    (c) => frame >= c.start * fps && frame <= c.end * fps
  );

  return (
    <AbsoluteFill>
      {/* VIDEO */}
      <Video
        src={videoSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />

      {/* CAPTION */}
      {currentCaption && (
        <div style={captionStyle}>
          {currentCaption.text}
        </div>
      )}
    </AbsoluteFill>
  );
}
