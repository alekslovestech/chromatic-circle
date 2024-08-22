import React from "react";
import "../styles/PianoKeyboard.css";

import { useNotes } from "./NotesContext";
import {
  getNoteTextFromIndex,
  isBlackKey,
  UpdateIndices,
} from "../utils/ChromaticUtils";
import { getComputedKeyColor, getComputedTextColor } from "../utils/ColorUtils";
import { TWELVE } from "../types/NoteConstants";

const PianoKeyboard: React.FC = () => {
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    inputMode,
    selectedAccidental,
    selectedChordType,
  } = useNotes();

  const handleKeyClick = (index: number) => {
    const updatedIndices = UpdateIndices(
      inputMode,
      selectedChordType,
      selectedNoteIndices,
      index
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const keys = [];
  for (let octave = 0; octave < 2; octave++) {
    for (let chromaticIndex = 0; chromaticIndex < TWELVE; chromaticIndex++) {
      const actualIndex = octave * TWELVE + chromaticIndex;
      const isSelected = selectedNoteIndices.includes(actualIndex);
      const isBlack = isBlackKey(chromaticIndex);

      keys.push(
        <div
          key={actualIndex}
          className={`piano-key ${isBlack ? "black" : "white"}`}
          style={{
            backgroundColor: getComputedKeyColor(actualIndex, isSelected),
            color: getComputedTextColor(actualIndex),
          }}
          onClick={() => handleKeyClick(actualIndex)}
        >
          {getNoteTextFromIndex(chromaticIndex, selectedAccidental)}
        </div>
      );
    }
  }
  console.log(selectedNoteIndices);

  return (
    <div className="piano-keyboard-container">
      <div className="piano-keyboard">{keys}</div>
    </div>
  );
};

export default PianoKeyboard;
