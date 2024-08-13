import React from "react";
import "../styles/PianoKeyboard.css";

import { useNotes } from "./NotesContext";
import { calculateChordNotesFromIndex, getNoteTextFromIndex, isBlackKey } from "../ChromaticUtils";
import { getKeyColorResolved } from "../utils/getComputedColor";

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
    keys.push(
      <div
        key={chromaticIndex}
        className={`piano-key ${isBlackKey(chromaticIndex) ? "black" : "white"} ${
          selectedNoteIndices.includes(chromaticIndex) ? "selected" : ""
        }`}
        style={{
          backgroundColor: getKeyColorResolved(chromaticIndex, selectedNoteIndices),
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
