import React from "react";
import { useNotes } from "./NotesContext";
import { getChordNameFromPreset } from "../utils/ChromaticUtils";
import "../styles/ChordNameDisplay.css";
import { ActualIndex } from "../types/IndexTypes";
import { InputMode } from "../types/InputMode";
import { Accidental } from "../types/Accidental";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromIndex } from "../utils/NoteNameUtils";

const ChordDisplay: React.FC = () => {
  const { selectedNoteIndices, inputMode, selectedChordType, selectedAccidental } = useNotes();

  const topDownNotes = selectedNoteIndices
    .slice()
    .reverse()
    .map((index: ActualIndex) => getNoteTextFromIndex(index, selectedAccidental, true));

  const DetectedChordJSX = (selectedNoteIndices: ActualIndex[], selectedAccidental: Accidental) => {
    const { noteGrouping, name } = ChordAndIntervalManager.getChordName(
      selectedNoteIndices,
      selectedAccidental,
    );
    return (
      <>
        Detected {noteGrouping}:
        <br />
        {name}
        <br />
      </>
    );
  };

  return (
    <div className="chord-display">
      {(inputMode === InputMode.ChordPresets && (
        <div className="chord-name">
          Chord:{" "}
          {selectedNoteIndices.length === 0
            ? "UNKNOWN"
            : getChordNameFromPreset(selectedNoteIndices[0], selectedChordType, selectedAccidental)}
          <br />
        </div>
      )) ||
        (inputMode === InputMode.Toggle && (
          <div className="chord-name">
            {DetectedChordJSX(selectedNoteIndices, selectedAccidental)}
          </div>
        ))}

      <div className="chord-notes">
        notes:{" "}
        {topDownNotes.map((note, index) => (
          <span key={index}>
            {<br />}
            {note}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChordDisplay;
