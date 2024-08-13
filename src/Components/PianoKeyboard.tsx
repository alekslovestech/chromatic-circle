import React from "react";
import { useNotes } from "./NotesContext";
import { getNoteTextFromIndex, isBlackKey } from "../ChromaticUtils";
import "../styles/PianoKeyboard.css";
import { getKeyColorResolved } from "../utils/getComputedColor";

const PianoKeyboard: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices, inputMode, selectedAccidental } = useNotes();

  const handleKeyClick = (index: number) => {
    if (inputMode === "CIRCLE_INPUT") {
      const updatedIndices = selectedNoteIndices.includes(index)
        ? selectedNoteIndices.filter((i) => i !== index)
        : [...selectedNoteIndices, index];
      setSelectedNoteIndices(updatedIndices);
    }
    // Handle CHORD_PRESETS mode if needed
  };

  const keys = [];
  for (let index = 0; index < 12; index++) {
    keys.push(
      <div
        key={index}
        className={`piano-key ${isBlackKey(index) ? "black" : "white"} ${
          selectedNoteIndices.includes(index) ? "selected" : ""
        }`}
        style={{
          backgroundColor: getKeyColorResolved(index, selectedNoteIndices),
        }}
        onClick={() => handleKeyClick(index)}
      >
        {getNoteTextFromIndex(index, selectedAccidental)}
      </div>
    );
  }

  return (
     <div className="piano-keyboard">
      {keys}
    </div>)
};

export default PianoKeyboard;
