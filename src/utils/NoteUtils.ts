import { NotationType } from "../types/NotationType";
import { AccidentalType } from "../types/AccidentalType";
import { NoteWithAccidental } from "../types/NoteWithAccidental";
import { getNotesArray } from "../types/NoteConstants";
import { ActualIndex, actualToChromatic } from "../types/IndexTypes";

export function getAccidentalSign(accidental: AccidentalType, displayMode: NotationType): string {
  const accidentalSigns = {
    [NotationType.ScreenDisplay]: {
      [AccidentalType.None]: "",
      [AccidentalType.Natural]: "♮",
      [AccidentalType.Sharp]: "♯",
      [AccidentalType.Flat]: "♭",
    },
    [NotationType.EasyScore]: {
      [AccidentalType.None]: "",
      [AccidentalType.Natural]: "n",
      [AccidentalType.Sharp]: "#",
      [AccidentalType.Flat]: "b",
    },
  };

  return accidentalSigns[displayMode][accidental] || "";
}

export function getNoteWithAccidentalFromIndex(
  actualIndex: ActualIndex,
  accidentalPreference: AccidentalType,
): NoteWithAccidental {
  const notesArray = getNotesArray(accidentalPreference);
  const indexAndOctave = actualToChromatic(actualIndex);
  return {
    ...notesArray[indexAndOctave.chromaticIndex],
    octave: 4 + indexAndOctave.octaveOffset,
  };
}

export const getOppositeAccidental = (prevAccidental: AccidentalType): AccidentalType => {
  if (prevAccidental === AccidentalType.Sharp) return AccidentalType.Flat;
  if (prevAccidental === AccidentalType.Flat) return AccidentalType.Sharp;
  return prevAccidental; //no change
};

export const getNoteTextFromIndex = (
  actualIndex: ActualIndex,
  sharpOrFlat: AccidentalType,
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
