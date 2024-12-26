import React from "react";
import { useNotes } from "../NotesContext";
import { getId } from "../../types/NoteGrouping";
import { InputMode } from "../../types/InputMode";
import { InversionIndex, ixInversion } from "../../types/IndexTypes";
import { ChordDisplayMode } from "../../types/ChordDisplayMode";
import { IndexUtils } from "../../utils/IndexUtils";
import { ChordAndIntervalManager } from "../../utils/ChordAndIntervalManager";
import "../../styles/PresetsSelector.css";
import { ChordDefinition } from "../../types/ChordDefinition";
import { NoteGroupingId } from "../../types/NoteGroupingTypes";

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
      key={inversionIndex}
      onClick={() => handleInversionChange(inversionIndex)}
      className={`btn btn-outline-secondary btn-inversion`}
    >
      {inversionIndex}
    </button>
  );

  const renderInversionButtons = () => {
    const presetDefinition = ChordAndIntervalManager.getDefinitionFromId(selectedChordType);
    if (presetDefinition && presetDefinition.hasInversions()) {
      const inversionCount = presetDefinition.inversions.length;
      return (
        <div className="col-12 inversion-controls d-flex flex-column align-items-center">
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

  const renderOnePresetButton = (preset: ChordDefinition) => (
    <button
      key={preset.id}
      onClick={() => handlePresetChange(preset.id)}
      className={`btn btn-outline-secondary btn-preset`}
      title={getId(preset.id, ChordDisplayMode.DisplayName)}
    >
      {getId(preset.id, ChordDisplayMode.Letters_Long)}
    </button>
  );

  const renderPresetButtons = () => {
    const presets = ChordAndIntervalManager.IntervalOrChordDefinitions(
      inputMode === InputMode.IntervalPresets,
    );

    // Calculate number of columns based on mode
    const numColumns = inputMode === InputMode.IntervalPresets ? 2 : 4;

    return (
      <div className="preset-buttons-container">
        <div
          className="preset-buttons-grid"
          style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
        >
          {presets.map((preset) => (
            <div className="preset-button-wrapper" key={preset.id}>
              {renderOnePresetButton(preset)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="presets-selector container">
        {/*<h3 className="text-center" hidden={true}>
        {inputMode === InputMode.IntervalPresets ? "Interval Presets" : "Chord Presets"}
      </h3>*/}
        {renderPresetButtons()}
        {inputMode === InputMode.ChordPresets && (
          <div className="row">{renderInversionButtons()}</div>
        )}
      </div>
    </div>
  );
};

export default PresetsSelector;
