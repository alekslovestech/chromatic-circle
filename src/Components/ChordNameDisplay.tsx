import React from "react";
import { useNotes } from "./NotesContext";
import "../styles/ChordNameDisplay.css";
import { InputMode } from "../types/InputMode";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ChordDisplayMode } from "../types/ChordDisplayMode";

const ChordNameDisplay: React.FC = () => {
  const {
    selectedNoteIndices,
    inputMode,
    selectedMusicalKey,
    chordDisplayMode,
    setChordDisplayMode,
  } = useNotes();

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

  return (
    <div className="chord-display">
      {renderNoteGrouping(inputMode)}
      {(inputMode === InputMode.Toggle || inputMode === InputMode.ChordPresets) && (
        <button className="chord-display-mode-toggle" onClick={toggleChordDisplayMode}>
          Long / Short
        </button>
      )}
    </div>
  );
};

export default ChordNameDisplay;
