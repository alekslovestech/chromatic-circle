import React from "react";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../../types/IndexTypes";
import { NoteConverter } from "../../types/NoteConverter";
import { MusicalKey } from "../../types/Keys/MusicalKey";

import { IndexUtils } from "../../utils/IndexUtils";
import { isBlackKey } from "../../utils/KeyboardUtils";

import { useDisplay } from "../../contexts/DisplayContext";

const WHITE_KEYS_PER_OCTAVE = 7;
const WHITE_KEYS_PER_2_OCTAVES = 14;
const BLACK_TO_WHITE_RATIO = 0.7; // Black keys are 70% the width of white keys
interface PianoKeyProps {
  actualIndex: ActualIndex;
  isSelected: boolean;
  isRootNote: boolean;
  selectedMusicalKey: MusicalKey;
  containerWidth: number;
  onClick: (index: ActualIndex) => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({
  actualIndex,
  isSelected,
  isRootNote,
  selectedMusicalKey,
  containerWidth,
  onClick,
}) => {
  const { monochromeMode } = useDisplay();
  const isConventionallyBlackKey = isBlackKey(actualIndex);
  // Determine should we "show" dark keys as black or leave them as the rest.
  const showBlackKeysVisually = isConventionallyBlackKey && !monochromeMode;

  // Calculate position based on the note index
  const position = calculateKeyRect(actualIndex, isConventionallyBlackKey, containerWidth);
  if (actualIndex < 2) {
    console.log(
      `actualIndex: ${actualIndex}, position.left: ${position.left.toFixed(
        2,
      )}, position.width: ${position.width.toFixed(2)}`,
    );
  }
  // Create class names
  const classNames = ["piano-key"];
  classNames.push(showBlackKeysVisually ? "black" : "white");
  if (isSelected) classNames.push("selected");
  if (isRootNote) classNames.push("root-note");

  // Create ID
  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);

  // Get note text
  const noteText = NoteConverter.getNoteTextFromActualIndex(
    actualIndex,
    selectedMusicalKey.getDefaultAccidental(),
  );

  // Create style object with calculated position
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${position.left}px`,
    width: `${position.width}px`,
    height: isConventionallyBlackKey ? "60%" : "100%",
    zIndex: isConventionallyBlackKey ? 2 : 1,
  };

  return (
    <div
      id={id}
      className={classNames.join(" ")}
      style={style}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};

function getKeyPosition(actualIndex: ActualIndex): {
  position: number;
  isConventionallyBlackKey: boolean;
} {
  let pos = -1;
  const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
  switch (chromaticIndex) {
    case 0:
      pos = 0;
      break;
    case 1:
    case 2:
      pos = 1;
      break;
    case 3:
    case 4:
      pos = 2;
      break;
    case 5:
      pos = 3;
      break;
    case 6:
    case 7:
      pos = 4.0;
      break;
    case 8:
    case 9:
      pos = 5.0;
      break;
    case 10:
    case 11:
      pos = 6;
      break;
    default:
      pos = -1;
  }
  pos += octaveOffset * WHITE_KEYS_PER_OCTAVE;

  return { position: pos, isConventionallyBlackKey: isBlackKey(actualIndex) };
}

/**
 * Calculates the position of a piano key based on its index and whether it's black or white.
 * @param actualIndex The index of the note (0-23)
 * @param isConventionallyBlack Whether the key is black
 * @returns An object with left position and width as percentages
 */
const calculateKeyRect = (
  actualIndex: ActualIndex,
  isConventionallyBlack: boolean,
  containerWidth: number,
): { left: number; width: number } => {
  // Calculate the width of white and black keys
  const whiteKeyWidth = containerWidth / WHITE_KEYS_PER_2_OCTAVES;
  const blackKeyWidth = whiteKeyWidth * BLACK_TO_WHITE_RATIO;

  const keyInfo = getKeyPosition(actualIndex);

  const width = isConventionallyBlack ? blackKeyWidth : whiteKeyWidth;
  const left = keyInfo.position * whiteKeyWidth - (isConventionallyBlack ? blackKeyWidth / 2 : 0);
  return { left, width };
};
