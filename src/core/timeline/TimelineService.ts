import type {
  TimelineAsset,
  TimelineClip,
  TimelineMoveDirection,
  TimelineState,
  TimelineTrack,
  TimelineTrackDirection,
} from "./timelineTypes";

const defaultTrackNames = ["Video 1", "Video 2", "Image 1"];
const moveStepDuration = 0.5;
const minimumClipDuration = 0.2;

export class TimelineService {
  createInitialState(): TimelineState {
    return {
      assets: [],
      tracks: defaultTrackNames.map((trackName) => ({
        id: this.createTimelineId(),
        name: trackName,
        clips: [],
      })),
      selectedClipId: null,
    };
  }

  addAsset(state: TimelineState, asset: TimelineAsset): TimelineState {
    if (state.assets.some((existingAsset) => existingAsset.id === asset.id)) {
      return state;
    }

    const targetTrack = this.findBestTrack(state.tracks, asset.kind);
    const clip = this.createClip(asset, targetTrack);
    const updatedTracks = state.tracks.map((track) => {
      if (track.id !== targetTrack.id) {
        return track;
      }

      return {
        ...track,
        clips: [...track.clips, clip],
      };
    });

    return {
      assets: [...state.assets, asset],
      tracks: updatedTracks,
      selectedClipId: clip.id,
    };
  }

  selectClip(state: TimelineState, clipId: string): TimelineState {
    return {
      ...state,
      selectedClipId: clipId,
    };
  }

  splitSelectedClip(state: TimelineState): TimelineState {
    const selectedClip = this.findSelectedClip(state);

    if (!selectedClip || selectedClip.duration <= minimumClipDuration * 2) {
      return state;
    }

    const firstClipDuration = selectedClip.duration / 2;
    const secondClipDuration = selectedClip.duration - firstClipDuration;
    const firstClip: TimelineClip = {
      ...selectedClip,
      duration: firstClipDuration,
    };
    const secondClip: TimelineClip = {
      ...selectedClip,
      id: this.createTimelineId(),
      startTime: selectedClip.startTime + firstClipDuration,
      sourceStartTime: selectedClip.sourceStartTime + firstClipDuration,
      duration: secondClipDuration,
    };

    return {
      ...state,
      tracks: state.tracks.map((track) => {
        if (track.id !== selectedClip.trackId) {
          return track;
        }

        return {
          ...track,
          clips: track.clips.flatMap((clip) => (clip.id === selectedClip.id ? [firstClip, secondClip] : [clip])),
        };
      }),
      selectedClipId: secondClip.id,
    };
  }

  moveSelectedClip(state: TimelineState, direction: TimelineMoveDirection): TimelineState {
    const selectedClip = this.findSelectedClip(state);

    if (!selectedClip) {
      return state;
    }

    const timeOffset = direction === "left" ? -moveStepDuration : moveStepDuration;

    return {
      ...state,
      tracks: state.tracks.map((track) => ({
        ...track,
        clips: track.clips.map((clip) => {
          if (clip.id !== selectedClip.id) {
            return clip;
          }

          return {
            ...clip,
            startTime: Math.max(0, clip.startTime + timeOffset),
          };
        }),
      })),
    };
  }

  moveSelectedClipToTrack(state: TimelineState, direction: TimelineTrackDirection): TimelineState {
    const selectedClip = this.findSelectedClip(state);

    if (!selectedClip) {
      return state;
    }

    const currentTrackIndex = state.tracks.findIndex((track) => track.id === selectedClip.trackId);
    const targetTrackIndex = direction === "up" ? currentTrackIndex - 1 : currentTrackIndex + 1;
    const targetTrack = state.tracks[targetTrackIndex];

    if (!targetTrack) {
      return state;
    }

    const movedClip = {
      ...selectedClip,
      trackId: targetTrack.id,
    };

    return {
      ...state,
      tracks: state.tracks.map((track) => {
        if (track.id === selectedClip.trackId) {
          return {
            ...track,
            clips: track.clips.filter((clip) => clip.id !== selectedClip.id),
          };
        }

        if (track.id === targetTrack.id) {
          return {
            ...track,
            clips: [...track.clips, movedClip],
          };
        }

        return track;
      }),
    };
  }

  private createClip(asset: TimelineAsset, targetTrack: TimelineTrack): TimelineClip {
    const trackEndTime = targetTrack.clips.reduce((endTime, clip) => Math.max(endTime, clip.startTime + clip.duration), 0);

    return {
      id: this.createTimelineId(),
      assetId: asset.id,
      kind: asset.kind,
      name: asset.name,
      trackId: targetTrack.id,
      startTime: trackEndTime,
      sourceStartTime: 0,
      duration: asset.duration,
    };
  }

  private findBestTrack(tracks: TimelineTrack[], assetKind: TimelineAsset["kind"]) {
    const preferredTrack = tracks.find((track) => track.name.toLowerCase().includes(assetKind));

    return preferredTrack ?? tracks[0];
  }

  private findSelectedClip(state: TimelineState) {
    return state.tracks.flatMap((track) => track.clips).find((clip) => clip.id === state.selectedClipId) ?? null;
  }

  private createTimelineId() {
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
