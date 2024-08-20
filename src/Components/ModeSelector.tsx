import React from "react";
import { useNotes } from "./NotesContext";
import { InputMode } from "../types/InputMode";

const ModeSelector = () => {
  const { inputMode, setInputMode } = useNotes();

  return (
    <select
      value={inputMode}
      onChange={(e) =>
        setInputMode(e.target.value as InputMode)
      }
    >
      <option value={InputMode.Toggle}>Toggle Input</option>
      <option value={InputMode.Presets}>Chord Presets</option>
    </select>
  );
};

export default ModeSelector;
