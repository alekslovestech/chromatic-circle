import { useNotes } from "../NotesContext";
import { CircularVisIcons } from "./CircularVisIcons";
import { CircularVisMode } from "./CircularVisualizationsSVG";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, selectedNoteIndices, setCircularVisMode } = useNotes();

  const handleDrawingModeChange = (mode: CircularVisMode) => {
    console.log("handleDrawingModeChange", mode);
    setCircularVisMode(mode);
  };

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

  const visIcons = new CircularVisIcons(12, 11);

  return (
    <div className={`button-group ${selectedNoteIndices.length < 2 ? "invisible" : ""}`}>
      {visList.map(({ mode, label }) => (
        <button
          key={mode}
          className={`viz-button ${circularVisMode === mode ? "selected" : ""}`}
          onClick={() => handleDrawingModeChange(mode)}
          aria-label={label}
          title={label}
        >
          <svg
            width={visIcons.circleDiameter}
            height={visIcons.circleDiameter}
            viewBox={`0 0 ${visIcons.circleDiameter} ${visIcons.circleDiameter}`}
            fillOpacity="0.4"
            xmlns="http://www.w3.org/2000/svg"
          >
            {visIcons.getCirclePoints(circularVisMode === mode ? "#ffffff" : "#000000")}
            {mode === CircularVisMode.Radial &&
              visIcons.getRadialPoints(circularVisMode === mode ? "#ffffff" : "#000000")}
            {mode === CircularVisMode.Polygon &&
              visIcons.getPolygonPoints(circularVisMode === mode ? "#ffffff" : "#000000")}
          </svg>
        </button>
      ))}
    </div>
  );
};

export default CircularVisModeSelect;
