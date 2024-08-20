import React from "react";
import { useNotes } from "./NotesContext";

const ModeSelector = () => {
  const { inputMode, setInputMode } = useNotes();

  return (
    <select
      value={inputMode}
      onChange={(e) =>
        setInputMode(e.target.value as "CIRCLE_INPUT" | "CHORD_PRESETS")
      }
    >
      <option value="CIRCLE_INPUT">Circle Input</option>
      <option value="CHORD_PRESETS">Chord Presets</option>
    </select>
  );
};

export default ModeSelector;
