import { useDisplay } from "../../contexts/DisplayContext";
import { PlaybackState, useAudio } from "../../contexts/AudioContext";

import "../../styles/CircularSettings.css";

export const PlayScaleButton: React.FC = () => {
  const { scalePreviewMode, keyTextMode } = useDisplay();
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const handleClick = () => {
    if (scalePreviewMode && playbackState === PlaybackState.PlayingScale) {
      stopScalePlayback();
      //setScalePreviewMode(false);
    } else {
      //setScalePreviewMode(true);
      startScalePlayback(keyTextMode);
    }
  };

  return (
    <button className="play-scale-button" onClick={handleClick}>
      {scalePreviewMode && playbackState === PlaybackState.PlayingScale
        ? "Stop Scale"
        : "Play Scale"}
    </button>
  );
};
