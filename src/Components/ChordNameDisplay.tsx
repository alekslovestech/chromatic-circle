import React from "react";
import { useNotes } from "./NotesContext";
import "../styles/ChordNameDisplay.css";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ChordDisplayMode } from "../types/ChordDisplayMode";

const ChordNameDisplay: React.FC = () => {
  const { selectedNoteIndices, selectedMusicalKey, chordDisplayMode, setChordDisplayMode } =
    useNotes();

  const getOppositeDisplayMode = (prevDisplayMode: ChordDisplayMode): ChordDisplayMode => {
    if (prevDisplayMode === ChordDisplayMode.Letters_Short) return ChordDisplayMode.Symbols;
    if (prevDisplayMode === ChordDisplayMode.Symbols) return ChordDisplayMode.Letters_Short;
    return prevDisplayMode; //no change
  };

  function toggleChordDisplayMode(): void {
    setChordDisplayMode(getOppositeDisplayMode(chordDisplayMode));
  }

  const renderNoteGrouping = () => {
    const chordMatch = ChordAndIntervalManager.getMatchFromIndices(selectedNoteIndices);
    const noteGrouping = chordMatch?.definition.getNoteGroupingType();
    const chordName = chordMatch?.deriveChordName(chordDisplayMode, selectedMusicalKey);

    return (
      <div className="chord-name-description">
        <span>{noteGrouping?.toString()}:</span>
        <br />
        <span className="chord-name-value">{chordName || "Unknown"}</span>
      </div>
    );
  };

  return (
    <div className="chord-display">
      <div onClick={toggleChordDisplayMode}>{renderNoteGrouping()}</div>
    </div>
  );
};

export default ChordNameDisplay;
