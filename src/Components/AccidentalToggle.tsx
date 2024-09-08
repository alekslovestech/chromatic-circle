import React from "react";
import { useNotes } from "./NotesContext";
import { NotationType } from "../types/NotationType";
import { getAccidentalSign, getOppositeAccidental } from "../utils/NoteUtils";
import { getComputedColor } from "../utils/ColorUtils";
import "../styles/AccidentalToggle.css";
import { ChordDisplayMode } from "../types/ChordDisplayMode";

const getOppositeDisplayMode = (prevDisplayMode: ChordDisplayMode): ChordDisplayMode => {
  if (prevDisplayMode === ChordDisplayMode.Verbose) return ChordDisplayMode.Abbreviated;
  if (prevDisplayMode === ChordDisplayMode.Abbreviated) return ChordDisplayMode.Verbose;
  return prevDisplayMode; //no change
};

const AccidentalToggle: React.FC = () => {
  const { selectedAccidental, setSelectedAccidental, chordDisplayMode, setChordDisplayMode } =
    useNotes();

  const toggleAccidental = () => {
    setSelectedAccidental(getOppositeAccidental(selectedAccidental));
  };

  function toggleChordDisplayMode(): void {
    setChordDisplayMode(getOppositeDisplayMode(chordDisplayMode));
  }

  return (
    <div className="accidental-toggle-container">
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
      <button
        className=""
        onClick={toggleChordDisplayMode}
        style={{
          backgroundColor: getComputedColor(`--key-black`),
          color: getComputedColor(`--note-text-on-black`),
        }}
      >
        ø°Δ+
      </button>
    </div>
  );
};

export default AccidentalToggle;
