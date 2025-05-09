"use client";

import React from "react";
import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";
import { ChordDisplayMode } from "../types/SettingModes";
import { ChordUtils } from "../utils/ChordUtils";

export const ChordNameDisplay: React.FC = () => {
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { chordDisplayMode, setChordDisplayMode } = useDisplay();

  const getOppositeDisplayMode = (prevDisplayMode: ChordDisplayMode): ChordDisplayMode => {
    if (prevDisplayMode === ChordDisplayMode.Letters_Short) return ChordDisplayMode.Symbols;
    if (prevDisplayMode === ChordDisplayMode.Symbols) return ChordDisplayMode.Letters_Short;
    return prevDisplayMode; //no change
  };

  function toggleChordDisplayMode(): void {
    setChordDisplayMode(getOppositeDisplayMode(chordDisplayMode));
  }

  const renderNoteGrouping = () => {
    const { noteGroupingString, chordName } = ChordUtils.getDisplayInfoFromIndices(
      selectedNoteIndices,
      chordDisplayMode,
      selectedMusicalKey,
    );
    return (
      <div className="chord-name-description">
        <span>{`${noteGroupingString}: `}</span>
        <span className="chord-name-value">{chordName}</span>
      </div>
    );
  };

  return (
    <div className="chord-display">
      <div onClick={toggleChordDisplayMode}>{renderNoteGrouping()}</div>
    </div>
  );
};
