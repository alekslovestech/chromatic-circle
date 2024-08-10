import { isBlackKey } from "./ChromaticUtils";
import { Accidental, NotationType } from "./NoteDisplayModes";

function GetAccidentalSign(
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

export function GetNoteNameFromIndex(
  index: number,
  accidental: Accidental,
  displayMode: NotationType
): string {
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
  let accidentalSign = "";

  if (isBlackKey(index)) {
    accidentalSign = GetAccidentalSign(accidental, displayMode);
    if (accidental === Accidental.Sharp) {
      mainNote = noteNames[index - 1];
    } else {
      mainNote = noteNames[index + 1];
    }
  }

  return `${mainNote}${accidentalSign}`;
}
