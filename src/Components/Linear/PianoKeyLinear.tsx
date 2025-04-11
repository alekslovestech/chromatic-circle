import React from "react";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../../types/IndexTypes";
import { MusicalKey } from "../../types/Keys/MusicalKey";

import { IndexUtils } from "../../utils/IndexUtils";
import { isBlackKey } from "../../utils/KeyboardUtils";

import { useDisplay } from "../../contexts/DisplayContext";
import { VisualStateUtils } from "../../tests/utils/VisualStateUtils";
import { KeyTextMode } from "../../types/SettingModes";

const WHITE_KEYS_PER_OCTAVE = 7;
const BLACK2WHITE_WIDTH_RATIO = 0.7; // Black keys are 70% the width of white keys

interface PianoKeyProps {
  actualIndex: ActualIndex;
  isSelected: boolean;
  isRootNote: boolean;
  selectedMusicalKey: MusicalKey;
  containerWidth: number;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyLinear: React.FC<PianoKeyProps> = ({
  actualIndex,
  isSelected,
  isRootNote,
  selectedMusicalKey,
  containerWidth,
  onClick,
}) => {
  const { monochromeMode } = useDisplay();

  const longKeyWidth = containerWidth / (2 * WHITE_KEYS_PER_OCTAVE);

  const isShortKey = isBlackKey(actualIndex);
  const isVisuallyBlack = isShortKey && !monochromeMode; // Show dark keys as black or leave them as the rest

  // Calculate key position
  const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
  const whiteKeyPositions = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6]; // Map chromatic indices to white key positions (0-6)
  const position = whiteKeyPositions[chromaticIndex] + octaveOffset * WHITE_KEYS_PER_OCTAVE;
  const left =
    position * longKeyWidth - (isShortKey ? (longKeyWidth * BLACK2WHITE_WIDTH_RATIO) / 2 : 0);

  // Setup styling
  const classNames = ["piano-key"];
  classNames.push(isVisuallyBlack ? "black" : "white");
  if (isSelected) classNames.push("selected");
  if (isRootNote) classNames.push("root-note");
  if (isShortKey) classNames.push("short");

  // Get visual state
  const visualState = VisualStateUtils.getVisualState(selectedMusicalKey, chromaticIndex);

  // Create ID
  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);

  // Get note text
  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, KeyTextMode.NoteNames);

  return (
    <div
      id={id}
      className={classNames.join(" ")}
      data-state={visualState}
      style={{
        left: `${left}px`,
      }}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};
