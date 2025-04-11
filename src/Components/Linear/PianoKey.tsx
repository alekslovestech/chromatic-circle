import React from "react";
import { ActualIndex } from "../../types/IndexTypes";
import { NoteConverter } from "../../types/NoteConverter";
import { MusicalKey } from "../../types/Keys/MusicalKey";

import { getBlackWhiteString } from "../../utils/ColorUtils";
import { IndexUtils } from "../../utils/IndexUtils";

import { useDisplay } from "../../contexts/DisplayContext";

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
  // Determine if this is a black or white key
  const isBlack = monochromeMode ? false : getBlackWhiteString(actualIndex) === "black";

  // Calculate position based on the note index
  const position = calculateKeyRect(actualIndex, isBlack, containerWidth);

  // Create class names
  const classNames = ["piano-key"];
  classNames.push(isBlack ? "black" : "white");
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
    left: `${position.left}%`,
    width: `${position.width}%`,
    height: isBlack ? "60%" : "100%",
    zIndex: isBlack ? 2 : 1,
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

const KEY_POSITIONS: { [key: number]: { position: number; isBlack: boolean } } = {
  0: { position: 0, isBlack: false }, // C
  1: { position: 0.5, isBlack: true }, // C#/Db
  2: { position: 1, isBlack: false }, // D
  3: { position: 1.5, isBlack: true }, // D#/Eb
  4: { position: 2, isBlack: false }, // E
  5: { position: 3, isBlack: false }, // F
  6: { position: 3.5, isBlack: true }, // F#/Gb
  7: { position: 4, isBlack: false }, // G
  8: { position: 4.5, isBlack: true }, // G#/Ab
  9: { position: 5, isBlack: false }, // A
  10: { position: 5.5, isBlack: true }, // A#/Bb
  11: { position: 6, isBlack: false }, // B
  12: { position: 7, isBlack: false }, // C (next octave)
  13: { position: 7.5, isBlack: true }, // C#/Db
  14: { position: 8, isBlack: false }, // D
  15: { position: 8.5, isBlack: true }, // D#/Eb
  16: { position: 9, isBlack: false }, // E
  17: { position: 10, isBlack: false }, // F
  18: { position: 10.5, isBlack: true }, // F#/Gb
  19: { position: 11, isBlack: false }, // G
  20: { position: 11.5, isBlack: true }, // G#/Ab
  21: { position: 12, isBlack: false }, // A
  22: { position: 12.5, isBlack: true }, // A#/Bb
  23: { position: 13, isBlack: false }, // B
};

/**
 * Calculates the position of a piano key based on its index and whether it's black or white.
 * @param actualIndex The index of the note (0-23)
 * @param isBlack Whether the key is black
 * @returns An object with left position and width as percentages
 */
const calculateKeyRect = (
  actualIndex: ActualIndex,
  isBlack: boolean,
  containerWidth: number,
): { left: number; width: number } => {
  // Constants for positioning
  const WHITE_KEYS_PER_2_OCTAVES = 14; // 14 white keys in 2 octaves
  const BLACK_TO_WHITE_RATIO = 0.7; // Black keys are 70% the width of white keys

  // Calculate the width of white and black keys
  const whiteKeyWidth = containerWidth / WHITE_KEYS_PER_2_OCTAVES;
  const blackKeyWidth = whiteKeyWidth * BLACK_TO_WHITE_RATIO;
  console.log(
    `containerWidth: ${containerWidth}, whiteKeyWidth: ${whiteKeyWidth}, blackKeyWidth: ${blackKeyWidth}`,
  );
  // Define positions for all keys (white and black)

  const keyInfo = KEY_POSITIONS[actualIndex];

  if (isBlack) {
    const blackKeyPosition = keyInfo.position * whiteKeyWidth - blackKeyWidth / 4;
    return {
      left: blackKeyPosition,
      width: blackKeyWidth,
    };
  } else {
    const whiteKeyPosition = keyInfo.position * whiteKeyWidth;
    return {
      left: whiteKeyPosition,
      width: whiteKeyWidth,
    };
  }
};
