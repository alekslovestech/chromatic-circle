import { useNotes } from "../NotesContext";
import { CircularVisIcons } from "./CircularVisIcons";
import { CircularVisMode } from "../../utils/Circular/CircularVisMode";

const CircularVisModeButton: React.FC<{
  mode: CircularVisMode;
  label: string;
}> = ({ mode, label }) => {
  const { circularVisMode, selectedNoteIndices, setCircularVisMode } = useNotes();
  const visIcons = new CircularVisIcons(12, 10);

  const isDisabled =
    (selectedNoteIndices.length <= 1 && mode !== CircularVisMode.None) ||
    (selectedNoteIndices.length === 2 && mode === CircularVisMode.Polygon);

  return (
    <button
      key={mode}
      className={`viz-button ${circularVisMode === mode ? "selected" : ""} ${
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
    <div className="viz-button-group">
      {visList.map(({ mode, label }) => (
        <CircularVisModeButton key={mode} mode={mode} label={label} />
      ))}
    </div>
  );
};
