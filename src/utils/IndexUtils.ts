import { TWELVE } from "../types/NoteConstants";

export class IndexUtils {
  //everything relative to root note
  static normalizeIndices = (indices: number[]): number[] => {
    const rootNote = indices[0];
    return indices.map((note) => (note - rootNote + TWELVE) % TWELVE);
  };

  //if any of the indices are out of range, shift the whole chord up or down to fit
  static fitChordToRange = (indices: number[]): number[] => {
    if (indices.some((note) => note >= TWELVE)) {
      return indices.map((note) => note - TWELVE);
    } else if (indices.some((note) => note < -TWELVE)) {
      return indices.map((note) => note + TWELVE);
    }
    return indices;
  };

  //put the first note at the end
  static firstNoteToLast = (indices: number[]): number[] => {
    let newIndices = [...indices];
    const firstNote = newIndices.shift()!;
    newIndices.push(firstNote + TWELVE);
    return newIndices;
  };

  static areIndicesEqual = (indices1: number[], indices2: number[]): boolean =>
    indices1.length === indices2.length &&
    indices1.every((note, index) => note === indices2[index]);
}
