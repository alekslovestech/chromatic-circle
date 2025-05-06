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
import { isBlackKey } from "../utils/Keyboard/KeyboardUtils";

describe("IndexUtils", () => {
  describe("normalizeIndices", () => {
    const cases = [
      { desc: "relative to root note", input: [0, 4, 7], expected: [0, 4, 7] },
      { desc: "different root note", input: [2, 6, 9], expected: [0, 4, 7] },
      { desc: "another root note", input: [11, 2, 5], expected: [0, 3, 6] },
      { desc: "negative indices", input: [-1, 3, 6], expected: [0, 4, 7] },
      { desc: "negative octave", input: [-12, -8, -5], expected: [0, 4, 7] },
      { desc: "higher octave", input: [12, 16, 19], expected: [0, 4, 7] },
      { desc: "two octaves up", input: [24, 28, 31], expected: [0, 4, 7] },
    ];

    cases.forEach(({ desc, input, expected }) => {
      it(desc, () => {
        expect(IndexUtils.normalizeIndices(input)).toEqual(expected);
      });
    });
  });

  describe("rootNoteAtInversion", () => {
    const cases = [
      { desc: "root position C", indices: [0, 4, 7], inv: 0, expected: 0 },
      { desc: "root position D", indices: [2, 6, 9], inv: 0, expected: 2 },
      { desc: "first inversion", indices: [0, 4, 7], inv: 1, expected: 7 },
      { desc: "second inversion", indices: [0, 4, 7], inv: 2, expected: 4 },
    ];

    cases.forEach(({ desc, indices, inv, expected }) => {
      it(desc, () => {
        expect(IndexUtils.rootNoteAtInversion(ixActualArray(indices), ixInversion(inv))).toEqual(
          expected,
        );
      });
    });
  });

  describe("firstNoteToLast", () => {
    const cases = [
      { input: [0, 4, 7], expected: [-8, -5, 0] },
      { input: [2, 6, 9], expected: [-6, -3, 2] },
      { input: [-1, 3, 6], expected: [3, 6, 11] },
    ];

    cases.forEach(({ input, expected }) => {
      it(`${input} -> ${expected}`, () => {
        expect(IndexUtils.firstNoteToLast(input)).toEqual(expected);
      });
    });
  });

  describe("areIndicesEqual", () => {
    const cases = [
      { desc: "identical arrays", a: [0, 4, 7], b: [0, 4, 7], expected: true },
      { desc: "different arrays", a: [2, 6, 9], b: [2, 6, 9], expected: true },
      { desc: "different lengths 1", a: [0, 4, 7], b: [0, 4], expected: false },
      { desc: "different lengths 2", a: [0, 4], b: [0, 4, 7], expected: false },
      { desc: "different elements 1", a: [0, 4, 7], b: [0, 4, 8], expected: false },
      { desc: "different elements 2", a: [2, 6, 9], b: [2, 5, 9], expected: false },
    ];

    cases.forEach(({ desc, a, b, expected }) => {
      it(desc, () => {
        expect(IndexUtils.areIndicesEqual(a, b)).toBe(expected);
      });
    });
  });

  describe("chromaticToActual", () => {
    const cases = [
      { chromatic: 0, octave: 0, expected: 0 },
      { chromatic: 11, octave: 0, expected: 11 },
      { chromatic: 0, octave: 1, expected: 12 },
      { chromatic: 11, octave: 1, expected: 23 },
    ];

    cases.forEach(({ chromatic, octave, expected }) => {
      it(`${chromatic},${octave} -> ${expected}`, () => {
        expect(chromaticToActual(ixChromatic(chromatic), ixOctaveOffset(octave))).toBe(expected);
      });
    });
  });

  describe("actualToChromatic", () => {
    const cases = [
      { actual: 0, expected: { chromaticIndex: 0, octaveOffset: 0 } },
      { actual: 11, expected: { chromaticIndex: 11, octaveOffset: 0 } },
      { actual: 12, expected: { chromaticIndex: 0, octaveOffset: 1 } },
      { actual: 23, expected: { chromaticIndex: 11, octaveOffset: 1 } },
    ];

    cases.forEach(({ actual, expected }) => {
      it(`${actual} -> chromatic:${expected.chromaticIndex},octave:${expected.octaveOffset}`, () => {
        expect(actualIndexToChromaticAndOctave(ixActual(actual))).toEqual(expected);
      });
    });
  });

  describe("isBlackKey", () => {
    const blackKeys = [1, 3, 6, 8, 10];
    const whiteKeys = [0, 2, 4, 5, 7, 9, 11];

    blackKeys.forEach((key) => {
      it(`${key} is black`, () => {
        expect(isBlackKey(ixActual(key))).toBeTruthy();
      });
    });

    whiteKeys.forEach((key) => {
      it(`${key} is white`, () => {
        expect(isBlackKey(ixActual(key))).toBeFalsy();
      });
    });
  });

  describe("shiftIndices", () => {
    const cases = [
      { desc: "shift up", input: [0, 4, 7], shift: 1, expected: [1, 5, 8] },
      { desc: "shift down", input: [0, 4, 7], shift: -1, expected: [11, 15, 18] },
      { desc: "shift 0 down", input: [0], shift: -1, expected: [11] },
      { desc: "shift 23 up", input: [23], shift: 1, expected: [12] },
    ];

    cases.forEach(({ desc, input, shift, expected }) => {
      it(desc, () => {
        expect(IndexUtils.shiftIndices(input, shift)).toEqual(expected);
      });
    });
  });
});
