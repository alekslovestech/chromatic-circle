import { useDisplay } from "../../contexts/DisplayContext";
import { Toggle } from "../Common/Toggle";

export const MonochromeModeToggle: React.FC = () => {
  const { monochromeMode, setMonochromeMode } = useDisplay();
  return (
    <Toggle
      id="monochrome-mode"
      checked={monochromeMode}
      onChange={setMonochromeMode}
      label="Uniform Keys Mode"
    />
  );
};
