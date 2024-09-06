import React from "react";
import "../styles/PianoKeyboard.css";

import { useNotes } from "./NotesContext";
import {
  getBlackWhiteString,
  getComputedKeyColor,
  getComputedTextColor,
} from "../utils/ColorUtils";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { getNoteTextFromIndex } from "../utils/NoteNameUtils";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";

const PianoKeyboard: React.FC = () => {
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedInversionIndex,
    selectedAccidental,
    selectedChordType,
  } = useNotes();

  const handleKeyClick = (newRootIndex: ActualIndex) => {
    const updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
      newRootIndex,
      selectedChordType,
      selectedInversionIndex, // Assuming no inversion for piano clicks
    );

    setSelectedNoteIndices(updatedIndices);
  };

  const keys = [];
  for (let actualIndex = 0 as ActualIndex; actualIndex < 2 * TWELVE; actualIndex++) {
    const isSelected = selectedNoteIndices.includes(actualIndex);

    keys.push(
      <div
        key={actualIndex}
        className={`piano-key ${getBlackWhiteString(actualIndex)}`}
        style={{
          backgroundColor: getComputedKeyColor(actualIndex, isSelected),
          color: getComputedTextColor(actualIndex),
        }}
        onClick={() => handleKeyClick(actualIndex)}
      >
        {getNoteTextFromIndex(actualIndex, selectedAccidental)}
      </div>,
    );
  }

  return (
    <div className="piano-keyboard-container">
      <div className="piano-keyboard">{keys}</div>
    </div>
  );
};

export default PianoKeyboard;
