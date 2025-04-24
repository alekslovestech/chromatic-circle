import { useDisplay } from "../../contexts/DisplayContext";
import { useAudio } from "../../contexts/AudioContext";

import "../../styles/CircularSettings.css";

export const PlayScaleButton: React.FC = () => {
  const { scalePreviewMode, setScalePreviewMode, keyTextMode } = useDisplay();
  const { isPlaying, startPreview, stopPreview } = useAudio();

  const handleClick = () => {
    if (scalePreviewMode && isPlaying) {
      stopPreview();
      setScalePreviewMode(false);
    } else {
      setScalePreviewMode(true);
      startPreview(keyTextMode);
    }
  };

  return (
    <button className="play-scale-button" onClick={handleClick}>
      {scalePreviewMode && isPlaying ? "Stop Scale" : "Play Scale"}
    </button>
  );
};
