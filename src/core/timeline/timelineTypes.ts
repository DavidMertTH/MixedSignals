export type TimelineAssetKind = "video" | "image";

export type TimelineAsset = {
  id: string;
  kind: TimelineAssetKind;
  name: string;
  duration: number;
};

export type TimelineClip = {
  id: string;
  assetId: string;
  kind: TimelineAssetKind;
  name: string;
  trackId: string;
  startTime: number;
  sourceStartTime: number;
  duration: number;
};

export type TimelineTrack = {
  id: string;
  name: string;
  clips: TimelineClip[];
};

export type TimelineState = {
  assets: TimelineAsset[];
  tracks: TimelineTrack[];
  selectedClipId: string | null;
};

export type TimelineMoveDirection = "left" | "right";

export type TimelineTrackDirection = "up" | "down";
