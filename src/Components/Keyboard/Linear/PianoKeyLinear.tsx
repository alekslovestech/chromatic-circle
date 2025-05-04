import React from "react";

import { ActualIndex, actualIndexToChromaticAndOctave } from "../../../types/IndexTypes";
import { KeyDisplayMode } from "../../../types/SettingModes";

import { IndexUtils } from "../../../utils/IndexUtils";
import { isBlackKey } from "../../../utils/KeyboardUtils";
import { VisualStateUtils } from "../../../utils/VisualStateUtils";
import { LinearKeyboardUtils } from "../../../utils/LinearKeyboardUtils";

import { useMusical } from "../../../contexts/MusicalContext";
import { useDisplay } from "../../../contexts/DisplayContext";
import { useGlobal, GlobalMode } from "../../../contexts/GlobalContext";

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
  const { globalMode } = useGlobal();
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode } = useDisplay();

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

  //we need to use classNames to make the key disabled, instead of the default 'disabled' attribute, because this is not a default button
  if (isAdvanced) classNames.push("disabled");

  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);

  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, KeyDisplayMode.NoteNames);

  return (
    <div
      id={id}
      className={classNames.join(" ")}
      style={{
        left: `${left}px`,
      }}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};
