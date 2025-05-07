import React from "react";
import { useDisplay } from "../../contexts/DisplayContext";

import "../../styles/CircularSettings.css";

export const ScalePreviewToggle: React.FC = () => {
  const { scalePreviewMode, setScalePreviewMode } = useDisplay();
  return (
    <div className="scale-preview-container">
      <input
        type="checkbox"
        id="scale-preview-mode"
        checked={scalePreviewMode}
        onChange={() => setScalePreviewMode(!scalePreviewMode)}
      />
      <label htmlFor="scale-preview-mode" className="scale-preview-label">
        Scale Preview Mode
      </label>
    </div>
  );
};
