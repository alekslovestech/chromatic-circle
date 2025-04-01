import { AccidentalType } from "./AccidentalType";
import { ChromaticIndex } from "./ChromaticIndex";
import { NoteInfo } from "./NoteInfo";

export const TWELVE = 12; //the magic number
export const TWENTY4 = 2 * TWELVE;
export const getNotesArray = (preference: AccidentalType) =>
  preference === AccidentalType.Flat ? NOTES_WITH_FLAT : NOTES_WITH_SHARP;

export const getBasicNoteInfo = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): NoteInfo => {
  const notesArray = getNotesArray(accidentalPreference);
  return notesArray[chromaticIndex];
};

const NOTES_WITH_SHARP = [
  { noteName: "C", accidental: AccidentalType.None },
  { noteName: "C", accidental: AccidentalType.Sharp },
  { noteName: "D", accidental: AccidentalType.None },
  { noteName: "D", accidental: AccidentalType.Sharp },
  { noteName: "E", accidental: AccidentalType.None },
  { noteName: "F", accidental: AccidentalType.None },
  { noteName: "F", accidental: AccidentalType.Sharp },
  { noteName: "G", accidental: AccidentalType.None },
  { noteName: "G", accidental: AccidentalType.Sharp },
  { noteName: "A", accidental: AccidentalType.None },
  { noteName: "A", accidental: AccidentalType.Sharp },
  { noteName: "B", accidental: AccidentalType.None },
];

const NOTES_WITH_FLAT = [
  { noteName: "C", accidental: AccidentalType.None },
  { noteName: "D", accidental: AccidentalType.Flat },
  { noteName: "D", accidental: AccidentalType.None },
  { noteName: "E", accidental: AccidentalType.Flat },
  { noteName: "E", accidental: AccidentalType.None },
  { noteName: "F", accidental: AccidentalType.None },
  { noteName: "G", accidental: AccidentalType.Flat },
  { noteName: "G", accidental: AccidentalType.None },
  { noteName: "A", accidental: AccidentalType.Flat },
  { noteName: "A", accidental: AccidentalType.None },
  { noteName: "B", accidental: AccidentalType.Flat },
  { noteName: "B", accidental: AccidentalType.None },
];
