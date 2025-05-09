import React from "react";
import { useDisplay } from "../../contexts/DisplayContext";
import { PlaybackState, useAudio } from "../../contexts/AudioContext";

export const PlayScaleButton: React.FC = () => {
  const { keyTextMode } = useDisplay();
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const handleClick = () => {
    if (playbackState === PlaybackState.ScalePlaying) {
      console.log("PlayScaleButton: Stopping scale playback...");
      stopScalePlayback();
    } else {
      startScalePlayback(keyTextMode);
    }
  };

  return (
    <button className="play-scale-button" onClick={handleClick}>
      {playbackState === PlaybackState.ScalePlaying ? "Stop Scale" : "Play Scale"}
    </button>
  );
};
