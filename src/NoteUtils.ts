import { Accidental, NotationType } from "./NoteDisplayModes";

export function GetNoteNameFromIndex(
  index: number,
  accidental: Accidental,
  displayMode: NotationType
): string {
  let mainNote: string = "?";
  let accidentalSign = "";
  switch (index) {
    case 0:
      mainNote = "C";
      break;
    case 1:
      mainNote = accidental === Accidental.Sharp ? "C" : "D";
      break;
    case 2:
      mainNote = "D";
      break;
    case 3:
      mainNote = accidental === Accidental.Sharp ? "D" : "E";
      break;
    case 4:
      mainNote = "E";
      break;
    case 5:
      mainNote = "F";
      break;
    case 6:
      mainNote = accidental === Accidental.Sharp ? "F" : "G";
      break;
    case 7:
      mainNote = "G";
      break;
    case 8:
      mainNote = accidental === Accidental.Sharp ? "G" : "A";
      break;
    case 9:
      mainNote = "A";
      break;
    case 10:
      mainNote = accidental === Accidental.Sharp ? "A" : "B";
      break;
    case 11:
      mainNote = "B";
      break;
  }
  if (
    displayMode === NotationType.ScreenDisplay &&
    accidental === Accidental.Sharp
  )
    accidentalSign = "♯";
  else if (
    displayMode === NotationType.EasyScore &&
    accidental === Accidental.Sharp
  )
    accidentalSign = "#";
  else if (
    displayMode === NotationType.ScreenDisplay &&
    accidental === Accidental.Flat
  )
    accidentalSign = "♭";
  else if (
    displayMode === NotationType.EasyScore &&
    accidental === Accidental.Flat
  )
    accidentalSign = "b";

  return `${mainNote}${accidentalSign}`;
}
