import React from "react";
import { useNotes } from "./NotesContext";
import { calculateChordNotesFromIndex } from "../utils/ChromaticUtils";
import { Accidental } from "../types/Accidental";
import { CHORD_TYPES } from "../types/ChordConstants";

const ChordPresetsSelector: React.FC = () => {
  const {
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    setSelectedChordType,
    setSelectedAccidental,
  } = useNotes();

  if (inputMode !== "CHORD_PRESETS") return null;

  const handleChordTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const incomingChord = event.target.value;
    setSelectedChordType(incomingChord);
    const originalRootIndex = selectedNoteIndices[0];
    const newNotes = calculateChordNotesFromIndex(
      originalRootIndex,
      incomingChord
    );
    setSelectedNoteIndices(newNotes);
  };

  const handleAccidentalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const incomingAccidental: Accidental = event.target.value as Accidental;
    setSelectedAccidental(incomingAccidental);
  };

  return (
    <div>
      <select onChange={handleChordTypeChange} value={selectedChordType}>
        {CHORD_TYPES.map((chord) => (
          <option key={chord} value={chord}>
            {chord}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChordPresetsSelector;
