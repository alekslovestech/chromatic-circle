import React from "react";
import "../styles/PianoKeyboard.css";

import { useNotes } from "./NotesContext";
import {
  getNoteTextFromIndex,
  isBlackKey,
  updateIndices,
} from "../utils/ChromaticUtils";
import {
  getBlackWhiteString,
  getComputedKeyColor,
  getComputedTextColor,
} from "../utils/ColorUtils";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";

const PianoKeyboard: React.FC = () => {
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    inputMode,
    selectedAccidental,
    selectedChordType,
  } = useNotes();

  const handleKeyClick = (index: number) => {
    const updatedIndices = updateIndices(
      inputMode,
      selectedChordType,
      selectedNoteIndices,
      index as ActualIndex
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const keys = [];
  for (
    let actualIndex = 0 as ActualIndex;
    actualIndex < 2 * TWELVE;
    actualIndex++
  ) {
    const isSelected = selectedNoteIndices.includes(actualIndex);
    const isBlack = isBlackKey(actualIndex);

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
      </div>
    );
  }

  return (
    <div className="piano-keyboard-container">
      <div className="piano-keyboard">{keys}</div>
    </div>
  );
};

export default PianoKeyboard;
