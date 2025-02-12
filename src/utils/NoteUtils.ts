import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { getNotesArray } from "../types/NoteConstants";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { ChromaticIndex } from "../types/ChromaticIndex";

//this function only exported because we use it in tests
export const getNoteNameForDisplay = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): string => {
  const { noteName, accidental } = getNotesArray(accidentalPreference)[chromaticIndex];
  const accidentalSign = getAccidentalSignForDisplay(accidental);
  return `${noteName}${accidentalSign}`;
};

export const getNoteTextFromActualIndex = (
  actualIndex: ActualIndex,
  accidentalPreference: AccidentalType,
): string => {
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  return getNoteNameForDisplay(chromaticIndex, accidentalPreference);
};
