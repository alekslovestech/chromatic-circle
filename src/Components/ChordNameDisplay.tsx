import React from "react";
import { useNotes } from "./NotesContext";
import {
  detectChordName,
  getChordName,
  getNoteTextFromIndex,
} from "../utils/ChromaticUtils";
import "../styles/ChordNameDisplay.css";
import { ActualIndex } from "../types/IndexTypes";
import { InputMode } from "../types/InputMode";
import { Accidental } from "../types/Accidental";

const ChordDisplay: React.FC = () => {
  const {
    selectedNoteIndices,
    inputMode,
    selectedChordType,
    selectedAccidental,
  } = useNotes();

  const topDownNotes = selectedNoteIndices
    .slice()
    .reverse()
    .map((index: ActualIndex) =>
      getNoteTextFromIndex(index, selectedAccidental, true)
    );

  const DetectedChord = (
    selectedNoteIndices: ActualIndex[],
    selectedAccidental: Accidental
  ) => {
    const { noteGrouping, name } = detectChordName(
      selectedNoteIndices,
      selectedAccidental
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
            : getChordName(
                selectedNoteIndices[0],
                selectedChordType,
                selectedAccidental
              )}
          <br />
        </div>
      )) ||
        (inputMode === InputMode.Toggle && (
          <div className="chord-name">
            {DetectedChord(selectedNoteIndices, selectedAccidental)}
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
