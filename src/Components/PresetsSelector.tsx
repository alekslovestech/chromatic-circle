import React from "react";
import { useNotes } from "./NotesContext";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { NoteGroupingId } from "../types/NoteGrouping";
import { InputMode } from "../types/InputMode";
import { ActualIndex, InversionIndex, ixInversion } from "../types/IndexTypes";
import { IndexUtils } from "../utils/IndexUtils";
import "../styles/ChordPresetsSelector.css";

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

  const renderPresetButtons = () => {
    const presets = ChordAndIntervalManager.IntervalOrChordDefinitions(
      inputMode === InputMode.IntervalPresets,
    );
    return (
      <div className={inputMode === InputMode.IntervalPresets ? "interval-column" : "chord-grid"}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetChange(preset.id)}
            className={selectedChordType === preset.id ? "selected-preset" : ""}
          >
            {preset.id}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="preset-selector">
      <h3>{inputMode === InputMode.IntervalPresets ? "Interval Presets" : "Chord Presets"}</h3>
      {renderPresetButtons()}
      {renderInversionButtons()}
    </div>
  );
};

export default PresetsSelector;
