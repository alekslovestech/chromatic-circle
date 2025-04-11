import React from "react";
import { ActualIndex } from "../../types/IndexTypes";
import { NoteConverter } from "../../types/NoteConverter";
import { MusicalKey } from "../../types/Keys/MusicalKey";

import { IndexUtils } from "../../utils/IndexUtils";

import { useDisplay } from "../../contexts/DisplayContext";
import { isBlackKey } from "../../utils/KeyboardUtils";

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

const KEY_POSITIONS: { [key: number]: { position: number; isDarkKey: boolean } } = {
  0: { position: 0, isDarkKey: false }, // C
  1: { position: 1.0, isDarkKey: true }, // C#/Db
  2: { position: 1, isDarkKey: false }, // D
  3: { position: 2.0, isDarkKey: true }, // D#/Eb
  4: { position: 2, isDarkKey: false }, // E
  5: { position: 3, isDarkKey: false }, // F
  6: { position: 4.0, isDarkKey: true }, // F#/Gb
  7: { position: 4, isDarkKey: false }, // G
  8: { position: 5.0, isDarkKey: true }, // G#/Ab
  9: { position: 5, isDarkKey: false }, // A
  10: { position: 6.0, isDarkKey: true }, // A#/Bb
  11: { position: 6, isDarkKey: false }, // B
  12: { position: 7, isDarkKey: false }, // C (next octave)
  13: { position: 8.0, isDarkKey: true }, // C#/Db
  14: { position: 8, isDarkKey: false }, // D
  15: { position: 9.0, isDarkKey: true }, // D#/Eb
  16: { position: 9, isDarkKey: false }, // E
  17: { position: 10, isDarkKey: false }, // F
  18: { position: 11.0, isDarkKey: true }, // F#/Gb
  19: { position: 11, isDarkKey: false }, // G
  20: { position: 12.0, isDarkKey: true }, // G#/Ab
  21: { position: 12, isDarkKey: false }, // A
  22: { position: 13.0, isDarkKey: true }, // A#/Bb
  23: { position: 13, isDarkKey: false }, // B
};

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
  // Constants for positioning
  const WHITE_KEYS_PER_2_OCTAVES = 14; // 14 white keys in 2 octaves
  const BLACK_TO_WHITE_RATIO = 0.7; // Black keys are 70% the width of white keys

  // Calculate the width of white and black keys
  const whiteKeyWidth = containerWidth / WHITE_KEYS_PER_2_OCTAVES;
  const blackKeyWidth = whiteKeyWidth * BLACK_TO_WHITE_RATIO;

  const keyInfo = KEY_POSITIONS[actualIndex];

  if (isConventionallyBlack) {
    const blackKeyPosition = keyInfo.position * whiteKeyWidth - blackKeyWidth / 2;
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
