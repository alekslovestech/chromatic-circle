import { useDisplay } from "../../../src/contexts/DisplayContext";

import "../../styles/CircularSettings.css";

export const MonochromeModeToggle: React.FC = () => {
  const { monochromeMode, setMonochromeMode } = useDisplay();
  return (
    <div className="monochrome-mode-container">
      <input
        type="checkbox"
        id="monochrome-mode"
        checked={monochromeMode}
        onChange={() => setMonochromeMode(!monochromeMode)}
      />
      <label htmlFor="monochrome-mode" className="monochrome-mode-label">
        Uniform Keys Mode
      </label>
    </div>
  );
};
