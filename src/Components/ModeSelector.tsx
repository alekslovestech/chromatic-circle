import React from "react";
import { useNotes } from "./NotesContext";
import { InputMode } from "../types/InputMode";
import "../styles/ModeSelector.css";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ixActualArray, ixInversion } from "../types/IndexTypes";

const ModeSelector = () => {
  const {
    inputMode,
    setInputMode,
    setSelectedChordType,
    selectedNoteIndices,
    setSelectedNoteIndices,
    setSelectedInversionIndex,
  } = useNotes();

  const handleModeChange = (newMode: InputMode) => {
    setInputMode(newMode);
    setSelectedInversionIndex(ixInversion(0));
    const origNoteIndices = selectedNoteIndices;
    let newChordType;
    let newNoteIndices;

    if (newMode === InputMode.SingleNote || newMode === InputMode.Toggle) {
      newChordType = "Note";
      newNoteIndices = ixActualArray([7]); // Default to G
    } else if (newMode === InputMode.IntervalPresets) {
      newChordType = "Interval_Maj3";
      newNoteIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
        origNoteIndices[0],
        "Interval_Maj3",
      );
    } else if (newMode === InputMode.ChordPresets) {
      newChordType = "Chord_Maj";
      newNoteIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
        origNoteIndices[0],
        "Chord_Maj",
      );
    }

    setSelectedChordType(newChordType || "Note");
    setSelectedNoteIndices(newNoteIndices || []);
  };

  return (
    <div
      className="btn-group-vertical d-flex flex-column justify-content-center align-items-center"
      role="group"
      aria-label="Mode Selector"
      style={{
        minWidth: "var(--buttons-container-min-width)",
        maxWidth: "var(--buttons-max-width)",

        gap: "10px",
        margin: "0 auto",
        // padding: "20px",
      }} // Added margin for horizontal centering
    >
      {Object.values(InputMode)
        .filter((mode) => mode !== InputMode.None)
        .map((mode) => (
          <button
            key={mode}
            type="button"
            className={`btn btn-outline-primary ${inputMode === mode ? "active" : ""}`} // Changed to grey color scheme
            style={{
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }} // Vertically center text
            onClick={() => handleModeChange(mode)}
          >
            {mode}
          </button>
        ))}
    </div>
  );
};

export default ModeSelector;
