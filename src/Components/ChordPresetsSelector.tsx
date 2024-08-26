import React, { useEffect } from "react";
import { useNotes } from "./NotesContext";
import {
  calculateChordNotesFromIndex,
  updateIndices,
} from "../utils/ChromaticUtils";
import { Accidental } from "../types/Accidental";
import { ChordType, IntervalType } from "../types/ChordConstants";
import { InputMode } from "../types/InputMode";

const ChordPresetsSelector: React.FC = () => {
  const {
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    setSelectedChordType,
    setSelectedAccidental,
  } = useNotes();

  useEffect(() => {
    if (
      inputMode === InputMode.ChordPresets &&
      selectedChordType !== ChordType.Maj
    ) {
      setSelectedChordType(ChordType.Maj);
    } else if (
      inputMode === InputMode.IntervalPresets &&
      selectedChordType !== IntervalType.Maj3
    ) {
      setSelectedChordType(IntervalType.Maj3);
    }
  }, [inputMode]);

  useEffect(() => {
    const originalIndex = selectedNoteIndices[0];
    const updatedIndices = updateIndices(
      inputMode,
      selectedChordType,
      selectedNoteIndices,
      originalIndex
    );
    setSelectedNoteIndices(updatedIndices);
  }, [selectedChordType]);

  if (inputMode === InputMode.Toggle) return null;

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
    (inputMode === InputMode.IntervalPresets ||
      inputMode === InputMode.ChordPresets) && (
      <div>
        <select onChange={handleChordTypeChange} value={selectedChordType}>
          {Object.entries(
            inputMode === InputMode.IntervalPresets ? IntervalType : ChordType
          ).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

export default ChordPresetsSelector;
