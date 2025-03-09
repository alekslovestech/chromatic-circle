import { ixChromatic } from "../types/ChromaticIndex";
import {
  actualIndexToChromaticAndOctave,
  chromaticToActual,
  ixActual,
  ixActualArray,
  ixInversion,
  ixOctaveOffset,
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
    function verifyRootNoteAtInversion(
      indices: number[],
      inversionIndex: number,
      expectedRootNote: number,
    ) {
      expect(
        IndexUtils.rootNoteAtInversion(ixActualArray(indices), ixInversion(inversionIndex)),
      ).toEqual(expectedRootNote);
    }

    it("should return the root note when inversionIndex is undefined", () => {
      verifyRootNoteAtInversion([0, 4, 7], 0, 0);
      verifyRootNoteAtInversion([2, 6, 9], 0, 2);
    });

    it("should return the correct root note for different inversions", () => {
      verifyRootNoteAtInversion([0, 4, 7], 0, 0);
      verifyRootNoteAtInversion([0, 4, 7], 1, 7);
      verifyRootNoteAtInversion([0, 4, 7], 2, 4);
    });
  });

  describe("firstNoteToLast", () => {
    it("should move the first note to the end and add TWELVE", () => {
      expect(IndexUtils.firstNoteToLast([0, 4, 7])).toEqual([-8, -5, 0]);
      expect(IndexUtils.firstNoteToLast([2, 6, 9])).toEqual([-6, -3, 2]);
      expect(IndexUtils.firstNoteToLast([-1, 3, 6])).toEqual([3, 6, 11]);
    });
  });

  describe("areIndicesEqual", () => {
    it("should return true for identical arrays", () => {
      expect(IndexUtils.areIndicesEqual([0, 4, 7], [0, 4, 7])).toBeTruthy();
      expect(IndexUtils.areIndicesEqual([2, 6, 9], [2, 6, 9])).toBeTruthy();
    });

    it("should return false for arrays with different lengths", () => {
      expect(IndexUtils.areIndicesEqual([0, 4, 7], [0, 4])).toBeFalsy();
      expect(IndexUtils.areIndicesEqual([0, 4], [0, 4, 7])).toBeFalsy();
    });

    it("should return false for arrays with different elements", () => {
      expect(IndexUtils.areIndicesEqual([0, 4, 7], [0, 4, 8])).toBeFalsy();
      expect(IndexUtils.areIndicesEqual([2, 6, 9], [2, 5, 9])).toBeFalsy();
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
      expect(actualIndexToChromaticAndOctave(ixActual(0))).toEqual({
        chromaticIndex: 0,
        octaveOffset: 0,
      });
      expect(actualIndexToChromaticAndOctave(ixActual(11))).toEqual({
        chromaticIndex: 11,
        octaveOffset: 0,
      });
      expect(actualIndexToChromaticAndOctave(ixActual(12))).toEqual({
        chromaticIndex: 0,
        octaveOffset: 1,
      });
      expect(actualIndexToChromaticAndOctave(ixActual(23))).toEqual({
        chromaticIndex: 11,
        octaveOffset: 1,
      });
    });
  });

  describe("isBlackKey", () => {
    it("should return true for black keys", () => {
      expect(isBlackKey(ixActual(1))).toBeTruthy();
      expect(isBlackKey(ixActual(3))).toBeTruthy();
      expect(isBlackKey(ixActual(6))).toBeTruthy();
      expect(isBlackKey(ixActual(8))).toBeTruthy();
      expect(isBlackKey(ixActual(10))).toBeTruthy();
    });

    it("should return false for white keys", () => {
      expect(isBlackKey(ixActual(0))).toBeFalsy();
      expect(isBlackKey(ixActual(2))).toBeFalsy();
      expect(isBlackKey(ixActual(4))).toBeFalsy();
      expect(isBlackKey(ixActual(5))).toBeFalsy();
      expect(isBlackKey(ixActual(7))).toBeFalsy();
      expect(isBlackKey(ixActual(9))).toBeFalsy();
      expect(isBlackKey(ixActual(11))).toBeFalsy();
    });
  });

  describe("shiftIndices", () => {
    it("should shift indices by a given amount", () => {
      expect(IndexUtils.shiftIndices([0, 4, 7], 1)).toEqual([1, 5, 8]);
      expect(IndexUtils.shiftIndices([0, 4, 7], -1)).toEqual([11, 15, 18]);
    });
    it("should handle shifting 0 down by -1", () => {
      expect(IndexUtils.shiftIndices([0], -1)).toEqual([11]);
    });

    it("should handle shifting 23 up by 1", () => {
      expect(IndexUtils.shiftIndices([23], 1)).toEqual([12]);
    });
  });
});
