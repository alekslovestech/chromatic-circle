import React from "react";
import { useNotes } from "./NotesContext";
import "../styles/ChordNameDisplay.css";
import { ActualIndex } from "../types/IndexTypes";
import { InputMode } from "../types/InputMode";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { ChordDisplayMode } from "../types/ChordDisplayMode";

const ChordNameDisplay: React.FC = () => {
  const {
    selectedNoteIndices,
    inputMode,
    selectedMusicalKey,
    chordDisplayMode,
    setChordDisplayMode,
  } = useNotes();

  const topDownNotes = selectedNoteIndices
    .slice()
    .reverse()
    .map((index: ActualIndex) =>
      getNoteTextFromIndex(index, selectedMusicalKey.getDefaultAccidental(), true),
    );

  const getOppositeDisplayMode = (prevDisplayMode: ChordDisplayMode): ChordDisplayMode => {
    if (prevDisplayMode === ChordDisplayMode.Letters_Short) return ChordDisplayMode.Symbols;
    if (prevDisplayMode === ChordDisplayMode.Symbols) return ChordDisplayMode.Letters_Short;
    return prevDisplayMode; //no change
  };

  function toggleChordDisplayMode(): void {
    setChordDisplayMode(getOppositeDisplayMode(chordDisplayMode));
  }

  const renderNoteGrouping = (inputMode: InputMode) => {
    const chordMatch = ChordAndIntervalManager.getMatchFromIndices(selectedNoteIndices);
    const noteGrouping = chordMatch?.definition.getNoteGroupingType();
    const chordName = chordMatch?.deriveChordName(chordDisplayMode, selectedMusicalKey);
    const qualifier = inputMode === InputMode.Toggle ? "Detected" : "Selected";

    return (
      <div className="chord-name-description">
        <span>
          {qualifier} {noteGrouping?.toString()}:
        </span>
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
    <div className="chord-display">
      {renderNoteGrouping(inputMode)}
      {renderChordNotes()}
      {(inputMode === InputMode.Toggle || inputMode === InputMode.ChordPresets) && (
        <button className="chord-display-mode-toggle" onClick={toggleChordDisplayMode}>
          Long / Short
        </button>
      )}
    </div>
  );
};

export default ChordNameDisplay;
