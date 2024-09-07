import { ActualIndex, ChromaticIndex, InversionIndex } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGrouping";
import { InputMode } from "../types/InputMode";
import { IndexUtils } from "./IndexUtils";
import { ChordAndIntervalManager } from "./ChordAndIntervalManager";
import { TWELVE } from "../types/NoteConstants";

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
  return index === rootNote; //|| index === rootNote + TWELVE;
}

export function calculateUpdatedIndices(
  newIndex: ActualIndex | ChromaticIndex,
  inputMode: InputMode,
  selectedNoteIndices: ActualIndex[],
  selectedChordType: NoteGroupingId,
  selectedInversionIndex: InversionIndex,
): ActualIndex[] {
  if (inputMode === InputMode.Toggle)
    return IndexUtils.ToggleNewIndex(selectedNoteIndices, newIndex as ActualIndex);
  return ChordAndIntervalManager.calculateChordNotesFromIndex(
    newIndex as ActualIndex,
    selectedChordType,
    selectedInversionIndex,
  );
}
