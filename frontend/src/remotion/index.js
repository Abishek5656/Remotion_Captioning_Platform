import { Composition } from "remotion";
import CaptionedVideo from "./CaptionedVideo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="CaptionedVideo"
      component={CaptionedVideo}
      fps={30}
      width={1280}
      height={720}
      durationInFrames={30 * 300}
      defaultProps={{
        videoSrc: "",
        captions: [],
        stylePreset: "bottom",
      }}
    />
  );
};
