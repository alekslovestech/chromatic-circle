import { useDisplay } from "../../contexts/DisplayContext";
import { usePreset } from "../../contexts/PresetContext";
import { CircularVisMode, InputMode } from "../../types/SettingModes";
import { CircularVisIcons } from "../Keyboard/Circular/CircularVisIcons";
import { Button } from "../Common/Button";

export const CircularVisModeButton: React.FC<{
  mode: CircularVisMode; //vis mode this button represents
  label: string;
}> = ({ mode, label }) => {
  const { circularVisMode, setCircularVisMode } = useDisplay(); //vis mode currently selected
  const { inputMode } = usePreset();
  const visIcons = new CircularVisIcons(12, 10);

  const isDisabled =
    (inputMode === InputMode.SingleNote &&
      (mode === CircularVisMode.Radial || mode === CircularVisMode.Polygon)) ||
    (inputMode === InputMode.IntervalPresets && mode === CircularVisMode.Polygon);

  const isSelected = circularVisMode === mode;
  return (
    <Button
      key={mode}
      id={`vis-button-${mode}`}
      size="sm"
      variant="vis"
      density="comfortable"
      selected={isSelected}
      onClick={() => !isDisabled && setCircularVisMode(mode)}
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
    </Button>
  );
};
