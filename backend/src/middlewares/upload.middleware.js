import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = "temp/videos";

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const videoId = req.videoId;
    cb(null, `${videoId}.mp4`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "video/mp4") {
    return cb(new Error("Only MP4 videos are allowed"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});
