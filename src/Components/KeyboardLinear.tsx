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
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { useKeyboardHandlers } from "./useKeyboardHandlers";

const KeyboardLinear: React.FC = () => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();

  const keys = [];
  for (let actualIndex = 0 as ActualIndex; actualIndex < 2 * TWELVE; actualIndex++) {
    const isSelected = selectedNoteIndices.includes(actualIndex);
    const isRootNote = checkIsRootNote(actualIndex);

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
    <div className="keyboardlinear-container">
      <div className="keyboardlinear">{keys}</div>
    </div>
  );
};

export default KeyboardLinear;
