import React, { useEffect } from "react";
import { useNotes } from "./NotesContext";
import {
  calculateChordNotesFromIndex,
  updateIndices,
} from "../utils/ChromaticUtils";
import { Accidental } from "../types/Accidental";
import {
  CHORD_AND_INTERVAL_OFFSETS,
  ChordAndIntervalType,
} from "../types/ChordConstants";
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
      selectedChordType !== ChordAndIntervalType.Chord_Maj
    ) {
      setSelectedChordType(ChordAndIntervalType.Interval_Maj3);
    } else if (
      inputMode === InputMode.IntervalPresets &&
      selectedChordType !== ChordAndIntervalType.Interval_Maj3
    ) {
      setSelectedChordType(ChordAndIntervalType.Interval_Maj3);
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
    const incomingChord = event.target.value as unknown as ChordAndIntervalType;
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
          {Object.entries(ChordAndIntervalType)
            .filter(([key]) =>
              inputMode === InputMode.IntervalPresets
                ? key.startsWith("Interval_")
                : key.startsWith("Chord_")
            )
            .map(([key, value]) => (
              <option key={key} value={value}>
                {CHORD_AND_INTERVAL_OFFSETS[value as ChordAndIntervalType].name}
              </option>
            ))}
        </select>
      </div>
    )
  );
};

export default ChordPresetsSelector;
