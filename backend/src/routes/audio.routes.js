import express from "express";
import { extractAudioFromVideo } from "../controllers/audio.controller.js";

const router = express.Router();

router.post("/extract-audio", extractAudioFromVideo);

export default router;
