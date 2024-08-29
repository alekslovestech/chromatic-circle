import { NoteGroupingId } from "../types/ChordConstants";
import { TWELVE } from "../types/NoteConstants";

import { NotationType } from "../types/NotationType";
import { Accidental } from "../types/Accidental";
import { getAccidentalSign, getNoteWithAccidentalFromIndex } from "./NoteUtils";
import { InputMode } from "../types/InputMode";
import { ActualIndex, ChromaticIndex, IndexAndOffset, OctaveOffset } from "../types/IndexTypes";
import { NoteGroupingName, NoteGroupingType } from "../types/NoteGrouping";
import { ChordAndIntervalManager } from "./ChordAndIntervalManager";

export function chromaticToActual(
  chromaticIndex: ChromaticIndex,
  octaveOffset: OctaveOffset,
): ActualIndex {
  return (octaveOffset * TWELVE + chromaticIndex) as ActualIndex;
}

export function actualToChromatic(actualIndex: ActualIndex): IndexAndOffset {
  return {
    chromaticIndex: (actualIndex % TWELVE) as ChromaticIndex,
    octaveOffset: Math.floor(actualIndex / TWELVE) as OctaveOffset,
  };
}

export function isBlackKey(actualIndex: ActualIndex) {
  return [1, 3, 6, 8, 10].includes(actualIndex % TWELVE);
}

export function updateIndices(
  inputMode: InputMode,
  selectedChordType: NoteGroupingId,
  selectedNoteIndices: ActualIndex[], //actualIndices
  newActualIndex: ActualIndex,
): ActualIndex[] {
  let updatedIndices: ActualIndex[] = [];
  switch (inputMode) {
    case InputMode.Toggle:
      updatedIndices = selectedNoteIndices.includes(newActualIndex)
        ? selectedNoteIndices.filter((i) => i !== newActualIndex)
        : [...selectedNoteIndices, newActualIndex];
      updatedIndices.sort((a, b) => a - b);
      break;
    case InputMode.SingleNote:
      updatedIndices = calculateChordNotesFromIndex(newActualIndex, NoteGroupingId.Note);
      break;
    case InputMode.IntervalPresets:
    case InputMode.ChordPresets:
      updatedIndices = calculateChordNotesFromIndex(newActualIndex, selectedChordType);
      break;
    default:
      // Keep updatedIndices as an empty array for other input modes
      break;
  }
  return updatedIndices;
}

export const calculateChordNotesFromIndex = (
  rootIndex: ActualIndex,
  chordType: NoteGroupingId,
): ActualIndex[] => {
  const chordOffsets = ChordAndIntervalManager.getOffsetsFromName(chordType.toString()); //CHORD_AND_INTERVAL_OFFSETS[chordType].rootChord;
  const newNotes = chordOffsets.map((offset: number) => (offset + rootIndex) as ActualIndex);

  return newNotes;
};

export const getNoteTextFromIndex = (
  actualIndex: ActualIndex,
  sharpOrFlat: Accidental,
  showOctave: boolean = false,
): string => {
  const noteWithAccidental = getNoteWithAccidentalFromIndex(actualIndex, sharpOrFlat);
  const accidentalSign = getAccidentalSign(
    noteWithAccidental.accidental,
    NotationType.ScreenDisplay,
  );
  const octaveString = showOctave ? noteWithAccidental.octave : "";
  return `${noteWithAccidental.noteName}${accidentalSign}${octaveString}`;
};

export const getChordName = (
  rootIndex: ActualIndex,
  chordType: NoteGroupingId,
  accidental: Accidental,
) => {
  const rootNote = getNoteTextFromIndex(rootIndex, accidental);
  if (chordType === NoteGroupingId.Note) {
    return rootNote;
  }
  return `${rootNote} ${chordType}`;
};

export const detectChordName = (
  selectedNoteIndices: ActualIndex[],
  selectedAccidental: Accidental,
): NoteGroupingName => {
  if (selectedNoteIndices.length === 0)
    return { noteGrouping: NoteGroupingType.None, name: "No notes selected" };
  if (selectedNoteIndices.length === 1)
    return {
      noteGrouping: NoteGroupingType.Note,
      name: getNoteTextFromIndex(selectedNoteIndices[0], selectedAccidental),
    };

  const rootNote = selectedNoteIndices[0];
  const chordsAndIntervals = selectedNoteIndices.map((note) => (note - rootNote + TWELVE) % TWELVE);
  if (selectedNoteIndices.length === 2) {
    const intervalDefinitions = ChordAndIntervalManager.getAllIntervalDefinitions();
    for (const intervalDef of intervalDefinitions) {
      if (
        chordsAndIntervals.length === 2 &&
        chordsAndIntervals.every((interval) => intervalDef.rootChord.includes(interval))
      ) {
        return { noteGrouping: NoteGroupingType.Interval, name: intervalDef.id.toString() };
      }
    }
    return {
      noteGrouping: NoteGroupingType.Interval,
      name: "Unknown interval",
    };
  }

  const chordDefinitions = ChordAndIntervalManager.getAllChordDefinitions();
  for (const chordDef of chordDefinitions) {
    if (
      chordsAndIntervals.length === chordDef.rootChord.length &&
      chordsAndIntervals.every((interval) => chordDef.rootChord.includes(interval))
    ) {
      return {
        noteGrouping: NoteGroupingType.Chord,
        name: `${getNoteTextFromIndex(rootNote, selectedAccidental)} ${chordDef.id.toString()}`,
      };
    }
  }

  return {
    noteGrouping: NoteGroupingType.Chord,
    name: "Unknown chord",
  };
};

export function getMultiplierFromIndex(index: number) {
  return Math.pow(2, index / TWELVE);
}
