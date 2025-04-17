import { ChordType, IntervalType, SpecialType } from "../types/NoteGroupingTypes";
import { ixActualArray } from "../types/IndexTypes";
import { IChordMatch } from "../types/ChordMatch";
import { ChordUtils } from "../utils/ChordUtils";

function verifyChordMatch(
  rootNote: number,
  type: ChordType | IntervalType | SpecialType,
  inversionIndex: number,
  indices: number[],
) {
  const actual: IChordMatch = ChordUtils.getMatchFromIndices(ixActualArray(indices));
  expect(actual.rootNote).toBe(rootNote);
  expect(actual.definition.id).toBe(type);
  expect(actual.inversionIndex).toBe(inversionIndex);
}

describe("ChordMatch tests", () => {
  test("empty indices", () => {
    verifyChordMatch(0, SpecialType.None, 0, []);
  });

  test("major chord", () => {
    verifyChordMatch(0, ChordType.Major, 0, [0, 4, 7]);
  });

  test("minor chord", () => {
    verifyChordMatch(0, ChordType.Minor, 0, [0, 3, 7]);
  });

  test("minor chord with root note", () => {
    verifyChordMatch(2, ChordType.Minor, 0, [2, 5, 9]);
  });

  test("major chord with root note", () => {
    verifyChordMatch(1, ChordType.Major, 0, [1, 5, 8]);
  });

  test("major chord first inversion", () => {
    verifyChordMatch(0, ChordType.Major, 1, [4, 7, 12]);
  });

  test("major chord second inversion", () => {
    verifyChordMatch(0, ChordType.Major, 2, [7, 12, 16]);
  });

  test("dominant 7 chord", () => {
    verifyChordMatch(0, ChordType.Dominant7, 0, [0, 4, 7, 10]);
  });

  test("major 7 chord third inversion", () => {
    verifyChordMatch(0, ChordType.Major7, 3, [11, 12, 16, 19]);
  });

  test("diminished chord", () => {
    verifyChordMatch(0, ChordType.Diminished, 0, [0, 3, 6]);
  });

  test("augmented chord", () => {
    verifyChordMatch(0, ChordType.Augmented, 0, [0, 4, 8]);
  });

  test("sus4 chord", () => {
    verifyChordMatch(0, ChordType.Sus4, 0, [0, 5, 7]);
  });

  test("single note", () => {
    verifyChordMatch(0, SpecialType.Note, 0, [0]);
  });

  test("fifth interval", () => {
    verifyChordMatch(0, IntervalType.Fifth, 0, [0, 7]);
  });

  test("unknown chord", () => {
    verifyChordMatch(0, ChordType.Unknown, 0, [0, 1, 2]);
  });

  test("unknown chord with root note", () => {
    verifyChordMatch(0, ChordType.Unknown, 0, [0, 2, 4]);
  });
});
