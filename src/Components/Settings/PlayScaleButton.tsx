import { useDisplay } from "../../contexts/DisplayContext";
import { PlaybackState, useAudio } from "../../contexts/AudioContext";

import "../../styles/CircularSettings.css";

export const PlayScaleButton: React.FC = () => {
  const { scalePreviewMode, keyTextMode, setScalePreviewMode } = useDisplay();
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const handleClick = () => {
    console.log("PlayScaleButton: handleClick, playbackState:", playbackState);
    if (/*scalePreviewMode &&*/ playbackState === PlaybackState.Playing) {
      console.log("PlayScaleButton: Stopping scale playback...");
      stopScalePlayback();
      //setScalePreviewMode(false);
    } else {
      console.log("Starting to play scale...");
      //setScalePreviewMode(true);
      startScalePlayback(keyTextMode);
    }
  };

  return (
    <button className="play-scale-button" onClick={handleClick}>
      {
        /*scalePreviewMode &&*/ playbackState === PlaybackState.Playing
          ? "Stop Scale"
          : "Play Scale"
      }
    </button>
  );
};
