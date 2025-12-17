// import fs from "fs";
// import path from "path";
// import { runWhisper } from "../utils/whisper.js";

// const AUDIO_DIR = "temp/audio";
// const TRANSCRIPT_DIR = "temp/transcripts";

// export const generateTranscript = async (req, res) => {
//   try {
//     const { videoId } = req.body;

//     if (!videoId) {
//       return res.status(400).json({ message: "videoId is required" });
//     }

//     const audioPath = path.join(AUDIO_DIR, `${videoId}.wav`);
//     const outputDir = path.join(TRANSCRIPT_DIR, videoId);

//     if (!fs.existsSync(audioPath)) {
//       return res.status(404).json({ message: "Audio file not found" });
//     }

//     const transcriptPath = await runWhisper(audioPath, outputDir);

//     console.log("transcriptPath", transcriptPath)
//     const transcript = JSON.parse(
//       fs.readFileSync(transcriptPath, "utf-8")
//     );

//     return res.status(200).json({
//       videoId,
//       language: "auto-detected",
//       segments: transcript,
//       status: "transcription_completed",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Speech-to-text failed",
//       error: error.message,
//     });
//   }
// };

//#

// import fs from "fs";
// import path from "path";
// import { runWhisper } from "../utils/whisper.js";

// const AUDIO_DIR = path.resolve("temp/audio");
// const TRANSCRIPT_DIR = path.resolve("temp/transcripts");

// export const generateTranscript = async (req, res) => {
//   try {
//     const { videoId } = req.body;

//     /* ----------------- Validation ----------------- */
//     if (!videoId) {
//       return res.status(400).json({
//         message: "videoId is required",
//       });
//     }

//     const audioPath = path.join(AUDIO_DIR, `${videoId}.wav`);
//     const outputDir = path.join(TRANSCRIPT_DIR, videoId);

//     if (!fs.existsSync(audioPath)) {
//       return res.status(404).json({
//         message: "Audio file not found",
//         audioPath,
//       });
//     }

//     /* ----------------- Run Whisper ----------------- */
//     const transcriptPath = await runWhisper(audioPath, outputDir);

//     if (!fs.existsSync(transcriptPath)) {
//       throw new Error("Transcript file not generated");
//     }

//     /* ----------------- Read Output ----------------- */
//     const transcriptRaw = fs.readFileSync(transcriptPath, "utf-8");
//     const segments = JSON.parse(transcriptRaw);

//     /* ----------------- Success Response ----------------- */
//     return res.status(200).json({
//       videoId,
//       language: "auto-detected",
//       segments,
//       segmentCount: segments.length,
//       status: "transcription_completed",
//     });

//   } catch (error) {
//     console.error("STT ERROR:", error);

//     return res.status(500).json({
//       message: "Speech-to-text failed",
//       error: error.message,
//     });
//   }
// };


import fs from "fs";
import path from "path";
import { runWhisper } from "../utils/whisper.js";

const AUDIO_DIR = path.resolve("temp/audio");
const TRANSCRIPT_DIR = path.resolve("temp/transcripts");

// export const generateTranscript = async (req, res) => {
//   try {
//     const { videoId } = req.body;

//     if (!videoId) {
//       return res.status(400).json({
//         message: "videoId is required",
//       });
//     }

//     const audioPath = path.join(AUDIO_DIR, `${videoId}.wav`);
//     const outputDir = path.join(TRANSCRIPT_DIR, videoId);

//     if (!fs.existsSync(audioPath)) {
//       return res.status(404).json({
//         message: "Audio file not found",
//         audioPath,
//       });
//     }

//     const transcriptPath = await runWhisper(audioPath, outputDir);

//     const transcript = JSON.parse(
//       fs.readFileSync(transcriptPath, "utf-8")
//     );

//     return res.status(200).json({
//       videoId,
//       language: "auto-detected (Hindi + English)",
//       segmentCount: transcript.length,
//       segments: transcript,
//       status: "transcription_completed",
//     });

//   } catch (error) {
//     console.error("STT ERROR:", error);

//     return res.status(500).json({
//       message: "Speech-to-text failed",
//       error: error.message,
//     });
//   }
// };



export const generateTranscript = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({
        message: "videoId is required",
      });
    }

    const audioPath = path.join(AUDIO_DIR, `${videoId}.wav`);
    const outputDir = path.join(TRANSCRIPT_DIR, videoId);

    if (!fs.existsSync(audioPath)) {
      return res.status(404).json({
        message: "Audio file not found",
        audioPath,
      });
    }

    // const transcriptPath = await runWhisper(audioPath, outputDir);

    console.log("Whisper started...");
    const transcriptPath = await runWhisper(audioPath, outputDir);
    console.log("Whisper finished");
    console.log("Sending response...");

    const transcript = JSON.parse(
      fs.readFileSync(transcriptPath, "utf-8")
    );

    return res.status(200).json({
      videoId,
      language: "auto-detected (Hindi + English)",
      segmentCount: transcript.length,
      segments: transcript,
      status: "transcription_completed",
    });

  } catch (error) {
    console.error("STT ERROR:", error);

    return res.status(500).json({
      message: "Speech-to-text failed",
      error: error.message,
    });
  }
};