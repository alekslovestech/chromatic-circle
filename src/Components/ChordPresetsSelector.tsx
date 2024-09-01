import React, { useEffect } from "react";
import { useNotes } from "./NotesContext";
import { calculateChordNotesFromIndex, updateIndices } from "../utils/ChromaticUtils";
import { Accidental } from "../types/Accidental";
import { NoteGroupingId } from "../types/NoteGrouping";
import { InputMode } from "../types/InputMode";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";

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
    if (inputMode === InputMode.ChordPresets && selectedChordType !== NoteGroupingId.Chord_Maj) {
      setSelectedChordType(NoteGroupingId.Interval_Maj3);
    } else if (
      inputMode === InputMode.IntervalPresets &&
      selectedChordType !== NoteGroupingId.Interval_Maj3
    ) {
      setSelectedChordType(NoteGroupingId.Interval_Maj3);
    }
  }, [inputMode]);

  useEffect(() => {
    const originalIndex = selectedNoteIndices[0];
    const updatedIndices = updateIndices(
      inputMode,
      selectedChordType,
      selectedNoteIndices,
      originalIndex,
    );
    setSelectedNoteIndices(updatedIndices);
  }, [selectedChordType]);

  if (inputMode === InputMode.Toggle) return null;

  const handleChordTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const incomingChord = event.target.value as NoteGroupingId;
    setSelectedChordType(incomingChord);
    const originalRootIndex = selectedNoteIndices[0];
    const newNotes = calculateChordNotesFromIndex(originalRootIndex, incomingChord);
    setSelectedNoteIndices(newNotes);
  };

  const handleAccidentalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const incomingAccidental: Accidental = event.target.value as Accidental;
    setSelectedAccidental(incomingAccidental);
  };

  const renderInversionButtons = () => {
    const chordDefinition = ChordAndIntervalManager.getDefinitionFromId(selectedChordType);
    if (chordDefinition && chordDefinition.hasInversions()) {
      const inversionCount = chordDefinition.inversions.length;
      return (
        <div>
          <span>Inversion: </span>
          {Array.from({ length: inversionCount }, (_, i) => (
            <button key={i} onClick={() => console.log(`Inversion ${i} selected`)}>
              {i + 1}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    (inputMode === InputMode.IntervalPresets || inputMode === InputMode.ChordPresets) && (
      <div>
        <select onChange={handleChordTypeChange} value={selectedChordType}>
          {ChordAndIntervalManager.IntervalOrChordDefinitions(
            inputMode === InputMode.IntervalPresets,
          ).map((chordDef) => (
            <option key={chordDef.id} value={chordDef.id}>
              {chordDef.id}
            </option>
          ))}
        </select>
        {renderInversionButtons()}
      </div>
    )
  );
};

export default ChordPresetsSelector;
