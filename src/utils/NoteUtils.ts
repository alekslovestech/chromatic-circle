import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { NoteWithAccidentalAndOctave } from "../types/NoteWithAccidental";
import { getNotesArray } from "../types/NoteConstants";
import { ActualIndex, actualToChromatic } from "../types/IndexTypes";

export const getNoteWithAccidentalFromIndex = (
  actualIndex: ActualIndex,
  accidentalPreference: AccidentalType,
): NoteWithAccidentalAndOctave => {
  const notesArray = getNotesArray(accidentalPreference);
  const indexAndOctave = actualToChromatic(actualIndex);
  return {
    ...notesArray[indexAndOctave.chromaticIndex],
    octave: 4 + indexAndOctave.octaveOffset,
  };
};

export const getNoteTextFromIndex = (
  actualIndex: ActualIndex,
  sharpOrFlat: AccidentalType,
  showOctave: boolean = false,
): string => {
  const noteWithAccidental = getNoteWithAccidentalFromIndex(actualIndex, sharpOrFlat);
  const accidentalSign = getAccidentalSignForDisplay(noteWithAccidental.accidental);
  const octaveString = showOctave ? noteWithAccidental.octave : "";
  return `${noteWithAccidental.noteName}${accidentalSign}${octaveString}`;
};
