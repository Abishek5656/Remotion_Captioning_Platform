import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pythonScript = path.resolve(__dirname, "../../whisper_runner.py");

console.log("pythonScript---->",pythonScript)

const PYTHON_PATH =
  "C:/Users/shilp/AppData/Local/Programs/Python/Python310/python.exe";

  const PYTHON_CMD = process.env.PYTHON_CMD || "python3";

export function runWhisper(audioPath, outputDir) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, "transcript.json");
    const pythonScript = path.resolve("whisper_runner.py");

    const PYTHON_SCRIPT = path.resolve(
  __dirname,
  "../../whisper_runner.py"
);

    const child = spawn(PYTHON_CMD, [
      pythonScript,
      audioPath,
      outputFile,
    ]);

    let stderr = "";
    let stdout = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString().trim();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(stderr || "Whisper process failed")
        );
      }

      if (!fs.existsSync(outputFile)) {
        return reject(
          new Error("Transcript file not generated")
        );
      }

      resolve(outputFile);
    });
  });
}
