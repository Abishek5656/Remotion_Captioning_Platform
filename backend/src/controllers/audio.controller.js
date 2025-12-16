import fs from "fs";
import path from "path";
import { extractAudio } from "../utils/ffmpeg.js";

const VIDEO_DIR = "temp/videos";
const AUDIO_DIR = "temp/audio";

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

export const extractAudioFromVideo = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: "videoId is required" });
    }

    const videoPath = path.join(VIDEO_DIR, `${videoId}.mp4`);
    const audioPath = path.join(AUDIO_DIR, `${videoId}.wav`);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: "Video file not found" });
    }

    await extractAudio(videoPath, audioPath);

    return res.status(200).json({
      videoId,
      audioFile: `${videoId}.wav`,
      format: "wav",
      channels: 1,
      sampleRate: 16000,
      status: "audio_extracted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Audio extraction failed",
      error: error.message,
    });
  }
};
