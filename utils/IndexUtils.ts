import { ActualIndex, InversionIndex } from "../types/IndexTypes";
import { TWELVE, TWENTY4 } from "../types/NoteConstants";

export class IndexUtils {
  static StringWithPaddedIndex = (prefix: string, index: number) =>
    `${prefix}${String(index).padStart(2, "0")}`;
  //everything relative to root note
  static normalizeIndices = (indices: number[]): number[] => {
    const rootNote = indices[0];
    return indices.map((note) => (note - rootNote + TWELVE) % TWELVE);
  };

  static isNoteInRange = (note: number): boolean => note >= 0 && note < TWENTY4;

  static fitChordToAbsoluteRange = (indices: number[]): number[] => {
    let newIndices = this.shiftToRange(indices, 0, TWENTY4);

    // Step 3: Check if all notes are now within range
    if (newIndices.every((note) => this.isNoteInRange(note))) return newIndices;

    // Step 4: If not all notes fit, create two possible fits
    const lowerFit = newIndices.filter((note) => this.isNoteInRange(note));
    const upperFit = newIndices
      .map((note) => (note + TWELVE) as ActualIndex)
      .filter((note) => this.isNoteInRange(note));

    // Step 5: Return the fit that preserves more notes
    if (lowerFit.length !== upperFit.length)
      return lowerFit.length > upperFit.length ? lowerFit : upperFit;

    // If both fits have the same number of notes, prefer the one that includes the lowest note
    return lowerFit.includes(indices[0]) ? lowerFit : upperFit;
  };

  static rootNoteAtInversion = (
    indices: ActualIndex[],
    inversionIndex: InversionIndex,
  ): ActualIndex => indices[(indices.length - inversionIndex) % indices.length] as ActualIndex;

  //put the first note at the end
  static firstNoteToLast = (indices: number[]): number[] => {
    let newIndices = [...indices] as number[];
    const firstNote = newIndices.shift()!;
    newIndices.push(firstNote + TWELVE);
    return this.shiftToRange(newIndices, -TWELVE, TWELVE);
  };

  static areIndicesEqual = (indices1: number[], indices2: number[]): boolean =>
    indices1.length === indices2.length &&
    indices1.every((note, index) => note === indices2[index]);

  //if the new index is already selected, remove it, otherwise add it
  static ToggleNewIndex = (
    selectedNoteIndices: ActualIndex[],
    newIndex: ActualIndex,
  ): ActualIndex[] => {
    let updatedIndices = selectedNoteIndices.includes(newIndex)
      ? selectedNoteIndices.filter((index) => index !== newIndex)
      : [...selectedNoteIndices, newIndex];
    updatedIndices = updatedIndices.sort((a, b) => a - b);
    return updatedIndices;
  };

  static shiftIndices = (indices: number[], shiftAmount: number): number[] => {
    const newIndices = indices.map((index) => index + shiftAmount);
    return this.fitChordToAbsoluteRange(newIndices);
  };

  private static shiftToRange = (indices: number[], min: number, max: number): number[] => {
    const shift = indices.some((note) => note >= max)
      ? -TWELVE
      : indices.some((note) => note < min)
      ? TWELVE
      : 0;
    return indices.map((note) => note + shift);
  };
}
