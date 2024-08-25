import React from "react";
import { useNotes } from "./NotesContext";
import { InputMode } from "../types/InputMode";
import { ChordType, IntervalType } from "../types/ChordConstants";

const ModeSelector = () => {
  const { inputMode, setInputMode, setSelectedChordType } = useNotes();

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as InputMode;
    setInputMode(newMode);

    // Set default preset based on the new mode
    if (newMode === InputMode.ChordPresets) {
      setSelectedChordType(ChordType.Maj);
    } else if (newMode === InputMode.IntervalPresets) {
      setSelectedChordType(IntervalType.Maj3);
    }
  };

  return (
    <select value={inputMode} onChange={handleModeChange}>
      <option value={InputMode.Toggle}>Toggle Input</option>
      <option value={InputMode.IntervalPresets}>Interval Presets</option>
      <option value={InputMode.ChordPresets}>Chord Presets</option>
    </select>
  );
};

export default ModeSelector;
