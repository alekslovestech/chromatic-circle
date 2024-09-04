import { NotationType } from "../types/NotationType";
import { Accidental } from "../types/Accidental";
import { NoteWithAccidental } from "../types/NoteWithAccidental";
import { getNotesArray } from "../types/NoteConstants";
import { ActualIndex, actualToChromatic } from "../types/IndexTypes";

export function getAccidentalSign(accidental: Accidental, displayMode: NotationType): string {
  const accidentalSigns = {
    [NotationType.ScreenDisplay]: {
      [Accidental.None]: "",
      [Accidental.Natural]: "♮",
      [Accidental.Sharp]: "♯",
      [Accidental.Flat]: "♭",
    },
    [NotationType.EasyScore]: {
      [Accidental.None]: "",
      [Accidental.Natural]: "n",
      [Accidental.Sharp]: "#",
      [Accidental.Flat]: "b",
    },
  };

  return accidentalSigns[displayMode][accidental] || "";
}

export function getNoteWithAccidentalFromIndex(
  actualIndex: ActualIndex,
  accidentalPreference: Accidental,
): NoteWithAccidental {
  const notesArray = getNotesArray(accidentalPreference);
  const indexAndOctave = actualToChromatic(actualIndex);
  return {
    ...notesArray[indexAndOctave.chromaticIndex],
    octave: 4 + indexAndOctave.octaveOffset,
  };
}

export const getOppositeAccidental = (prevAccidental: Accidental): Accidental => {
  if (prevAccidental === Accidental.Sharp) return Accidental.Flat;
  if (prevAccidental === Accidental.Flat) return Accidental.Sharp;
  return prevAccidental; //no change
};
