import { useNotes } from "./NotesContext";
import { CircularVisMode } from "./CircularVisualizations";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, setCircularVisMode } = useNotes();

  const handleDrawingModeChange = (mode: CircularVisMode) => {
    console.log("handleDrawingModeChange", mode);
    setCircularVisMode(mode);
  };

  return (
    <div className="dropdown">
      <select
        className="form-select"
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
