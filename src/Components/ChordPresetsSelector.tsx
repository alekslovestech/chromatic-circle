import React, { useEffect } from "react";
import { useNotes } from "./NotesContext";
import { updateIndices } from "../utils/ChromaticUtils";
import { NoteGroupingId } from "../types/NoteGrouping";
import { InputMode } from "../types/InputMode";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ActualIndex, InversionIndex, ixInversion } from "../types/IndexTypes";
import { IndexUtils } from "../utils/IndexUtils";

const ChordPresetsSelector: React.FC = () => {
  const {
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    setSelectedChordType,
    selectedInversionIndex,
    setSelectedInversionIndex,
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

  const UpdateNotesFromPresets = (
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex,
  ) => {
    const updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
      rootIndex,
      chordType,
      inversionIndex,
    );
    const fitChord = IndexUtils.fitChordToAbsoluteRange(updatedIndices);
    setSelectedNoteIndices(fitChord);
  };

  const handleChordTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const incomingChord = event.target.value as NoteGroupingId;
    setSelectedChordType(incomingChord);
    const originalRootIndex = selectedNoteIndices[0];
    UpdateNotesFromPresets(originalRootIndex, incomingChord, selectedInversionIndex);
  };

  const handleInversionChange = (inversionIndex: InversionIndex) => {
    const originalRootIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex,
    );
    setSelectedInversionIndex(inversionIndex);
    UpdateNotesFromPresets(originalRootIndex, selectedChordType, inversionIndex);
  };

  const renderInversionButtons = () => {
    const chordDefinition = ChordAndIntervalManager.getDefinitionFromId(selectedChordType);
    if (chordDefinition && chordDefinition.hasInversions()) {
      const inversionCount = chordDefinition.inversions.length;
      return (
        <div>
          <span>Inversion: </span>
          {Array.from({ length: inversionCount }, (_, i) => (
            <button key={i} onClick={() => handleInversionChange(ixInversion(i))}>
              {ixInversion(i)}
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
