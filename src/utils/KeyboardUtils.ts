import { ActualIndex, InversionIndex } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import { InputMode } from "../types/InputMode";
import { IndexUtils } from "./IndexUtils";
import { ChordAndIntervalManager } from "./ChordAndIntervalManager";

export function isRootNote(
  index: ActualIndex,
  selectedNoteIndices: ActualIndex[],
  selectedInversionIndex: InversionIndex,
  inputMode: InputMode,
  selectedChordType: NoteGroupingId,
): boolean {
  if (inputMode === InputMode.Toggle || !ChordAndIntervalManager.hasInversions(selectedChordType)) {
    return false;
  }
  const rootNote = IndexUtils.rootNoteAtInversion(selectedNoteIndices, selectedInversionIndex);
  return index === rootNote;
}

export function calculateUpdatedIndices(
  newIndex: ActualIndex,
  inputMode: InputMode,
  selectedNoteIndices: ActualIndex[],
  selectedChordType: NoteGroupingId,
  selectedInversionIndex: InversionIndex,
): ActualIndex[] {
  if (inputMode === InputMode.Toggle)
    return IndexUtils.ToggleNewIndex(selectedNoteIndices, newIndex as ActualIndex);
  return ChordAndIntervalManager.calculateChordNotesFromIndex(
    newIndex,
    selectedChordType,
    selectedInversionIndex,
  );
}
