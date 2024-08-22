import { NotationType } from "../types/NotationType";
import { Accidental } from "../types/Accidental";
import { NoteWithAccidental } from "../types/NoteWithAccidental";
import {
  NOTES_WITH_FLAT,
  NOTES_WITH_SHARP,
  TWELVE,
} from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { ActualToChromatic } from "./ChromaticUtils";

export function GetAccidentalSign(
  accidental: Accidental,
  displayMode: NotationType
): string {
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

export function GetNoteWithAccidentalFromIndex(
  actualIndex: ActualIndex,
  accidentalPreference: Accidental
): NoteWithAccidental {
  const notesArray =
    accidentalPreference === Accidental.Flat
      ? NOTES_WITH_FLAT
      : NOTES_WITH_SHARP;
  const indexAndOctave = ActualToChromatic(actualIndex);
  return {
    ...notesArray[indexAndOctave.chromaticIndex],
    octave: 3 + indexAndOctave.octaveOffset,
  };
}

export function GetOppositeAccidental(prevAccidental: Accidental): Accidental {
  if (prevAccidental === Accidental.Sharp) return Accidental.Flat;
  if (prevAccidental === Accidental.Flat) return Accidental.Sharp;
  return prevAccidental; //no change
}
