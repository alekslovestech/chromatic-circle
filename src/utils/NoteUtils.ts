import { isBlackKey } from "../ChromaticUtils";
import { NotationType } from "./NotationType";
import { Accidental } from "./Accidental";
import { NoteWithAccidental } from "./NoteWithAccidental";
import { PLAIN_NOTE_NAMES } from "../NoteConstants";

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
      [Accidental.Natural]: "♮",
      [Accidental.Sharp]: "#",
      [Accidental.Flat]: "b",
    },
  };

  return accidentalSigns[displayMode][accidental] || "";
}

export function GetNoteWithAccidentalFromIndex(
  index: number,
  accidentalPreference: Accidental
): NoteWithAccidental {
  const chromaticIndex = index % 12;
  const diatonicIndex = index % 7;

  const diatonicNoteName = PLAIN_NOTE_NAMES[diatonicIndex];

  let accidental = Accidental.None;

  if (isBlackKey(chromaticIndex)) {
    accidental =
      accidentalPreference === Accidental.Sharp
        ? Accidental.Sharp
        : Accidental.Flat;
  }

  return { noteName: diatonicNoteName, accidental };
}
