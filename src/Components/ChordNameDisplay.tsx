import React from "react";
import { useNotes } from "./NotesContext";
import "../styles/ChordNameDisplay.css";
import { ActualIndex } from "../types/IndexTypes";
import { InputMode } from "../types/InputMode";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromIndex } from "../utils/NoteUtils";

const ChordNameDisplay: React.FC = () => {
  const { selectedNoteIndices, inputMode, selectedAccidental, chordDisplayMode } = useNotes();

  const topDownNotes = selectedNoteIndices
    .slice()
    .reverse()
    .map((index: ActualIndex) => getNoteTextFromIndex(index, selectedAccidental, true));

  const renderNoteGrouping = (inputMode: InputMode) => {
    const chordMatch = ChordAndIntervalManager.getMatchFromIndices(selectedNoteIndices);
    const noteGrouping = chordMatch?.definition.getNoteGroupingType();
    const chordName = chordMatch?.deriveChordName(chordDisplayMode, selectedAccidental);
    const qualifier = inputMode === InputMode.Toggle ? "Detected" : "Selected";

    return (
      <div className="chord-name-description">
        {qualifier} {noteGrouping?.toString()}:
        <br />
        <span className="chord-name-value">{chordName || "Unknown"}</span>
      </div>
    );
  };

  const renderChordNotes = () => (
    <div className="chord-notes" style={{ display: "none" }}>
      notes:{" "}
      {topDownNotes.map((note, index) => (
        <span key={index}>
          {<br />}
          {note}
        </span>
      ))}
    </div>
  );

  return (
    <div className="chord-display" style={{ marginTop: "-10px" }}>
      {renderNoteGrouping(inputMode)}
      {renderChordNotes()}
    </div>
  );
};

export default ChordNameDisplay;
