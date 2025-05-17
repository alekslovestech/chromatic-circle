import { useDisplay } from "../../contexts/DisplayContext";
import { Toggle } from "../Common/Toggle";

export const ScalePreviewToggle: React.FC = () => {
  const { scalePreviewMode, setScalePreviewMode } = useDisplay();
  return (
    <Toggle
      id="scale-preview-mode"
      checked={scalePreviewMode}
      onChange={setScalePreviewMode}
      label="Scale Preview Mode"
    />
  );
};
