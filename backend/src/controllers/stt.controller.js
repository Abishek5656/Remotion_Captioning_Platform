import fs from "fs";
import path from "path";
import { runWhisper } from "../utils/whisper.js";

const AUDIO_DIR = "temp/audio";
const TRANSCRIPT_DIR = "temp/transcripts";

export const generateTranscript = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: "videoId is required" });
    }

    const audioPath = path.join(AUDIO_DIR, `${videoId}.wav`);
    const outputDir = path.join(TRANSCRIPT_DIR, videoId);

    if (!fs.existsSync(audioPath)) {
      return res.status(404).json({ message: "Audio file not found" });
    }

    const transcriptPath = await runWhisper(audioPath, outputDir);

    console.log("transcriptPath", transcriptPath)
    const transcript = JSON.parse(
      fs.readFileSync(transcriptPath, "utf-8")
    );

    return res.status(200).json({
      videoId,
      language: "auto-detected",
      segments: transcript,
      status: "transcription_completed",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Speech-to-text failed",
      error: error.message,
    });
  }
};
