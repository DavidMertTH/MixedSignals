import { acceptedVideoMimeTypes, maximumVideoFileSize } from "./videoImportConfig";
import type { ImportedVideoFile, VideoMetadata } from "./videoImportTypes";

export class VideoImportService {
  async importFile(file: File): Promise<ImportedVideoFile> {
    this.validateFile(file);

    const objectUrl = URL.createObjectURL(file);

    try {
      const metadata = await this.loadVideoMetadata(objectUrl);

      return {
        id: this.createVideoId(),
        name: file.name,
        size: file.size,
        mimeType: file.type || "video/unknown",
        duration: metadata.duration,
        width: metadata.width,
        height: metadata.height,
        objectUrl,
        importedAt: new Date(),
      };
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      throw error;
    }
  }

  releaseVideo(video: ImportedVideoFile | null) {
    if (!video) {
      return;
    }

    URL.revokeObjectURL(video.objectUrl);
  }

  private validateFile(file: File) {
    if (!file.type.startsWith("video/")) {
      throw new Error("Please import a video file.");
    }

    if (file.type && !acceptedVideoMimeTypes.includes(file.type)) {
      throw new Error("Supported formats are MP4, MOV, and WebM.");
    }

    if (file.size > maximumVideoFileSize) {
      throw new Error("The file is larger than 1 GB.");
    }
  }

  private loadVideoMetadata(objectUrl: string): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement("video");

      videoElement.preload = "metadata";
      videoElement.muted = true;
      videoElement.src = objectUrl;

      videoElement.onloadedmetadata = () => {
        resolve({
          duration: videoElement.duration,
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
        });
      };

      videoElement.onerror = () => reject(new Error("Video metadata could not be read."));
    });
  }

  private createVideoId() {
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
