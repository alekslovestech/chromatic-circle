import { Accidental } from "../types/Accidental";
import { ActualIndex } from "../types/IndexTypes";
import { NotationType } from "../types/NotationType";
import { getAccidentalSign, getNoteWithAccidentalFromIndex } from "./NoteUtils";

export const getNoteTextFromIndex = (
  actualIndex: ActualIndex,
  sharpOrFlat: Accidental,
  showOctave: boolean = false,
): string => {
  const noteWithAccidental = getNoteWithAccidentalFromIndex(actualIndex, sharpOrFlat);
  const accidentalSign = getAccidentalSign(
    noteWithAccidental.accidental,
    NotationType.ScreenDisplay,
  );
  const octaveString = showOctave ? noteWithAccidental.octave : "";
  return `${noteWithAccidental.noteName}${accidentalSign}${octaveString}`;
};
