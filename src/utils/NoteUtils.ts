import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { NoteWithAccidentalAndOctave } from "../types/NoteWithAccidental";
import { getNotesArray } from "../types/NoteConstants";
import { ActualIndex, actualToChromatic, ChromaticIndex, ixChromatic } from "../types/IndexTypes";
import { MusicalKey } from "../types/MusicalKey";

export const getNoteWithAccidentalAndOctaveFromIndexAndKey = (
  actualIndex: ActualIndex,
  selectedMusicalKey: MusicalKey,
): NoteWithAccidentalAndOctave => {
  const chromaticIndexAndOctave = actualToChromatic(actualIndex);
  const noteWithAccidental = selectedMusicalKey.getNoteWithAccidentalFromIndexAndKey(
    chromaticIndexAndOctave.chromaticIndex,
  );

  return {
    ...noteWithAccidental,
    octave: 4 + chromaticIndexAndOctave.octaveOffset,
  };
};

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

export const noteTextToIndex = (note: string): ChromaticIndex => {
  const noteMap: { [key: string]: number } = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
  };

  return ixChromatic(noteMap[note] ?? -1);
};
