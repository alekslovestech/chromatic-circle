import { ActualIndex, InversionIndex, OffsetIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";

export class IndexUtils {
  //everything relative to root note
  static normalizeIndices = (indices: number[]): number[] => {
    const rootNote = indices[0];
    return indices.map((note) => (note - rootNote + TWELVE) % TWELVE);
  };

  //if any of the indices are out of range, shift the whole chord up or down to fit
  private static fitChordToRelativeRange = (indices: number[]): OffsetIndex[] => {
    const shift = indices.some((note) => note >= TWELVE)
      ? -TWELVE
      : indices.some((note) => note < -TWELVE)
      ? TWELVE
      : 0;
    return indices.map((note) => note + shift) as OffsetIndex[];
  };

  static fitChordToAbsoluteRange = (indices: number[]): ActualIndex[] => {
    const shift = indices.some((note) => note >= 2 * TWELVE)
      ? -TWELVE
      : indices.some((note) => note < 0)
      ? +TWELVE
      : 0;
    return indices.map((note) => note + shift) as ActualIndex[];
  };

  static rootNoteAtInversion = (
    indices: ActualIndex[],
    inversionIndex: InversionIndex,
  ): ActualIndex => indices[(indices.length - inversionIndex) % indices.length] as ActualIndex;

  //put the first note at the end
  static firstNoteToLast = (indices: OffsetIndex[]): OffsetIndex[] => {
    let newIndices = [...indices] as number[];
    const firstNote = newIndices.shift()!;
    newIndices.push(firstNote + TWELVE);
    return IndexUtils.fitChordToRelativeRange(newIndices);
  };

  static areIndicesEqual = (indices1: number[], indices2: number[]): boolean =>
    indices1.length === indices2.length &&
    indices1.every((note, index) => note === indices2[index]);

  static isBlackKey = (actualIndex: ActualIndex): boolean =>
    [1, 3, 6, 8, 10].includes(actualIndex % TWELVE);
}
