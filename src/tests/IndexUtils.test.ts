import { ixActualArray, ixInversion, ixOffsetArray } from "../types/IndexTypes";
import { IndexUtils } from "../utils/IndexUtils";

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

  describe("rootNoteAtInversion", () => {
    it("should return the root note when inversionIndex is undefined", () => {
      expect(IndexUtils.rootNoteAtInversion(ixActualArray([0, 4, 7]), ixInversion(0))).toBe(0);
      expect(IndexUtils.rootNoteAtInversion(ixActualArray([2, 6, 9]), ixInversion(0))).toBe(2);
    });

    it("should return the correct root note for different inversions", () => {
      expect(IndexUtils.rootNoteAtInversion(ixActualArray([0, 4, 7]), ixInversion(0))).toBe(0);
      expect(IndexUtils.rootNoteAtInversion(ixActualArray([0, 4, 7]), ixInversion(1))).toBe(7);
      expect(IndexUtils.rootNoteAtInversion(ixActualArray([0, 4, 7]), ixInversion(2))).toBe(4);
    });
  });

  describe("firstNoteToLast", () => {
    it("should move the first note to the end and add TWELVE", () => {
      expect(IndexUtils.firstNoteToLast(ixOffsetArray([0, 4, 7]))).toEqual([-8, -5, 0]);
      expect(IndexUtils.firstNoteToLast(ixOffsetArray([2, 6, 9]))).toEqual([-6, -3, 2]);
      expect(IndexUtils.firstNoteToLast(ixOffsetArray([-1, 3, 6]))).toEqual([3, 6, 11]);
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
