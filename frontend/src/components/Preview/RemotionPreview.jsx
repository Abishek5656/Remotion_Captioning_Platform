
import { Player } from "@remotion/player";
import CaptionedVideo from "../../remotion/CaptionedVideo";

export default function RemotionPreview({
  videoSrc,
  captions = [],
  captionStyle = "bottom",
}) {


  
  if (!videoSrc) {
    return <div>No video source</div>;
  }

  return (
    <Player
      component={CaptionedVideo}
      inputProps={{
        videoSrc,
        captions,
        stylePreset: captionStyle,
      }}
      durationInFrames={30 * 150} 
      compositionWidth={1280}
      compositionHeight={720}
      fps={30}
      controls
      style={{ width: "100%" }}
    />
  );
}
