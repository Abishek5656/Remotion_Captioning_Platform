// import { spawn } from "child_process";
// import fs from "fs";
// import path from "path";

// export function runWhisper(audioPath, outputDir) {
//   return new Promise((resolve, reject) => {
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }


//     console.log("audioPath",audioPath)
//     console.log("outputDir",outputDir)


//     const outputFile = path.join(outputDir, "transcript.json");
//     const pythonScript = path.resolve("whisper_runner.py");

//     const process = spawn("python", [
//       pythonScript,
//       audioPath,
//       outputFile,
//     ]);

//     let stderr = "";

//     process.stderr.on("data", (data) => {
//       stderr += data.toString();
//     });


//     console.log("stderr",stderr)

//     process.on("close", (code) => {
//       if (code !== 0) {
//         return reject(new Error(stderr || "Whisper process failed"));
//       }

//       // ✅ Always resolve the known output file
//       resolve(outputFile);
//     });
//   });
// }


//#

// import { spawn } from "child_process";
// import fs from "fs";
// import path from "path";

// export function runWhisper(audioPath, outputDir) {
//   return new Promise((resolve, reject) => {
//     fs.mkdirSync(outputDir, { recursive: true });

//     const outputFile = path.join(outputDir, "transcript.json");
//     const pythonScript = path.resolve("whisper_runner.py");

//     const process = spawn("python", [
//       pythonScript,
//       audioPath,
//       outputFile,
//     ]);

//     let stderr = "";

//     process.stderr.on("data", (data) => {
//       stderr += data.toString();
//     });

//     process.on("close", (code) => {
//       if (code !== 0) {
//         return reject(new Error(stderr || "Whisper process failed"));
//       }

//       if (!fs.existsSync(outputFile)) {
//         return reject(new Error("Transcript file not created"));
//       }

//       resolve(outputFile);
//     });
//   });
// }



// import { spawn } from "child_process";
// import fs from "fs";
// import path from "path";

// const PYTHON_PATH =
//   "C:/Users/shilp/AppData/Local/Programs/Python/Python310/python.exe";

// export function runWhisper(audioPath, outputDir) {
//   return new Promise((resolve, reject) => {
//     fs.mkdirSync(outputDir, { recursive: true });

//     const outputFile = path.join(outputDir, "transcript.json");
//     const pythonScript = path.resolve("whisper_runner.py");

//     const process = spawn(PYTHON_PATH, [
//       pythonScript,
//       audioPath,
//       outputFile,
//     ]);

//     let stderr = "";

//     process.stderr.on("data", (data) => {
//       stderr += data.toString();
//     });

//     process.on("close", (code) => {
//       if (code !== 0) {
//         return reject(new Error(stderr || "Whisper process failed"));
//       }

//       if (!fs.existsSync(outputFile)) {
//         return reject(new Error("Transcript file not generated"));
//       }

//       resolve(outputFile);
//     });
//   });
// }



import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PYTHON_PATH =
  "C:/Users/shilp/AppData/Local/Programs/Python/Python310/python.exe";

export function runWhisper(audioPath, outputDir) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, "transcript.json");
    const pythonScript = path.resolve("whisper_runner.py");

    const child = spawn(PYTHON_PATH, [
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
