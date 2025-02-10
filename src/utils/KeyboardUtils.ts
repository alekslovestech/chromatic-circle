import { ChromaticIndex } from "../types/ChromaticIndex";
import {
  ActualIndex,
  ixOctaveOffset,
  chromaticToActual,
  InversionIndex,
} from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import { InputMode } from "../types/InputMode";
import { IndexUtils } from "./IndexUtils";
import { ChordAndIntervalManager } from "./ChordAndIntervalManager";
import { TWELVE } from "../types/NoteConstants";

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
  if (inputMode === InputMode.Toggle || !ChordAndIntervalManager.hasInversions(selectedChordType)) {
    return false;
  }
  const rootNote = IndexUtils.rootNoteAtInversion(selectedNoteIndices, selectedInversionIndex);
  return index === rootNote;
};

export const calculateUpdatedIndices = (
  newIndex: ActualIndex,
  inputMode: InputMode,
  selectedNoteIndices: ActualIndex[],
  selectedChordType: NoteGroupingId,
  selectedInversionIndex: InversionIndex,
): ActualIndex[] => {
  if (inputMode === InputMode.Toggle)
    return IndexUtils.ToggleNewIndex(selectedNoteIndices, newIndex as ActualIndex);
  return ChordAndIntervalManager.calculateChordNotesFromIndex(
    newIndex,
    selectedChordType,
    selectedInversionIndex,
  );
};
