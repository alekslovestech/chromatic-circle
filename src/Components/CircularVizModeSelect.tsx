import { useNotes } from "./NotesContext";

import { CircularVisMode } from "./CircularVisualizations";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, setCircularVisMode } = useNotes();
  const handleDrawingModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleDrawingModeChange", event.target.value);
    setCircularVisMode(event.target.value as CircularVisMode);
  };
  return (
    <select
      className="drawing-mode-select"
      value={circularVisMode}
      onChange={handleDrawingModeChange}
    >
      {Object.values(CircularVisMode).map((mode) => (
        <option key={mode} value={mode}>
          {mode}
        </option>
      ))}
    </select>
  );
};

export default CircularVisModeSelect;
