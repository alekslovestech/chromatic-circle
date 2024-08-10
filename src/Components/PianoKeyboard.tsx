import React from "react";
import { useNotes } from "./NotesContext";
import { NOTE_NAMES } from "../NoteConstants";
import { isBlackKey } from "../ChromaticUtils";
import "../styles/PianoKeyboard.css";
import { getKeyColorResolved } from "../utils/getComputedColor";

const PianoKeyboard: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices, inputMode } = useNotes();

  const handleKeyClick = (index: number) => {
    if (inputMode === "CIRCLE_INPUT") {
      const updatedIndices = selectedNoteIndices.includes(index)
        ? selectedNoteIndices.filter((i) => i !== index)
        : [...selectedNoteIndices, index];
      setSelectedNoteIndices(updatedIndices);
    }
    // Handle CHORD_PRESETS mode if needed
  };

  return (
    <div className="piano-keyboard">
      {NOTE_NAMES.map((note, index) => (
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
          {isBlackKey(index) ? <span>{note}</span> : note}
        </div>
      ))}
    </div>
  );
};

export default PianoKeyboard;
