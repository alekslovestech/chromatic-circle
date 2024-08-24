import { CHORD_AND_INTERVAL_OFFSETS } from "../types/ChordConstants";
import { TWELVE } from "../types/NoteConstants";

import { NotationType } from "../types/NotationType";
import { Accidental } from "../types/Accidental";
import { GetAccidentalSign, GetNoteWithAccidentalFromIndex } from "./NoteUtils";
import { InputMode } from "../types/InputMode";
import {
  ActualIndex,
  ChromaticIndex,
  IndexAndOffset,
  OctaveOffset,
} from "../types/IndexTypes";

export function ChromaticToActual(
  chromaticIndex: ChromaticIndex,
  octaveOffset: OctaveOffset
): ActualIndex {
  return (octaveOffset * TWELVE + chromaticIndex) as ActualIndex;
}

export function ActualToChromatic(actualIndex: ActualIndex): IndexAndOffset {
  return {
    chromaticIndex: (actualIndex % TWELVE) as ChromaticIndex,
    octaveOffset: Math.floor(actualIndex / TWELVE) as OctaveOffset,
  };
}

export function isBlackKey(actualIndex: ActualIndex) {
  return [1, 3, 6, 8, 10].includes(actualIndex % TWELVE);
}

export function UpdateIndices(
  inputMode: InputMode,
  selectedChordType: string,
  selectedNoteIndices: ActualIndex[], //actualIndices
  newActualIndex: ActualIndex
): ActualIndex[] {
  let updatedIndices: ActualIndex[] = [];
  switch (inputMode) {
    case InputMode.Toggle:
      updatedIndices = selectedNoteIndices.includes(newActualIndex)
        ? selectedNoteIndices.filter((i) => i !== newActualIndex)
        : [...selectedNoteIndices, newActualIndex];
      break;
    case InputMode.IntervalPresets:
      updatedIndices = calculateChordNotesFromIndex(
        newActualIndex,
        selectedChordType
      );
      break;
    case InputMode.ChordPresets:
      updatedIndices = calculateChordNotesFromIndex(
        newActualIndex,
        selectedChordType
      );
      break;
    default:
      // Keep updatedIndices as an empty array for other input modes
      break;
  }
  return updatedIndices;
}

export const calculateChordNotesFromIndex = (
  rootIndex: ActualIndex,
  chordType: string
): ActualIndex[] => {
  const chordOffsets = CHORD_AND_INTERVAL_OFFSETS[chordType];
  const newNotes = chordOffsets.map(
    (offset: number) => (offset + rootIndex) as ActualIndex
  );

  return newNotes;
};

export const getNoteTextFromIndex = (
  actualIndex: ActualIndex,
  sharpOrFlat: Accidental,
  showOctave: boolean = false
): string => {
  const noteWithAccidental = GetNoteWithAccidentalFromIndex(
    actualIndex,
    sharpOrFlat
  );
  const accidentalSign = GetAccidentalSign(
    noteWithAccidental.accidental,
    NotationType.ScreenDisplay
  );
  const octaveString = showOctave ? noteWithAccidental.octave : "";
  return `${noteWithAccidental.noteName}${accidentalSign}${octaveString}`;
};

export const getChordName = (
  rootIndex: ActualIndex,
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
