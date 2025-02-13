import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { getNotesArray } from "../types/NoteConstants";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { ChromaticIndex } from "../types/ChromaticIndex";
import { NoteInfo } from "../types/NoteInfo";

export const getBasicNoteInfo = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): NoteInfo => {
  const notesArray = getNotesArray(accidentalPreference);
  return notesArray[chromaticIndex];
};

//this function only exported because we use it in tests
export const formatNoteNameForDisplay = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): string => {
  const noteAtIndex = getBasicNoteInfo(chromaticIndex, accidentalPreference);
  const accidentalSign = getAccidentalSignForDisplay(noteAtIndex.accidental);
  return `${noteAtIndex.noteName}${accidentalSign}`;
};

export const getNoteTextFromActualIndex = (
  actualIndex: ActualIndex,
  accidentalPreference: AccidentalType,
): string => {
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  return formatNoteNameForDisplay(chromaticIndex, accidentalPreference);
};
