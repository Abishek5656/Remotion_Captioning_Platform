import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadVideo } from "../controllers/upload.controller.js";
import { generateVideoId } from "../utils/videoId.js";

const router = express.Router();

router.post(
  "/upload",
  (req, res, next) => {
    req.videoId = generateVideoId();
    next();
  },
  upload.single("video"),
  uploadVideo
);

export default router;
