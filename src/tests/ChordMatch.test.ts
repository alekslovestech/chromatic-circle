import { ChordType, IntervalType, NoteGroupingId, SpecialType } from "../types/NoteGroupingTypes";
import { ixActual, ixActualArray, ixInversion } from "../types/IndexTypes";
import { ChordMatch } from "../types/ChordMatch";
import { ChordUtils } from "../utils/ChordUtils";

function verifyChordMatch(
  expectedRootNote: number,
  expectedDefinitionId: NoteGroupingId,
  expectedInversionIndex: number,
  indices: number[],
) {
  const actual: ChordMatch = ChordUtils.getMatchFromIndices(ixActualArray(indices));
  expect(actual).toBeDefined();
  expect(actual.rootNote).toBe(ixActual(expectedRootNote));
  expect(actual.definition.id).toBe(expectedDefinitionId);
  expect(actual.inversionIndex).toBe(ixInversion(expectedInversionIndex));
}

describe("ChordMatch tests", () => {
  describe("getMatchFromIndices", () => {
    it('should return "No notes selected" for empty array', () => {
      verifyChordMatch(0, SpecialType.None, 0, []);
    });

    it("should correctly identify a major chord in root position", () => {
      verifyChordMatch(0, ChordType.Major, 0, [0, 4, 7]);
    });

    it("should correctly identify a minor chord in root position", () => {
      verifyChordMatch(0, ChordType.Minor, 0, [0, 3, 7]);
    });

    it("should correctly identify Dm", () => {
      verifyChordMatch(2, ChordType.Minor, 0, [2, 5, 9]);
    });

    it("should correctly identify a C♯/D♭ major ", () => {
      verifyChordMatch(1, ChordType.Major, 0, [1, 5, 8]);
    });

    it("should correctly identify a major chord in first inversion [1]", () => {
      verifyChordMatch(0, ChordType.Major, 1, [4, 7, 12]);
    });

    it("should correctly identify a major chord in second inversion [2]", () => {
      verifyChordMatch(0, ChordType.Major, 2, [7, 12, 16]);
    });

    it("should correctly identify a dominant seventh chord in root position", () => {
      verifyChordMatch(0, ChordType.Dominant7, 0, [0, 4, 7, 10]);
    });

    it("should correctly identify a major seventh chord in third inversion", () => {
      verifyChordMatch(0, ChordType.Major7, 3, [11, 12, 16, 19]);
    });

    it("should correctly identify a diminished chord", () => {
      verifyChordMatch(0, ChordType.Diminished, 0, [0, 3, 6]);
    });

    it("should correctly identify an augmented chord", () => {
      verifyChordMatch(0, ChordType.Augmented, 0, [0, 4, 8]);
    });

    it("should correctly identify a suspended fourth chord", () => {
      verifyChordMatch(0, ChordType.Sus4, 0, [0, 5, 7]);
    });

    it("should correctly identify a single note", () => {
      verifyChordMatch(0, SpecialType.Note, 0, [0]);
    });

    it("should correctly identify an interval", () => {
      verifyChordMatch(0, IntervalType.Fifth, 0, [0, 7]);
    });

    it("C C# D - should return C -", () => {
      verifyChordMatch(0, ChordType.Unknown, 0, [0, 1, 2]);
    });

    it("C D E - should return C -", () => {
      verifyChordMatch(0, ChordType.Unknown, 0, [0, 2, 4]);
    });
  });
});
