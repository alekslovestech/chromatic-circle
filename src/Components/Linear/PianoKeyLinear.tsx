import React from "react";

import { ActualIndex, actualIndexToChromaticAndOctave } from "../../types/IndexTypes";
import { GlobalMode, KeyDisplayMode } from "../../types/SettingModes";

import { IndexUtils } from "../../utils/IndexUtils";
import { isBlackKey } from "../../utils/KeyboardUtils";

import { VisualStateUtils } from "../../utils/VisualStateUtils";

import { useMusical } from "../../contexts/MusicalContext";
import { useDisplay } from "../../contexts/DisplayContext";

import { LinearKeyboardUtils } from "../../utils/LinearKeyboardUtils";

interface PianoKeyProps {
  actualIndex: ActualIndex;
  isRootNote: boolean;
  containerWidth: number;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyLinear: React.FC<PianoKeyProps> = ({
  actualIndex,
  isRootNote,
  containerWidth,
  onClick,
}) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { globalMode, monochromeMode } = useDisplay();

  const isShortKey = isBlackKey(actualIndex);

  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);

  const left = LinearKeyboardUtils.calculateKeyLeftPosition(actualIndex, containerWidth);

  const classNames = ["key-base", "piano-key"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const isAdvanced = globalMode === GlobalMode.Advanced;
  const visualState = VisualStateUtils.getVisualState(
    chromaticIndex,
    isAdvanced,
    selectedMusicalKey,
    monochromeMode,
  );
  classNames.push(visualState);

  if (isSelected) classNames.push("selected");
  if (isRootNote) classNames.push("root-note");
  if (isShortKey) classNames.push("short");

  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);

  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, KeyDisplayMode.NoteNames);

  return (
    <div
      id={id}
      className={classNames.join(" ")}
      style={{
        left: `${left}px`,
      }}
      onClick={() => (!isAdvanced ? onClick(actualIndex) : null)}
    >
      {noteText}
    </div>
  );
};
