import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export function runWhisper(audioPath, outputDir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = path.join(outputDir, "transcript.json");
    const pythonScript = path.resolve("whisper_runner.py");

    const process = spawn("python", [
      pythonScript,
      audioPath,
      outputFile,
    ]);

    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(stderr));
      }
      resolve(stdout.trim());
    });
  });
}
