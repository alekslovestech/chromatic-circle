import React from "react";

import { InputMode, ChordDisplayMode } from "../../types/SettingModes";
import { InversionIndex, ixInversion } from "../../types/IndexTypes";
import { NoteGroupingId } from "../../types/NoteGroupingTypes";
import { NoteGroupingLibrary } from "../../types/NoteGroupingLibrary";

import { IndexUtils } from "../../utils/IndexUtils";
import { ChordUtils } from "../../utils/ChordUtils";

import { usePreset } from "../../contexts/PresetContext";
import { useMusical } from "../../contexts/MusicalContext";

export const PresetsSelector: React.FC = () => {
  const {
    selectedChordType,
    setSelectedChordType,
    selectedInversionIndex,
    setSelectedInversionIndex,
    inputMode,
  } = usePreset();

  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

  if (inputMode !== InputMode.ChordPresets && inputMode !== InputMode.IntervalPresets) return null;

  const handlePresetChange = (newPresetId: NoteGroupingId) => {
    setSelectedChordType(newPresetId);
    setSelectedInversionIndex(ixInversion(0));
    const rootNote = IndexUtils.rootNoteAtInversion(selectedNoteIndices, selectedInversionIndex);
    const updatedIndices = ChordUtils.calculateChordNotesFromIndex(
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
    const updatedIndices = ChordUtils.calculateChordNotesFromIndex(
      originalRootIndex,
      selectedChordType,
      newInversionIndex,
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const renderOneInversionButton = (inversionIndex: InversionIndex) => (
    <button
      id={`inversion-${inversionIndex}`}
      key={inversionIndex}
      onClick={() => handleInversionChange(inversionIndex)}
      className={`inversion-button ${inversionIndex === selectedInversionIndex ? "selected" : ""}`}
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
          <div className="inversion-button-container">
            {Array.from({ length: inversionCount }, (_, i) =>
              renderOneInversionButton(ixInversion(i)),
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const getPresetId = (noteGroupingPreset: NoteGroupingId) => {
    const presetId = NoteGroupingLibrary.getId(noteGroupingPreset, ChordDisplayMode.ElementId);
    return `preset-${presetId}`;
  };

  const renderOnePresetButton = (noteGroupingPreset: NoteGroupingId) => (
    <button
      key={noteGroupingPreset}
      id={getPresetId(noteGroupingPreset)}
      onClick={() => handlePresetChange(noteGroupingPreset)}
      className={`preset-button ${noteGroupingPreset === selectedChordType ? "selected" : ""}`}
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
        {presets
          .filter((preset) => NoteGroupingLibrary.getGroupingById(preset).isVisiblePreset)
          .map((noteGroupingPreset) => renderOnePresetButton(noteGroupingPreset))}
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
