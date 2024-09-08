import React from "react";
import { useNotes } from "./NotesContext";
import "../styles/ChordNameDisplay.css";
import { ActualIndex } from "../types/IndexTypes";
import { InputMode } from "../types/InputMode";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromIndex } from "../utils/NoteNameUtils";

const ChordDisplay: React.FC = () => {
  const { selectedNoteIndices, inputMode, selectedAccidental, chordDisplayMode } = useNotes();

  const topDownNotes = selectedNoteIndices
    .slice()
    .reverse()
    .map((index: ActualIndex) => getNoteTextFromIndex(index, selectedAccidental, true));

  const DetectedChordJSX = () => {
    const chordMatch = ChordAndIntervalManager.getMatchFromIndices(selectedNoteIndices);
    const noteGrouping = chordMatch?.definition.getNoteGroupingType();
    const name = chordMatch?.deriveChordName(chordDisplayMode, selectedAccidental);
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
          {ChordAndIntervalManager.getChordNameFromIndices(
            selectedNoteIndices,
            chordDisplayMode,
            selectedAccidental,
          )}
          <br />
        </div>
      )) ||
        (inputMode === InputMode.Toggle && <div className="chord-name">{DetectedChordJSX()}</div>)}

      <div className="chord-notes" style={{ display: "none" }}>
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
