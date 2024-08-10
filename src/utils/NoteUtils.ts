import { isBlackKey } from "../ChromaticUtils";
import { NotationType } from "./NotationType";
import { Accidental } from "./Accidental";
import { NoteWithAccidental } from "./NoteWithAccidental";

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
  const noteNames = [
    "C",
    "C",
    "D",
    "D",
    "E",
    "F",
    "F",
    "G",
    "G",
    "A",
    "A",
    "B",
  ];
  let mainNote = noteNames[index];
  let accidentalSign = Accidental.None;

  if (isBlackKey(index)) {
    accidentalSign = accidentalPreference; //GetAccidentalSign(accidentalPreference, displayMode);
    if (accidentalPreference === Accidental.Sharp) {
      mainNote = noteNames[index - 1];
    } else {
      mainNote = noteNames[index + 1];
    }
  }

  return { noteName: mainNote, accidental: accidentalSign };
}
