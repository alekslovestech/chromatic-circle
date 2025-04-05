import { AccidentalType } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { NoteConverter } from "../types/NoteConverter";

export const getNoteTextFromActualIndex = (
  actualIndex: ActualIndex,
  accidentalPreference: AccidentalType,
): string => {
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  const noteInfo = NoteConverter.getBasicNoteInfo(chromaticIndex, accidentalPreference);
  return noteInfo.formatNoteNameForDisplay();
};
