import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath);

export function extractAudio(videoPath, audioPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioCodec("pcm_s16le")   // WAV format
      .audioChannels(1)          // Mono
      .audioFrequency(16000)     // 16kHz (STT friendly)
      .format("wav")
      .on("end", () => resolve(audioPath))
      .on("error", (err) => reject(err))
      .save(audioPath);
  });
}
