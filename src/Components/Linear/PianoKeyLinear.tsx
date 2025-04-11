import React from "react";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../../types/IndexTypes";
import { NoteConverter } from "../../types/NoteConverter";
import { MusicalKey } from "../../types/Keys/MusicalKey";

import { IndexUtils } from "../../utils/IndexUtils";
import { isBlackKey } from "../../utils/KeyboardUtils";

import { useDisplay } from "../../contexts/DisplayContext";

const WHITE_KEYS_PER_OCTAVE = 7;
const WHITE_KEYS_PER_2_OCTAVES = 14;
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
  const isShortKey = isBlackKey(actualIndex);
  // Determine should we "show" dark keys as black or leave them as the rest.
  const isVisuallyBlack = isShortKey && !monochromeMode;

  const longKeyWidth = containerWidth / WHITE_KEYS_PER_2_OCTAVES;

  const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);

  // Map chromatic indices to white key positions (0-6)
  const whiteKeyPositions = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];
  const position = whiteKeyPositions[chromaticIndex] + octaveOffset * WHITE_KEYS_PER_OCTAVE;
  const width = isShortKey ? longKeyWidth * BLACK2WHITE_WIDTH_RATIO : longKeyWidth;
  const left =
    position * longKeyWidth - (isShortKey ? (longKeyWidth * BLACK2WHITE_WIDTH_RATIO) / 2 : 0);
  // Create class names
  const classNames = ["piano-key"];
  classNames.push(isVisuallyBlack ? "black" : "white");
  if (isSelected) classNames.push("selected");
  if (isRootNote) classNames.push("root-note");
  if (isShortKey) classNames.push("short");

  // Create ID
  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);

  // Get note text
  const noteText = NoteConverter.getNoteTextFromActualIndex(
    actualIndex,
    selectedMusicalKey.getDefaultAccidental(),
  );

  return (
    <div
      id={id}
      className={classNames.join(" ")}
      style={{
        left: `${left}px`,
        width: `${width}px`,
      }}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};

/**
 * Calculates the position and dimensions of a piano key
 */
function calculateKeyRect(
  actualIndex: ActualIndex,
  containerWidth: number,
): { left: number; width: number } /*heightRatio: number; zIndex: number /*borderStyle: string */ {
  const isShort = isBlackKey(actualIndex);
  const whiteKeyWidth = containerWidth / WHITE_KEYS_PER_2_OCTAVES;

  const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);

  // Map chromatic indices to white key positions (0-6)
  const whiteKeyPositions = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];
  const position = whiteKeyPositions[chromaticIndex] + octaveOffset * WHITE_KEYS_PER_OCTAVE;
  return {
    width: isShort ? whiteKeyWidth * BLACK2WHITE_WIDTH_RATIO : whiteKeyWidth,
    left: position * whiteKeyWidth - (isShort ? (whiteKeyWidth * BLACK2WHITE_WIDTH_RATIO) / 2 : 0),
  };
}
