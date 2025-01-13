import React from "react";
import { useNotes } from "../NotesContext";
import { InputMode } from "../../types/InputMode";
import { InversionIndex, ixInversion } from "../../types/IndexTypes";
import { ChordDisplayMode } from "../../types/ChordDisplayMode";
import { IndexUtils } from "../../utils/IndexUtils";
import { ChordAndIntervalManager } from "../../utils/ChordAndIntervalManager";
import { NoteGroupingId } from "../../types/NoteGroupingTypes";
import { NoteGroupingLibrary } from "../../types/NoteGroupingLibrary";
import "../../styles/PresetsSelector.css";

const PresetsSelector: React.FC = () => {
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    setSelectedChordType,
    selectedInversionIndex,
    setSelectedInversionIndex,
    inputMode,
  } = useNotes();

  if (inputMode !== InputMode.ChordPresets && inputMode !== InputMode.IntervalPresets) return null;

  const handlePresetChange = (newPresetId: NoteGroupingId) => {
    setSelectedChordType(newPresetId);
    setSelectedInversionIndex(ixInversion(0));
    const rootNote = IndexUtils.rootNoteAtInversion(selectedNoteIndices, selectedInversionIndex);
    const updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
      rootNote,
      newPresetId,
      ixInversion(0),
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    const originalRootIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex,
    );
    setSelectedInversionIndex(newInversionIndex);
    const updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
      originalRootIndex,
      selectedChordType,
      newInversionIndex,
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const renderOneInversionButton = (inversionIndex: InversionIndex) => (
    <button
      id={`inversionButton${inversionIndex}`}
      key={inversionIndex}
      onClick={() => handleInversionChange(inversionIndex)}
      className={`btn btn-outline-secondary btn-inversion`}
    >
      {inversionIndex}
    </button>
  );

  const renderInversionButtons = () => {
    const presetDefinition = NoteGroupingLibrary.getGroupingById(selectedChordType);
    if (presetDefinition && presetDefinition.hasInversions) {
      const inversionCount = presetDefinition.inversions.length;
      return (
        <div className="inversion-controls">
          <div className="text-center">Inversion</div>
          <div className="d-flex justify-content-center gap-2">
            {Array.from({ length: inversionCount }, (_, i) =>
              renderOneInversionButton(ixInversion(i)),
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderOnePresetButton = (noteGroupingPreset: NoteGroupingId) => (
    <button
      key={noteGroupingPreset}
      id={noteGroupingPreset}
      onClick={() => handlePresetChange(noteGroupingPreset)}
      className={`btn btn-outline-secondary btn-preset`}
      title={NoteGroupingLibrary.getId(noteGroupingPreset, ChordDisplayMode.DisplayName)}
    >
      {NoteGroupingLibrary.getId(noteGroupingPreset, ChordDisplayMode.Letters_Long)}
    </button>
  );

  const renderPresetButtons = () => {
    const presets = NoteGroupingLibrary.IntervalOrChordIds(inputMode === InputMode.IntervalPresets);

    const numColumns = inputMode === InputMode.IntervalPresets ? 2 : 4;

    return (
      <div
        className="preset-buttons-grid"
        style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
      >
        {presets.map((noteGroupingPreset) => renderOnePresetButton(noteGroupingPreset))}
      </div>
    );
  };

  return (
    <div className="presets-selector">
      {renderPresetButtons()}
      {inputMode === InputMode.ChordPresets && renderInversionButtons()}
    </div>
  );
};

export default PresetsSelector;
