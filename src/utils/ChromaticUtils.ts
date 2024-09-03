import { TWELVE } from "../types/NoteConstants";
import { NoteGroupingId } from "../types/NoteGrouping";
import { InputMode } from "../types/InputMode";
import { ActualIndex } from "../types/IndexTypes";
import { ChordAndIntervalManager } from "./ChordAndIntervalManager";

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
      updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
        newActualIndex,
        NoteGroupingId.Note,
      );
      break;
    case InputMode.IntervalPresets:
    case InputMode.ChordPresets:
      updatedIndices = ChordAndIntervalManager.calculateChordNotesFromIndex(
        newActualIndex,
        selectedChordType,
      );
      break;
    default:
      // Keep updatedIndices as an empty array for other input modes
      break;
  }
  return updatedIndices;
}
