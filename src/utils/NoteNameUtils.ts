import { Accidental } from "../types/Accidental";
import { ActualIndex } from "../types/IndexTypes";
import { NotationType } from "../types/NotationType";
import { NoteGroupingId } from "../types/NoteGrouping";
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

function SimplifyMinMaj(groupingId: NoteGroupingId): string {
  if (groupingId === NoteGroupingId.Chord_Maj) {
    return "";
  } else if (groupingId === NoteGroupingId.Chord_Min) {
    return "m";
  }
  return groupingId.toString();
}

export function computeChordName(
  groupingId: NoteGroupingId,
  rootNoteIndex: ActualIndex,
  bassNoteIndex: ActualIndex,
  preferredAccidental: Accidental,
): string {
  const rootNoteName = getNoteTextFromIndex(rootNoteIndex, preferredAccidental);
  const chordNameRoot = `${rootNoteName}${SimplifyMinMaj(groupingId)}`;
  if (bassNoteIndex !== rootNoteIndex) {
    const bassNoteName = getNoteTextFromIndex(bassNoteIndex, preferredAccidental);
    return `${chordNameRoot}/${bassNoteName}`;
  }
  return chordNameRoot;
}
