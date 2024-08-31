import { IndexUtils } from "./IndexUtils";

describe("IndexUtils", () => {
  describe("normalizeIndices", () => {
    it("should normalize indices relative to root note", () => {
      expect(IndexUtils.normalizeIndices([0, 4, 7])).toEqual([0, 4, 7]);
      expect(IndexUtils.normalizeIndices([2, 6, 9])).toEqual([0, 4, 7]);
      expect(IndexUtils.normalizeIndices([11, 2, 5])).toEqual([0, 3, 6]);
    });

    it("should handle negative indices", () => {
      expect(IndexUtils.normalizeIndices([-1, 3, 6])).toEqual([0, 4, 7]);
      expect(IndexUtils.normalizeIndices([-12, -8, -5])).toEqual([0, 4, 7]);
    });

    it("should handle indices greater than 11", () => {
      expect(IndexUtils.normalizeIndices([12, 16, 19])).toEqual([0, 4, 7]);
      expect(IndexUtils.normalizeIndices([24, 28, 31])).toEqual([0, 4, 7]);
    });
  });

  describe("fitChordToRange", () => {
    it("should not change indices within range", () => {
      expect(IndexUtils.fitChordToRange([0, 4, 7])).toEqual([0, 4, 7]);
      expect(IndexUtils.fitChordToRange([2, 6, 9])).toEqual([2, 6, 9]);
    });

    it("should shift indices down if any are >= TWELVE", () => {
      expect(IndexUtils.fitChordToRange([0, 4, 12])).toEqual([-12, -8, 0]);
      expect(IndexUtils.fitChordToRange([12, 16, 19])).toEqual([0, 4, 7]);
    });

    it("should shift indices up if any are < -TWELVE", () => {
      expect(IndexUtils.fitChordToRange([-13, -9, -6])).toEqual([-1, 3, 6]);
      expect(IndexUtils.fitChordToRange([-14, -8, -5])).toEqual([-2, 4, 7]);
    });
  });

  describe("rootNoteAtInversion", () => {
    it("should return the root note when inversionIndex is undefined", () => {
      expect(IndexUtils.rootNoteAtInversion([0, 4, 7], undefined)).toBe(0);
      expect(IndexUtils.rootNoteAtInversion([2, 6, 9], undefined)).toBe(2);
    });

    it("should return the correct root note for different inversions", () => {
      expect(IndexUtils.rootNoteAtInversion([0, 4, 7], 0)).toBe(7);
      expect(IndexUtils.rootNoteAtInversion([0, 4, 7], 1)).toBe(4);
      expect(IndexUtils.rootNoteAtInversion([0, 4, 7], 2)).toBe(0);
    });
  });

  describe("firstNoteToLast", () => {
    it("should move the first note to the end and add TWELVE", () => {
      expect(IndexUtils.firstNoteToLast([0, 4, 7])).toEqual([4, 7, 12]);
      expect(IndexUtils.firstNoteToLast([2, 6, 9])).toEqual([6, 9, 14]);
      expect(IndexUtils.firstNoteToLast([-1, 3, 6])).toEqual([3, 6, 11]);
    });
  });

  describe("areIndicesEqual", () => {
    it("should return true for identical arrays", () => {
      expect(IndexUtils.areIndicesEqual([0, 4, 7], [0, 4, 7])).toBe(true);
      expect(IndexUtils.areIndicesEqual([2, 6, 9], [2, 6, 9])).toBe(true);
    });

    it("should return false for arrays with different lengths", () => {
      expect(IndexUtils.areIndicesEqual([0, 4, 7], [0, 4])).toBe(false);
      expect(IndexUtils.areIndicesEqual([0, 4], [0, 4, 7])).toBe(false);
    });

    it("should return false for arrays with different elements", () => {
      expect(IndexUtils.areIndicesEqual([0, 4, 7], [0, 4, 8])).toBe(false);
      expect(IndexUtils.areIndicesEqual([2, 6, 9], [2, 5, 9])).toBe(false);
    });
  });
});
