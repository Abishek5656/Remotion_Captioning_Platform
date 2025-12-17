import express from "express";
import { generateCaptions } from "../controllers/captions.controller.js";

const router = express.Router();

router.post("/captions", generateCaptions);

export default router;
