import { useEffect } from "react";
import { CircularVisMode, InputMode } from "../../../types/SettingModes";
import { CircularVisModeButton } from "../../Buttons/CircularVisModeButton";
import { useDisplay } from "../../../contexts/DisplayContext";
import { usePreset } from "../../../contexts/PresetContext";

import "../../../styles/CircularSettings.css";

export const CircularVisModeSelect: React.FC = () => {
  const { inputMode } = usePreset();
  const { setCircularVisMode } = useDisplay();

  useEffect(() => {
    // Reset visualization mode when input mode changes
    switch (inputMode) {
      case InputMode.SingleNote:
        setCircularVisMode(CircularVisMode.None);
        break;
      case InputMode.IntervalPresets:
        setCircularVisMode(CircularVisMode.Radial);
        break;
      case InputMode.ChordPresets:
        setCircularVisMode(CircularVisMode.Polygon);
        break;
      case InputMode.Toggle:
        setCircularVisMode(CircularVisMode.Polygon);
        break;
    }
  }, [inputMode, setCircularVisMode]);

  const visList = [
    {
      mode: CircularVisMode.None,
      label: "No visualization",
    },
    {
      mode: CircularVisMode.Radial,
      label: "Radial visualization",
    },
    {
      mode: CircularVisMode.Polygon,
      label: "Polygon visualization",
    },
  ];

  return (
    <div className="vis-button-group">
      {visList.map(({ mode, label }) => (
        <CircularVisModeButton key={mode} mode={mode} label={label} />
      ))}
    </div>
  );
};
