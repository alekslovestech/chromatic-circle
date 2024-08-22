import React from "react";
import { useNotes } from "./NotesContext";
import { getChordName, getNoteTextFromIndex } from "../utils/ChromaticUtils";
import "../styles/ChordNameDisplay.css";

const ChordDisplay: React.FC = () => {
  const { selectedNoteIndices, selectedChordType, selectedAccidental } =
    useNotes();

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
        {selectedNoteIndices
          .map((index) => getNoteTextFromIndex(index, selectedAccidental, true))
          .join("-")}
      </div>
    </div>
  );
};

export default ChordDisplay;
