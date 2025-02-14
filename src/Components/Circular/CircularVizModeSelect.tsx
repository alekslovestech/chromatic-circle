import { useNotes } from "../NotesContext";
import { CircularVisMode } from "./CircularVisualizationsSVG";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, selectedNoteIndices, setCircularVisMode } = useNotes();

  const handleDrawingModeChange = (mode: CircularVisMode) => {
    console.log("handleDrawingModeChange", mode);
    setCircularVisMode(mode);
  };

  const dropdownSelect = (invisibleClass: string) => (
    <div className={`dropdown ${invisibleClass}`}>
      <select
        id="circular-viz-mode" // Added ID for accessibility
        className="form-select"
        style={{ fontSize: "calc(0.7rem)" }} // Responsive font size
        value={circularVisMode}
        onChange={(e) => handleDrawingModeChange(e.target.value as CircularVisMode)}
        aria-label="Select Visualization Mode"
      >
        {Object.values(CircularVisMode).map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </div>
  );

  const visList = [
    {
      mode: CircularVisMode.None,
      icon: "cross.svg",
      label: "No visualization",
      alt: "No visualization",
    },
    {
      mode: CircularVisMode.Radial,
      icon: "Radial.svg",
      label: "Radial style visualization",
      alt: "Radial style",
    },
    {
      mode: CircularVisMode.Polygon,
      icon: "Polygon.svg",
      label: "Polygon style visualization",
      alt: "Polygon style",
    },
  ];

  const buttonSelect = (invisibleClass: string) => {
    const getColor = (mode: CircularVisMode) => (circularVisMode === mode ? "White" : "Grey");
    const selectedClass = (mode: CircularVisMode) => (circularVisMode === mode ? "selected" : "");
    return (
      <div className={`button-group ${invisibleClass}`}>
        {visList.map(({ mode, icon, label, alt }) => (
          <button
            key={mode}
            className={`viz-button ${selectedClass(mode)}`}
            onClick={() => handleDrawingModeChange(mode)}
            aria-label={label}
          >
            <img src={`/assets/${getColor(mode)}/${icon}`} alt={alt} />
          </button>
        ))}
      </div>
    );
  };

  const invisibleClass = selectedNoteIndices.length < 2 ? "invisible" : "";
  return buttonSelect(invisibleClass);
};

export default CircularVisModeSelect;
