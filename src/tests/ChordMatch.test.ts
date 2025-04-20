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
  const testCases = [
    { desc: "empty indices", root: 0, type: SpecialType.None, inv: 0, indices: [] },
    { desc: "major chord", root: 0, type: ChordType.Major, inv: 0, indices: [0, 4, 7] },
    { desc: "minor chord", root: 0, type: ChordType.Minor, inv: 0, indices: [0, 3, 7] },
    {
      desc: "minor chord with root note",
      root: 2,
      type: ChordType.Minor,
      inv: 0,
      indices: [2, 5, 9],
    },
    {
      desc: "major chord with root note",
      root: 1,
      type: ChordType.Major,
      inv: 0,
      indices: [1, 5, 8],
    },
    {
      desc: "major chord first inversion",
      root: 0,
      type: ChordType.Major,
      inv: 1,
      indices: [4, 7, 12],
    },
    {
      desc: "major chord second inversion",
      root: 0,
      type: ChordType.Major,
      inv: 2,
      indices: [7, 12, 16],
    },
    {
      desc: "dominant 7 chord",
      root: 0,
      type: ChordType.Dominant7,
      inv: 0,
      indices: [0, 4, 7, 10],
    },
    {
      desc: "major 7 chord third inversion",
      root: 0,
      type: ChordType.Major7,
      inv: 3,
      indices: [11, 12, 16, 19],
    },
    { desc: "diminished chord", root: 0, type: ChordType.Diminished, inv: 0, indices: [0, 3, 6] },
    { desc: "augmented chord", root: 0, type: ChordType.Augmented, inv: 0, indices: [0, 4, 8] },
    { desc: "sus4 chord", root: 0, type: ChordType.Sus4, inv: 0, indices: [0, 5, 7] },
    { desc: "single note", root: 0, type: SpecialType.Note, inv: 0, indices: [0] },
    { desc: "fifth interval", root: 0, type: IntervalType.Fifth, inv: 0, indices: [0, 7] },
    { desc: "unknown chord", root: 0, type: ChordType.Unknown, inv: 0, indices: [0, 1, 2] },
    {
      desc: "Narrow 23 chord",
      root: 0,
      type: ChordType.Narrow23,
      inv: 0,
      indices: [0, 2, 4],
    },
    {
      desc: "spread triad major",
      root: 0,
      type: ChordType.SpreadMajor,
      inv: 0,
      indices: [0, 7, 16],
    },
    {
      desc: "spread triad minor",
      root: 0,
      type: ChordType.SpreadMinor,
      inv: 0,
      indices: [0, 7, 15],
    },
    {
      desc: "spread triad augmented",
      root: 0,
      type: ChordType.SpreadAugmented,
      inv: 0,
      indices: [0, 8, 16],
    },
    {
      desc: "spread triad diminished",
      root: 0,
      type: ChordType.SpreadDiminished,
      inv: 0,
      indices: [0, 6, 15],
    },
  ];

  testCases.forEach(({ desc, root, type, inv, indices }) => {
    test(desc, () => {
      verifyChordMatch(root, type, inv, indices);
    });
  });
});
