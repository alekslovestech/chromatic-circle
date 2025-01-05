import { useNotes } from "../NotesContext";
import { CircularVisMode } from "./CircularVisualizationsSVG";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, selectedNoteIndices, setCircularVisMode } = useNotes();

  const handleDrawingModeChange = (mode: CircularVisMode) => {
    console.log("handleDrawingModeChange", mode);
    setCircularVisMode(mode);
  };

  const invisibleClass = selectedNoteIndices.length < 2 ? "invisible" : "";
  return (
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
};

export default CircularVisModeSelect;
