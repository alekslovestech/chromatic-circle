import React from "react";
import { useNotes } from "../NotesContext";
import { CircularVisMode } from "./CircularVisualizationsSVG";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, setCircularVisMode, selectedNoteIndices } = useNotes();
  const showVisualizationMode = selectedNoteIndices.length > 1;

  if (!showVisualizationMode) return null;

  return (
    <select
      value={circularVisMode}
      onChange={(e) => setCircularVisMode(e.target.value as CircularVisMode)}
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
