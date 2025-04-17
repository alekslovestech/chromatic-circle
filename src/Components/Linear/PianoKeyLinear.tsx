import React from "react";

import { WHITE_KEYS_PER_OCTAVE } from "../../types/NoteConstants";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../../types/IndexTypes";
import { GlobalMode, KeyTextMode } from "../../types/SettingModes";

import { IndexUtils } from "../../utils/IndexUtils";
import { isBlackKey } from "../../utils/KeyboardUtils";

import { VisualStateUtils } from "../../utils/VisualStateUtils";

import { useMusical } from "../../contexts/MusicalContext";
import { useDisplay } from "../../contexts/DisplayContext";

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

  const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
  const whiteKeyPositions = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6]; // Map chromatic indices to white key positions (0-6)

  const longKeyWidth = containerWidth / (2 * WHITE_KEYS_PER_OCTAVE);

  const position = whiteKeyPositions[chromaticIndex] + octaveOffset * WHITE_KEYS_PER_OCTAVE;
  const left = position * longKeyWidth;

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
