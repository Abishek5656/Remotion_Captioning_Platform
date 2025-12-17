import fs from "fs";
import path from "path";
import { normalizeCaptions } from "../utils/captionNormalizer.js";

const TRANSCRIPT_DIR = "temp/transcripts";
const CAPTIONS_DIR = "temp/captions";

if (!fs.existsSync(CAPTIONS_DIR)) {
  fs.mkdirSync(CAPTIONS_DIR, { recursive: true });
}

export const generateCaptions = (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: "videoId is required" });
    }

    const transcriptPath = path.join(
      TRANSCRIPT_DIR,
      videoId,
      "transcript.json"
    );

    if (!fs.existsSync(transcriptPath)) {
      return res.status(404).json({ message: "Transcript not found" });
    }

    const rawSegments = JSON.parse(
      fs.readFileSync(transcriptPath, "utf-8")
    );

    const captions = normalizeCaptions(rawSegments);

    const captionsPath = path.join(CAPTIONS_DIR, `${videoId}.json`);
    fs.writeFileSync(
      captionsPath,
      JSON.stringify(captions, null, 2),
      "utf-8"
    );

    return res.status(200).json({
      videoId,
      captions,
      status: "captions_normalized",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Caption normalization failed",
      error: error.message,
    });
  }
};
