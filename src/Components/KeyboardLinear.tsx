import React from "react";
import "../styles/KeyboardLinear.css";
import { useNotes } from "./NotesContext";
import { TWENTY4 } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { getNoteTextFromActualIndex } from "../utils/NoteUtils";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { getBlackWhiteString } from "../utils/ColorUtils";
import { IndexUtils } from "../utils/IndexUtils";

const KeyboardLinear: React.FC = () => {
  const { selectedNoteIndices, selectedMusicalKey } = useNotes();
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();

  const keys = [];
  for (let actualIndex = 0 as ActualIndex; actualIndex < TWENTY4; actualIndex++) {
    const isSelected = selectedNoteIndices.includes(actualIndex);
    const isRootNote = checkIsRootNote(actualIndex);
    const blackWhiteString = getBlackWhiteString(actualIndex);

    const classNames = ["piano-key"];
    classNames.push(blackWhiteString);
    if (isSelected) classNames.push("selected");
    if (isRootNote) classNames.push("root-note");

    const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);
    keys.push(
      <div
        id={id}
        key={actualIndex}
        className={classNames.join(" ")}
        onClick={() => handleKeyClick(actualIndex)}
      >
        {getNoteTextFromActualIndex(actualIndex, selectedMusicalKey.getDefaultAccidental())}
      </div>,
    );
  }

  return <div className="keyboardlinear">{keys}</div>;
};

export default KeyboardLinear;
