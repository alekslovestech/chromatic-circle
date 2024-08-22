import { CHORD_OFFSETS } from "../types/ChordConstants";
import { TWELVE } from "../types/NoteConstants";

import { NotationType } from "../types/NotationType";
import { Accidental } from "../types/Accidental";
import { GetAccidentalSign, GetNoteWithAccidentalFromIndex } from "./NoteUtils";
import { InputMode } from "../types/InputMode";

export function isBlackKey(chromaticIndex: number) {
  return [1, 3, 6, 8, 10].includes(chromaticIndex % TWELVE);
}

export function UpdateIndices(
  inputMode: InputMode,
  selectedChordType: string,
  selectedNoteIndices: number[],
  noteIndex: number
): number[] {
  let updatedIndices: number[] = [];
  if (inputMode === InputMode.Toggle) {
    updatedIndices = selectedNoteIndices.includes(noteIndex)
      ? selectedNoteIndices.filter((i) => i !== noteIndex)
      : [...selectedNoteIndices, noteIndex];
  } else if (inputMode === InputMode.Presets) {
    updatedIndices = calculateChordNotesFromIndex(noteIndex, selectedChordType);
  }
  return updatedIndices;
}

export const calculateChordNotesFromIndex = (
  rootIndex: number,
  chordType: string
) => {
  const chordOffsets = CHORD_OFFSETS[chordType];
  const newNotes = chordOffsets.map(
    (offset: number) => (offset + rootIndex) % TWELVE
  );

  return newNotes;
};

export const getNoteTextFromIndex = (
  index: number,
  sharpOrFlat: Accidental,
  showOctave: boolean = false
): string => {
  const noteWithAccidental = GetNoteWithAccidentalFromIndex(index, sharpOrFlat);
  const accidentalSign = GetAccidentalSign(
    noteWithAccidental.accidental,
    NotationType.ScreenDisplay
  );
  const octaveString = showOctave ? noteWithAccidental.octave : "";
  return `${noteWithAccidental.noteName}${accidentalSign}${octaveString}`;
};

export const getChordName = (
  rootIndex: number,
  chordType: string,
  accidental: Accidental
) => {
  const rootNote = getNoteTextFromIndex(rootIndex, accidental);
  if (chordType === "note") {
    return rootNote;
  }
  return `${rootNote} ${chordType}`;
};

export function GetMultiplierFromIndex(index: number) {
  return Math.pow(2, index / TWELVE);
}
