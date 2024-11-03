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
        <div className="inversion-controls d-flex flex-column justify-content-center align-items-center ">
          <span className="me-2">Inversion:</span>
          <div className="d-flex">
            {Array.from({ length: inversionCount }, (_, i) => (
              <button
                key={i}
                onClick={() => handleInversionChange(ixInversion(i))}
                className={`btn btn-primary me-1 ${
                  selectedInversionIndex === ixInversion(i) ? "selected-inversion" : ""
                }`}
              >
                {ixInversion(i)}
              </button>
            ))}
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
      className={`btn btn-outline-secondary d-flex justify-content-center align-items-center`} // Added flex classes for centering
      title={getId(preset.id, ChordDisplayMode.DisplayName)}
      style={{
        width: "100%",
        height: "18px",
        fontSize: "0.8rem",
        margin: "2px 0",
        borderRadius: "0",
      }} // Set width to 25% for uniformity
    >
      {getId(preset.id, ChordDisplayMode.Letters_Long)}
    </button>
  );

  const renderPresetButtons = () => {
    const presets = ChordAndIntervalManager.IntervalOrChordDefinitions(
      inputMode === InputMode.IntervalPresets,
    );

    const gridClassName = inputMode === InputMode.IntervalPresets ? "col-6" : "col-3";

    return (
      <div className="row g-1">
        {presets.map((preset) => (
          <div className={gridClassName} key={preset.id}>
            {renderOnePresetButton(preset)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="presets-selector container">
      <h3 className="text-center" hidden={true}>
        {inputMode === InputMode.IntervalPresets ? "Interval Presets" : "Chord Presets"}
      </h3>
      <div className="row">
        <div className="col-12">{renderPresetButtons()}</div>
      </div>
      <div className="row">
        <div className="col-12">{renderInversionButtons()}</div>
      </div>
    </div>
  );
};

export default PresetsSelector;
