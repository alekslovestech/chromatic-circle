import { ixChromatic } from "../types/ChromaticIndex";
import {
  actualToChromatic,
  chromaticToActual,
  ixActual,
  ixActualArray,
  ixInversion,
  ixOctaveOffset,
  ixOffsetArray,
} from "../types/IndexTypes";
import { IndexUtils } from "../utils/IndexUtils";
import { isBlackKey } from "../utils/KeyboardUtils";

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

  describe("chromaticToActual", () => {
    it("should convert chromatic index and octave offset to actual index", () => {
      expect(chromaticToActual(ixChromatic(0), ixOctaveOffset(0))).toBe(0);
      expect(chromaticToActual(ixChromatic(11), ixOctaveOffset(0))).toBe(11);
      expect(chromaticToActual(ixChromatic(0), ixOctaveOffset(1))).toBe(12);
      expect(chromaticToActual(ixChromatic(11), ixOctaveOffset(1))).toBe(23);
    });
  });

  describe("actualToChromatic", () => {
    it("should convert actual index to chromatic index and octave offset", () => {
      expect(actualToChromatic(ixActual(0))).toEqual({ chromaticIndex: 0, octaveOffset: 0 });
      expect(actualToChromatic(ixActual(11))).toEqual({ chromaticIndex: 11, octaveOffset: 0 });
      expect(actualToChromatic(ixActual(12))).toEqual({ chromaticIndex: 0, octaveOffset: 1 });
      expect(actualToChromatic(ixActual(23))).toEqual({ chromaticIndex: 11, octaveOffset: 1 });
    });
  });

  describe("isBlackKey", () => {
    it("should return true for black keys", () => {
      expect(isBlackKey(ixActual(1))).toBe(true);
      expect(isBlackKey(ixActual(3))).toBe(true);
      expect(isBlackKey(ixActual(6))).toBe(true);
      expect(isBlackKey(ixActual(8))).toBe(true);
      expect(isBlackKey(ixActual(10))).toBe(true);
    });

    it("should return false for white keys", () => {
      expect(isBlackKey(ixActual(0))).toBe(false);
      expect(isBlackKey(ixActual(2))).toBe(false);
      expect(isBlackKey(ixActual(4))).toBe(false);
      expect(isBlackKey(ixActual(5))).toBe(false);
      expect(isBlackKey(ixActual(7))).toBe(false);
      expect(isBlackKey(ixActual(9))).toBe(false);
      expect(isBlackKey(ixActual(11))).toBe(false);
    });
  });
});
