
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

 ffmpeg.setFfmpegPath(ffmpegPath);
 
export function extractAudio(videoPath, audioPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions([
        "-map 0:a:0",
        "-ac 1",
        "-ar 16000",
        "-af volume=2.0",
      ])
      .save(audioPath)
      .on("end", resolve)
      .on("error", reject);
  });
}

