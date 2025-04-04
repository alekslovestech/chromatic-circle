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

const NOTES_WITH_SHARP: NoteInfo[] = [
  new NoteInfo("C", AccidentalType.None),
  new NoteInfo("C", AccidentalType.Sharp),
  new NoteInfo("D", AccidentalType.None),
  new NoteInfo("D", AccidentalType.Sharp),
  new NoteInfo("E", AccidentalType.None),
  new NoteInfo("F", AccidentalType.None),
  new NoteInfo("F", AccidentalType.Sharp),
  new NoteInfo("G", AccidentalType.None),
  new NoteInfo("G", AccidentalType.Sharp),
  new NoteInfo("A", AccidentalType.None),
  new NoteInfo("A", AccidentalType.Sharp),
  new NoteInfo("B", AccidentalType.None),
];

const NOTES_WITH_FLAT: NoteInfo[] = [
  new NoteInfo("C", AccidentalType.None),
  new NoteInfo("D", AccidentalType.Flat),
  new NoteInfo("D", AccidentalType.None),
  new NoteInfo("E", AccidentalType.Flat),
  new NoteInfo("E", AccidentalType.None),
  new NoteInfo("F", AccidentalType.None),
  new NoteInfo("G", AccidentalType.Flat),
  new NoteInfo("G", AccidentalType.None),
  new NoteInfo("A", AccidentalType.Flat),
  new NoteInfo("A", AccidentalType.None),
  new NoteInfo("B", AccidentalType.Flat),
  new NoteInfo("B", AccidentalType.None),
];
