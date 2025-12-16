const MAX_SIZE_MB = 100;

export function validateVideoFile(file) {
  if (!file) return "No file selected";

  if (file.type !== "video/mp4") {
    return "Only MP4 videos are allowed";
  }

  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB > MAX_SIZE_MB) {
    return `File size must be under ${MAX_SIZE_MB}MB`;
  }

  return null;
}
