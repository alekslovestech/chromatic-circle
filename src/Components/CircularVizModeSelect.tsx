import { useNotes } from "./NotesContext";

import { CircularVisMode } from "./CircularVisualizations";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, setCircularVisMode } = useNotes();
  const handleDrawingModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleDrawingModeChange", event.target.value);
    setCircularVisMode(event.target.value as CircularVisMode);
  };
  return (
    <div className="form-group">
      <select
        id="drawingModeSelect"
        className="form-control"
        style={{ fontSize: "0.7rem" }} // Smaller font size
        value={circularVisMode}
        onChange={handleDrawingModeChange}
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
