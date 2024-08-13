import { NotationType } from "./NotationType";
import { Accidental } from "./Accidental";
import { NoteWithAccidental } from "./NoteWithAccidental";
import { NOTES_WITH_FLAT, NOTES_WITH_SHARP } from "../NoteConstants";

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

  const notesArray = accidentalPreference === Accidental.Flat ? NOTES_WITH_FLAT : NOTES_WITH_SHARP;

  return notesArray[chromaticIndex];
}
