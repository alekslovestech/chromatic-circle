import { ChromaticIndex } from "../types/ChromaticIndex";
import {
  ActualIndex,
  ixOctaveOffset,
  chromaticToActual,
  InversionIndex,
} from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import { InputMode } from "../types/SettingModes";
import { TWELVE } from "../types/NoteConstants";

import { IndexUtils } from "./IndexUtils";
import { ChordUtils } from "./ChordUtils";

export const isBlackKey = (actualIndex: ActualIndex | ChromaticIndex): boolean =>
  [1, 3, 6, 8, 10].includes(actualIndex % TWELVE);

export const isSelectedEitherOctave = (
  chromaticIndex: ChromaticIndex,
  selectedNoteIndices: ActualIndex[],
): boolean => {
  const actualIndex0 = chromaticToActual(chromaticIndex, ixOctaveOffset(0));
  const actualIndex1 = chromaticToActual(chromaticIndex, ixOctaveOffset(1));
  return selectedNoteIndices.includes(actualIndex0) || selectedNoteIndices.includes(actualIndex1);
};

export const isRootNote = (
  index: ActualIndex,
  selectedNoteIndices: ActualIndex[],
  selectedInversionIndex: InversionIndex,
  inputMode: InputMode,
  selectedChordType: NoteGroupingId,
): boolean => {
  if (inputMode === InputMode.Toggle || !ChordUtils.hasInversions(selectedChordType)) {
    return false;
  }
  const rootNote = IndexUtils.rootNoteAtInversion(selectedNoteIndices, selectedInversionIndex);
  return index === rootNote;
};
