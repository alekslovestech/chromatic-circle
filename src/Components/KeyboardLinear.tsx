import React from "react";
import "../styles/KeyboardLinear.css";
import { useNotes } from "./NotesContext";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { getBlackWhiteString } from "../utils/ColorUtils";
const KeyboardLinear: React.FC = () => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();

  const keys = [];
  for (let actualIndex = 0 as ActualIndex; actualIndex < 2 * TWELVE; actualIndex++) {
    const isSelected = selectedNoteIndices.includes(actualIndex);
    const isRootNote = checkIsRootNote(actualIndex);
    const blackWhiteString = getBlackWhiteString(actualIndex);

    //later classes override earlier ones
    const classNames = ["piano-key"];
    classNames.push(blackWhiteString);
    if (isSelected) classNames.push("selected");
    if (isRootNote) classNames.push("root-note");

    keys.push(
      <div
        key={actualIndex}
        className={classNames.join(" ")}
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
