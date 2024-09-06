import React, { useEffect } from "react";
import { useNotes } from "./NotesContext";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { NoteGroupingId } from "../types/NoteGrouping";
import { InputMode } from "../types/InputMode";
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
    const updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
      originalIndex,
      selectedChordType,
      ixInversion(0),
    );
    setSelectedNoteIndices(updatedIndices);
  }, [selectedChordType]);

  if (inputMode === InputMode.Toggle) return null;

  const handleChordTypeChange = (incomingChordType: NoteGroupingId) => {
    const originalRootIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex,
    );
    setSelectedInversionIndex(ixInversion(0)); //if we're switching chord types, reset to root position
    setSelectedChordType(incomingChordType);

    //UpdateNotesFromPresets(originalRootIndex, incomingChordType, selectedInversionIndex);
    const updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
      originalRootIndex,
      incomingChordType,
      selectedInversionIndex,
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    const originalRootIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex,
    );
    setSelectedInversionIndex(newInversionIndex);
    //UpdateNotesFromPresets(originalRootIndex, selectedChordType, newInversionIndex);
    const updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
      originalRootIndex,
      selectedChordType,
      newInversionIndex,
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const renderInversionButtons = () => {
    const chordDefinition = ChordAndIntervalManager.getDefinitionFromId(selectedChordType);
    if (chordDefinition && chordDefinition.hasInversions()) {
      const inversionCount = chordDefinition.inversions.length;
      return (
        <div>
          <span>Inversion: </span>
          {Array.from({ length: inversionCount }, (_, i) => (
            <button
              key={i}
              onClick={() => handleInversionChange(ixInversion(i))}
              className={selectedInversionIndex === ixInversion(i) ? "selected-inversion" : ""}
            >
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
        <select
          value={selectedChordType}
          onChange={(e) => handleChordTypeChange(e.target.value as NoteGroupingId)}
        >
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
