export function formatVideoDuration(duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) {
    return "00:00";
  }

  const totalSeconds = Math.round(duration);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function formatVideoFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function formatVideoResolution(width: number, height: number) {
  if (!width || !height) {
    return "Unknown";
  }

  return `${width} x ${height}`;
}
