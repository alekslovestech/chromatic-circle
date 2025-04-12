import React from "react";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../../types/IndexTypes";

import { IndexUtils } from "../../utils/IndexUtils";
import { isBlackKey } from "../../utils/KeyboardUtils";

import { VisualStateUtils } from "../../tests/utils/VisualStateUtils";
import { KeyTextMode } from "../../types/SettingModes";
import { useMusical } from "../../contexts/MusicalContext";

const WHITE_KEYS_PER_OCTAVE = 7;
const BLACK2WHITE_WIDTH_RATIO = 0.7; // Black keys are 70% the width of white keys

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
  const longKeyWidth = containerWidth / (2 * WHITE_KEYS_PER_OCTAVE);

  const isShortKey = isBlackKey(actualIndex);

  const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
  const whiteKeyPositions = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6]; // Map chromatic indices to white key positions (0-6)
  const position = whiteKeyPositions[chromaticIndex] + octaveOffset * WHITE_KEYS_PER_OCTAVE;
  const left =
    position * longKeyWidth - (isShortKey ? (longKeyWidth * BLACK2WHITE_WIDTH_RATIO) / 2 : 0);

  const classNames = ["key-base", "piano-key"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const visualState = VisualStateUtils.getVisualState(chromaticIndex);
  classNames.push(visualState);

  if (isSelected) classNames.push("selected");
  if (isRootNote) classNames.push("root-note");
  if (isShortKey) classNames.push("short");

  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);

  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, KeyTextMode.NoteNames);

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
