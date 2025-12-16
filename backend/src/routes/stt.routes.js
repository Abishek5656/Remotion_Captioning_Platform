import express from "express";
import { generateTranscript } from "../controllers/stt.controller.js";

const router = express.Router();

router.post("/transcribe", generateTranscript);

export default router;
