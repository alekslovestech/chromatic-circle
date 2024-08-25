import React from "react";
import { useNotes } from "./NotesContext";
import { NotationType } from "../types/NotationType";
import { getAccidentalSign, getOppositeAccidental } from "../utils/NoteUtils";
import { getComputedColor } from "../utils/ColorUtils";
import "../styles/AccidentalToggle.css";

const AccidentalToggle: React.FC = () => {
  const { selectedAccidental, setSelectedAccidental } = useNotes();

  const toggleAccidental = () => {
    setSelectedAccidental(getOppositeAccidental(selectedAccidental));
  };

  return (
    <button
      className="accidental-toggle"
      onClick={toggleAccidental}
      style={{
        backgroundColor: getComputedColor(`--key-black`),
        color: getComputedColor(`--note-text-on-black`),
      }}
    >
      {getAccidentalSign(selectedAccidental, NotationType.ScreenDisplay)}
    </button>
  );
};

export default AccidentalToggle;
