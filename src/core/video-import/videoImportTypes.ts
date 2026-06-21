export type VideoImportStatus = "empty" | "loading" | "ready" | "error";

export type ImportedVideoFile = {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  duration: number;
  width: number;
  height: number;
  objectUrl: string;
  importedAt: Date;
};

export type VideoImportState = {
  status: VideoImportStatus;
  video: ImportedVideoFile | null;
  error: string | null;
};

export type VideoMetadata = {
  duration: number;
  width: number;
  height: number;
};
