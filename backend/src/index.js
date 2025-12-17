import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import uploadRoutes from "./routes/upload.routes.js";
import audioRoutes from "./routes/audio.routes.js";
import sttRoutes from "./routes/stt.routes.js";
import captionsRoutes from "./routes/captions.routes.js";

dotenv.config();

const app = express();

/* ------------------ Resolve __dirname (ESM safe) ------------------ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ------------------ Middleware ------------------ */
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.setTimeout(0);
  res.setTimeout(0);
  next();
});

/* ------------------ Static video serving ------------------ */
const videosPath = path.join(__dirname, "../temp/videos");

console.log("Serving videos from:", videosPath);

app.use("/temp/videos", cors(), express.static(videosPath));

/* ------------------ API routes ------------------ */
app.use("/api", uploadRoutes);
app.use("/api", audioRoutes);
app.use("/api", sttRoutes);
app.use("/api", captionsRoutes);

/* ------------------ Server ------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
