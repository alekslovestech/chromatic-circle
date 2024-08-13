import { NotationType } from "../types/NotationType";
import { Accidental } from "../types/Accidental";
import {
  GetAccidentalSign,
  GetNoteWithAccidentalFromIndex,
} from "./NoteUtils";
import { CHORD_OFFSETS } from "../types/ChordConstants";

export function isBlackKey(nodeIndex: number) {
  return [1, 3, 6, 8, 10].includes(nodeIndex % 12);
}

// Function to calculate notes based on root note and chord type

export const calculateChordNotesFromIndex = (
  rootIndex: number,
  chordType: string
) => {
  const chordOffsets = CHORD_OFFSETS[chordType];
  const newNotes = chordOffsets.map(
    (offset: number) => (offset + rootIndex) % 12
  );

  return newNotes;
};

export const getNoteTextFromIndex = (
  index: number,
  sharpOrFlat: Accidental
): string => {
  const noteWithAccidental = GetNoteWithAccidentalFromIndex(index, sharpOrFlat);
  const accidentalSign = GetAccidentalSign(
    noteWithAccidental.accidental,
    NotationType.ScreenDisplay
  );
  return `${noteWithAccidental.noteName}${accidentalSign}`;
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
