import React from "react";
import { useNotes } from "./NotesContext";
import { getAccidentalSignForDisplay, getOppositeAccidental } from "../utils/NoteUtils";
import { getComputedColor } from "../utils/ColorUtils";

const AccidentalToggle: React.FC = () => {
  const { selectedAccidental, setSelectedAccidental } = useNotes();

  const toggleAccidental = () => {
    setSelectedAccidental(getOppositeAccidental(selectedAccidental));
  };

  return (
    <button
      className="btn btn-dark"
      onClick={toggleAccidental}
      style={{
        backgroundColor: getComputedColor(`--key-black`),
        color: getComputedColor(`--serenity-note-text-on-black`),
        width: "40px", // Fixed width to 40px
      }}
    >
      {getAccidentalSignForDisplay(selectedAccidental)}
    </button>
  );
};

export default AccidentalToggle;
