import { useEffect } from "react";
import { CircularVisIcons } from "./CircularVisIcons";
import { CircularVisMode, InputMode } from "../../types/SettingModes";

import { useDisplay } from "../../contexts/DisplayContext";

import "../../styles/CircularSettings.css";
import { usePreset } from "../../contexts/PresetContext";

const CircularVisModeButton: React.FC<{
  mode: CircularVisMode;
  label: string;
}> = ({ mode, label }) => {
  const { circularVisMode, setCircularVisMode } = useDisplay();
  const { inputMode } = usePreset();
  const visIcons = new CircularVisIcons(12, 10);

  const isDisabled =
    (inputMode === InputMode.SingleNote &&
      (mode === CircularVisMode.Radial || mode === CircularVisMode.Polygon)) ||
    (inputMode === InputMode.IntervalPresets && mode === CircularVisMode.Polygon);

  return (
    <button
      key={mode}
      id={mode}
      className={`vis-button ${circularVisMode === mode ? "selected" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={() => !isDisabled && setCircularVisMode(mode)}
      aria-label={label}
      title={label}
      disabled={isDisabled}
    >
      <svg
        width={visIcons.circleDiameter}
        height={visIcons.circleDiameter}
        viewBox={`0 0 ${visIcons.circleDiameter} ${visIcons.circleDiameter}`}
      >
        {visIcons.render(mode)}
      </svg>
    </button>
  );
};

export const CircularVisModeSelect: React.FC = () => {
  const { inputMode } = usePreset();
  const { setCircularVisMode } = useDisplay();

  useEffect(() => {
    // Reset visualization mode when input mode changes
    if (inputMode === InputMode.SingleNote) {
      setCircularVisMode(CircularVisMode.None);
    } else if (inputMode === InputMode.IntervalPresets) {
      setCircularVisMode(CircularVisMode.Radial);
    } else if (inputMode === InputMode.ChordPresets) {
      setCircularVisMode(CircularVisMode.Polygon);
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
