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

  const buttonSelect = (invisibleClass: string) => (
    <div className={`button-group ${invisibleClass}`}>
      <button
        className={`viz-button ${circularVisMode === CircularVisMode.None ? "active" : ""}`}
        onClick={() => handleDrawingModeChange(CircularVisMode.None)}
        aria-label="No visualization"
      >
        <img src="/assets/Grey/cross.svg" alt="No visualization" />
      </button>
      <button
        className={`viz-button ${circularVisMode === CircularVisMode.Radial ? "active" : ""}`}
        onClick={() => handleDrawingModeChange(CircularVisMode.Radial)}
        aria-label="Radial style visualization"
      >
        <img src="/assets/Grey/mercedes.svg" alt="Mercedes style" />
      </button>
      <button
        className={`viz-button ${circularVisMode === CircularVisMode.Polygon ? "active" : ""}`}
        onClick={() => handleDrawingModeChange(CircularVisMode.Polygon)}
        aria-label="Polygon style visualization"
      >
        <img src="/assets/Grey/triangle.svg" alt="Polygon style" />
      </button>
    </div>
  );

  const invisibleClass = selectedNoteIndices.length < 2 ? "invisible" : "";
  return buttonSelect(invisibleClass);
};

export default CircularVisModeSelect;
