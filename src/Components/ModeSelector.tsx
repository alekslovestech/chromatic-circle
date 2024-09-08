import React from "react";
import { useNotes } from "./NotesContext";
import { InputMode } from "../types/InputMode";
import "../styles/ModeSelector.css";

const ModeSelector = () => {
  const { inputMode, setInputMode, setSelectedChordType } = useNotes();

  const handleModeChange = (newMode: InputMode) => {
    setInputMode(newMode);
    if (newMode === InputMode.SingleNote || newMode === InputMode.Toggle) {
      setSelectedChordType("Note");
    } else if (newMode === InputMode.IntervalPresets) {
      setSelectedChordType("Interval_Maj3");
    } else if (newMode === InputMode.ChordPresets) {
      setSelectedChordType("Chord_Maj");
    }
  };

  return (
    <div className="mode-selector">
      <button
        className={inputMode === InputMode.Toggle ? "active" : ""}
        onClick={() => handleModeChange(InputMode.Toggle)}
      >
        Free-form Input
      </button>
      <button
        className={inputMode === InputMode.SingleNote ? "active" : ""}
        onClick={() => handleModeChange(InputMode.SingleNote)}
      >
        Single Notes
      </button>
      <button
        className={inputMode === InputMode.IntervalPresets ? "active" : ""}
        onClick={() => handleModeChange(InputMode.IntervalPresets)}
      >
        Interval Presets
      </button>
      <button
        className={inputMode === InputMode.ChordPresets ? "active" : ""}
        onClick={() => handleModeChange(InputMode.ChordPresets)}
      >
        Chord Presets
      </button>
    </div>
  );
};

export default ModeSelector;
