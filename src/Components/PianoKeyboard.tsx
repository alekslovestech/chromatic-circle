import React from "react";
import "../styles/PianoKeyboard.css";

import { useNotes } from "./NotesContext";
import { calculateChordNotesFromIndex, getNoteTextFromIndex, isBlackKey } from "../utils/ChromaticUtils";
import { getComputedKeyColor, getComputedTextColor} from "../utils/ColorUtils";

const PianoKeyboard: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices, inputMode, selectedAccidental, selectedChordType } = useNotes();

  const handleKeyClick = (index: number) => {
    let updatedIndices: number[] = [];
    if (inputMode === "CIRCLE_INPUT") {
      updatedIndices = selectedNoteIndices.includes(index)
        ? selectedNoteIndices.filter((i) => i !== index)
        : [...selectedNoteIndices, index];
      setSelectedNoteIndices(updatedIndices);
    }
    else if (inputMode === "CHORD_PRESETS") {
      updatedIndices = calculateChordNotesFromIndex(
        index,
        selectedChordType
      );
    }
    setSelectedNoteIndices(updatedIndices);
  };

  const keys = [];
  for (let chromaticIndex = 0; chromaticIndex < 12; chromaticIndex++) {
    const isSelected = selectedNoteIndices.includes(chromaticIndex);
    const isBlack = isBlackKey(chromaticIndex);

    keys.push(
      <div
        key={chromaticIndex}
        className={`piano-key ${isBlack ? "black" : "white"}`}
        style={{
          backgroundColor: getComputedKeyColor(chromaticIndex, isSelected),
          color: getComputedTextColor(chromaticIndex)
        }}        
        onClick={() => handleKeyClick(chromaticIndex)}
      >
        {getNoteTextFromIndex(chromaticIndex, selectedAccidental)}
      </div>
    );
  }

  return (
     <div className="piano-keyboard">
      {keys}
    </div>)
};

export default PianoKeyboard;
