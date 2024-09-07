import React from "react";
import "../styles/KeyboardLinear.css";

import { useNotes } from "./NotesContext";
import {
  getBlackWhiteString,
  getComputedColor,
  getComputedKeyColor,
  getComputedTextColor,
} from "../utils/ColorUtils";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { getNoteTextFromIndex } from "../utils/NoteNameUtils";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { InputMode } from "../types/InputMode";
import { IndexUtils } from "../utils/IndexUtils";

const KeyboardLinear: React.FC = () => {
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedInversionIndex,
    selectedAccidental,
    selectedChordType,
    inputMode,
  } = useNotes();

  const handleKeyClick = (newIndex: ActualIndex) => {
    let updatedIndices = selectedNoteIndices;
    if (inputMode === InputMode.Toggle) {
      updatedIndices = IndexUtils.ToggleNewIndex(selectedNoteIndices, newIndex);
    } else {
      updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
        newIndex,
        selectedChordType,
        selectedInversionIndex,
      );
    }
    setSelectedNoteIndices(updatedIndices);
  };

  const rootNote = IndexUtils.rootNoteAtInversion(selectedNoteIndices, selectedInversionIndex);
  const hasInversions =
    inputMode !== InputMode.Toggle && ChordAndIntervalManager.hasInversions(selectedChordType);

  const keys = [];
  for (let actualIndex = 0 as ActualIndex; actualIndex < 2 * TWELVE; actualIndex++) {
    const isSelected = selectedNoteIndices.includes(actualIndex);
    const isRootNote = hasInversions && actualIndex === rootNote;

    keys.push(
      <div
        key={actualIndex}
        className={`piano-key ${getBlackWhiteString(actualIndex)}`}
        style={{
          backgroundColor: getComputedKeyColor(actualIndex, isSelected),
          color: getComputedTextColor(actualIndex),
          border: isRootNote ? `2px solid ${getComputedColor("--root-note-highlight")}` : undefined,
        }}
        onClick={() => handleKeyClick(actualIndex)}
      >
        {getNoteTextFromIndex(actualIndex, selectedAccidental)}
      </div>,
    );
  }

  return (
    <div className="piano-keyboard-container">
      <div className="piano-keyboard">{keys}</div>
    </div>
  );
};

export default KeyboardLinear;
