import React from "react";
import { useNotes } from "./NotesContext";
import { NotationType } from "../types/NotationType";
import { getAccidentalSign, getOppositeAccidental } from "../utils/NoteUtils";
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
      {getAccidentalSign(selectedAccidental, NotationType.ScreenDisplay)}
    </button>
  );
};

export default AccidentalToggle;
