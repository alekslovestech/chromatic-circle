import React from "react";
import { useNotes } from "./NotesContext";
import { getChordName, getNoteTextFromIndex } from "../utils/ChromaticUtils";
import "../styles/ChordNameDisplay.css";
import { ActualIndex } from "../types/IndexTypes";

const ChordDisplay: React.FC = () => {
  const { selectedNoteIndices, selectedChordType, selectedAccidental } =
    useNotes();
  const topDownNotes = selectedNoteIndices
    .slice()
    .reverse()
    .map((index: ActualIndex) =>
      getNoteTextFromIndex(index, selectedAccidental, true)
    );

  return (
    <div className="chord-display">
      <div className="chord-name">
        chord:{" "}
        {selectedNoteIndices.length === 0
          ? "UNKNOWN"
          : getChordName(
              selectedNoteIndices[0],
              selectedChordType,
              selectedAccidental
            )}
      </div>
      <br />
      <div className="chord-notes">
        notes:{" "}
        {topDownNotes.map((note, index) => (
          <span key={index}>
            {<br />}
            {note}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChordDisplay;
