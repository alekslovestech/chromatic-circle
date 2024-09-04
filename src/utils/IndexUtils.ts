import { ActualIndex, InversionIndex, OffsetIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";

export class IndexUtils {
  //everything relative to root note
  static normalizeIndices = (indices: number[]): number[] => {
    const rootNote = indices[0];
    return indices.map((note) => (note - rootNote + TWELVE) % TWELVE);
  };

  //if any of the indices are out of range, shift the whole chord up or down to fit
  private static fitChordToRange = (indices: number[]): OffsetIndex[] => {
    if (indices.some((note) => note >= TWELVE)) {
      return indices.map((note) => note - TWELVE) as OffsetIndex[];
    } else if (indices.some((note) => note < -TWELVE)) {
      return indices.map((note) => note + TWELVE) as OffsetIndex[];
    }
    return indices as OffsetIndex[];
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
    let normalizedIndices = IndexUtils.fitChordToRange(newIndices);
    return normalizedIndices;
  };

  static areIndicesEqual = (indices1: number[], indices2: number[]): boolean =>
    indices1.length === indices2.length &&
    indices1.every((note, index) => note === indices2[index]);
}
