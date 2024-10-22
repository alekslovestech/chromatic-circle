import React from "react";
import { useNotes } from "./NotesContext";
import { getId, NoteGroupingId } from "../types/NoteGrouping";
import { InputMode } from "../types/InputMode";
import { InversionIndex, ixInversion } from "../types/IndexTypes";
import { ChordDisplayMode } from "../types/ChordDisplayMode";
import { IndexUtils } from "../utils/IndexUtils";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import "../styles/PresetsSelector.css";
import { ChordDefinition } from "../types/ChordDefinition";

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

  const renderInversionButtons = () => {
    const presetDefinition = ChordAndIntervalManager.getDefinitionFromId(selectedChordType);
    if (presetDefinition && presetDefinition.hasInversions()) {
      const inversionCount = presetDefinition.inversions.length;
      return (
        <div className="inversion-buttons">
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

  const renderOnePresetButton = (preset: ChordDefinition) => (
    <button
      key={preset.id}
      onClick={() => handlePresetChange(preset.id)}
      className={selectedChordType === preset.id ? "selected-preset" : ""}
      title={getId(preset.id, ChordDisplayMode.DisplayName)}
    >
      {getId(preset.id, ChordDisplayMode.Letters_Long)}
    </button>
  );

  const renderPresetButtons = () => {
    const presets = ChordAndIntervalManager.IntervalOrChordDefinitions(
      inputMode === InputMode.IntervalPresets,
    );

    const gridClassName = inputMode === InputMode.IntervalPresets ? "interval-grid" : "chord-grid";

    return (
      <div className={gridClassName}>{presets.map((preset) => renderOnePresetButton(preset))}</div>
    );
  };

  return (
    <div className="presets-selector">
      <h3 hidden={true}>
        {inputMode === InputMode.IntervalPresets ? "Interval Presets" : "Chord Presets"}
      </h3>
      {renderPresetButtons()}
      {renderInversionButtons()}
    </div>
  );
};

export default PresetsSelector;
