// import ffmpeg from "fluent-ffmpeg";
// import ffmpegPath from "ffmpeg-static";

// ffmpeg.setFfmpegPath(ffmpegPath);

// export function extractAudio(videoPath, audioPath) {
//   return new Promise((resolve, reject) => {
//     ffmpeg(videoPath)
//       .noVideo()
//       .audioCodec("pcm_s16le")   // WAV format
//       .audioChannels(1)          // Mono
//       .audioFrequency(16000)     // 16kHz (STT friendly)
//       .format("wav")
//       .on("end", () => resolve(audioPath))
//       .on("error", (err) => reject(err))
//       .save(audioPath);
//   });
// }


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

