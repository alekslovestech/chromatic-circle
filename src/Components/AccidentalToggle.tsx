import React from "react";
import { useNotes } from "./NotesContext";
import { getComputedColor } from "../utils/ColorUtils";
import { getAccidentalSignForDisplay } from "../types/AccidentalType";
import { getOppositeAccidental } from "../types/AccidentalType";

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
