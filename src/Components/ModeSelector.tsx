import React from "react";
import { useNotes } from "./NotesContext";
import { InputMode } from "../types/InputMode";
import "../styles/ModeSelector.css";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ActualIndex, ixActualArray, ixInversion } from "../types/IndexTypes";

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
    let newNoteIndices: ActualIndex[];

    switch (newMode) {
      case InputMode.SingleNote:
        newChordType = "Note";
        newNoteIndices =
          origNoteIndices.length > 0 ? ixActualArray([origNoteIndices[0]]) : ixActualArray([7]); // Default to G if no notes are selected
        break;
      case InputMode.IntervalPresets:
        newChordType = "Interval_Maj3";
        newNoteIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
          origNoteIndices[0],
          "Interval_Maj3",
        );
        break;
      case InputMode.ChordPresets:
        newChordType = "Chord_Maj";
        newNoteIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
          origNoteIndices[0],
          "Chord_Maj",
        );
        break;
      default:
        //Doing nothing when switching to Freeform mode, preserving current state
        newNoteIndices = origNoteIndices;
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
            className={`btn btn-outline-secondary ${inputMode === mode ? "active" : ""}`}
            style={{
              maxWidth: "140px",
              textAlign: "center",
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
