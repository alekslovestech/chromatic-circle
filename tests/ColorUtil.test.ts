import { ColorUtils } from "../utils/ColorUtils";

describe("ColorUtils.cyclicIntervals", () => {
  const testCases = [
    {
      name: "empty array returns empty array",
      input: [],
      expected: [],
    },
    {
      name: "single note returns empty array",
      input: [0],
      expected: [],
    },
    {
      name: "two notes returns single interval",
      input: [0, 4],
      expected: [4, 8],
    },
    {
      name: "two notes returns single interval - different notes",
      input: [7, 11],
      expected: [4, 8],
    },
    {
      name: "wraps around octave boundary",
      input: [10, 1],
      expected: [3, 9],
    },
    {
      name: "major triad",
      input: [0, 4, 7],
      expected: [3, 5, 4],
    },
    {
      name: "major triad inversion",
      input: [4, 0, 7],
      expected: [3, 5, 4],
    },
    {
      name: "major triad inversion 2",
      input: [7, 4, 0],
      expected: [3, 5, 4],
    },
    {
      name: "major triad spread",
      input: [0, 7, 16],
      expected: [3, 5, 4],
    },
    {
      name: "minor triad",
      input: [0, 3, 7],
      expected: [3, 4, 5],
    },

    {
      name: "minor triad on octave boundary",
      input: [10, 1, 5],
      expected: [3, 4, 5],
    },
    {
      name: "minor triad inversion",
      input: [3, 0, 7],
      expected: [3, 4, 5],
    },
    {
      name: "diminished triad",
      input: [0, 3, 6],
      expected: [3, 3, 6],
    },
    {
      name: "augmented triad",
      input: [0, 4, 8],
      expected: [4, 4, 4],
    },
    {
      name: "diminished7",
      input: [0, 3, 6, 9],
      expected: [3, 3, 3, 3],
    },
    {
      name: "sus4",
      input: [0, 5, 7],
      expected: [2, 5, 5],
    },
    {
      name: "sus2",
      input: [0, 2, 7],
      expected: [2, 5, 5],
    },
    { name: "min6", input: [0, 3, 7, 9], expected: [2, 3, 3, 4] },
    { name: "min6 inversion", input: [9, 0, 3, 7], expected: [2, 3, 3, 4] },
    { name: "min6 from Bb", input: [10, 1, 5, 7], expected: [2, 3, 3, 4] },
    { name: "ø7", input: [0, 3, 6, 10], expected: [2, 3, 3, 4] },
  ];

  test.each(testCases)("$name", ({ input, expected }) => {
    expect(ColorUtils.cyclicIntervalsFromActualIndices(input)).toEqual(expected);
  });
});
