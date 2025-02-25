import { useNotes } from "../NotesContext";
import { CircularVisIcons } from "./CircularVisIcons";
import { CircularVisMode } from "../../utils/Circular/CircularVisMode";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, selectedNoteIndices, setCircularVisMode } = useNotes();

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

  const visIcons = new CircularVisIcons(12, 10);

  return (
    <div className={`button-group ${selectedNoteIndices.length < 2 ? "invisible" : ""}`}>
      {visList.map(({ mode, label }) => (
        <button
          key={mode}
          className={`viz-button ${circularVisMode === mode ? "selected" : ""}`}
          onClick={() => setCircularVisMode(mode)}
          aria-label={label}
          title={label}
          style={{ zIndex: 10 }}
        >
          <svg
            width={visIcons.circleDiameter}
            height={visIcons.circleDiameter}
            viewBox={`0 0 ${visIcons.circleDiameter} ${visIcons.circleDiameter}`}
            fillOpacity="0.4"
          >
            {visIcons.render(mode)}
          </svg>
        </button>
      ))}
    </div>
  );
};

export default CircularVisModeSelect;
