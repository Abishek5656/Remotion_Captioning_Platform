export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    return res.status(200).json({
      videoId: req.videoId,
      fileName: req.file.filename,
      size: req.file.size,
      status: "uploaded",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Video upload failed",
      error: error.message,
    });
  }
};
