import { InversionIndex, ixActual, ixActualArray, ixInversion } from "../types/IndexTypes";
import { ChordType } from "../types/NoteGroupingTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { ChordDisplayMode } from "../types/SettingModes";
import { KeyType } from "../types/Keys/KeyType";

import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ChordUtils } from "../utils/ChordUtils";

function verifyDisplayInfo(
  expectedNoteGrouping: string,
  expectedChordName: string,
  indices: number[],
  musicalKey: MusicalKey = DEFAULT_MUSICAL_KEY,
) {
  const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
    ixActualArray(indices),
    ChordDisplayMode.Letters_Short,
    musicalKey,
  );
  expect(result.noteGroupingString).toBe(expectedNoteGrouping);
  expect(result.chordName).toBe(expectedChordName);
}

function verifyChordNameWithMode(
  expectedChordName: string,
  indices: number[],
  displayMode: ChordDisplayMode = ChordDisplayMode.Letters_Short,
  musicalKey: MusicalKey = DEFAULT_MUSICAL_KEY,
) {
  const chordMatch = ChordUtils.getMatchFromIndices(ixActualArray(indices));
  const actual = ChordUtils.deriveChordName(chordMatch, displayMode, musicalKey);
  expect(actual).toBe(expectedChordName);
}

function verifyChordNotesFromIndex(
  expectedNotes: number[],
  index: number,
  chordType: ChordType,
  inversion: InversionIndex = ixInversion(0),
) {
  const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
    ixActual(index),
    chordType,
    inversion,
  );
  expect(result).toEqual(expectedNotes);
}

function verifyOffsetsFromIdAndInversion(
  expectedOffsets: number[],
  id: ChordType,
  inversionIndex: InversionIndex = ixInversion(0),
) {
  const result = ChordUtils.getOffsetsFromIdAndInversion(id, inversionIndex);
  expect(result).toEqual(expectedOffsets);
}

describe("ChordAndIntervalManager", () => {
  describe("getOffsetsFromIdAndInversion", () => {
    const testCases = [
      { expected: [0, 4, 7], type: ChordType.Major },
      { expected: [0, 3, 7], type: ChordType.Minor },
      { expected: [0, 4, 7, 10], type: ChordType.Dominant7 },
      { expected: [0, 4, 7, 11], type: ChordType.Major7 },
      { expected: [0, 3, 7, 10], type: ChordType.Minor7 },
      { expected: [0, 3, 6], type: ChordType.Diminished },
      { expected: [0, 4, 8], type: ChordType.Augmented },
      { expected: [0, 5, 7], type: ChordType.Sus4 },
      { expected: [-8, -5, 0], type: ChordType.Major, inversion: ixInversion(1) },
      { expected: [-5, 0, 4], type: ChordType.Major, inversion: ixInversion(2) },
      { expected: [-9, -5, 0], type: ChordType.Minor, inversion: ixInversion(1) },
      { expected: [-5, -2, 0, 4], type: ChordType.Dominant7, inversion: ixInversion(2) },
      { expected: [-1, 0, 4, 7], type: ChordType.Major7, inversion: ixInversion(3) },
    ];

    testCases.forEach(({ expected, type, inversion }) => {
      it(`should handle ${type}${inversion ? ` inversion ${inversion}` : ""}`, () => {
        verifyOffsetsFromIdAndInversion(expected, type, inversion);
      });
    });
  });

  describe("calculateChordNotesFromIndex", () => {
    const testCases = [
      { expected: [0, 4, 7], index: 0, type: ChordType.Major },
      { expected: [0, 3, 7], index: 0, type: ChordType.Minor },
      { expected: [4, 7, 12], index: 0, type: ChordType.Major, inversion: ixInversion(1) },
      { expected: [7, 10, 12, 16], index: 0, type: ChordType.Dominant7, inversion: ixInversion(2) },
      { expected: [10, 14, 17], index: 22, type: ChordType.Major },
      { expected: [3, 7, 12], index: 0, type: ChordType.Minor, inversion: ixInversion(1) },
      { expected: [7, 12, 15], index: 0, type: ChordType.Minor, inversion: ixInversion(2) },
      {
        expected: [10, 12, 16, 19],
        index: 0,
        type: ChordType.Dominant7,
        inversion: ixInversion(3),
      },
      { expected: [0, 4, 7, 10, 13], index: 0, type: ChordType.Seven13 },
      { expected: [0, 4, 7, 10, 13], index: 12, type: ChordType.Seven13 },
      { expected: [11, 15, 18, 21], index: 11, type: ChordType.Seven13 },
      { expected: [0, 4, 7, 14], index: 12, type: ChordType.Add9 },
      { expected: [11, 15, 18], index: 11, type: ChordType.Add9 },
    ];

    testCases.forEach(({ expected, index, type, inversion }) => {
      it(`should calculate ${type}${
        inversion ? ` inversion ${inversion}` : ""
      } from index ${index}`, () => {
        verifyChordNotesFromIndex(expected, index, type, inversion);
      });
    });
  });

  describe("getChordNameFromIndices", () => {
    const testCases = [
      { expected: "Ø", indices: [] },
      { expected: "M3", indices: [0, 4] },
      { expected: "C", indices: [0, 4, 7] },
      { expected: "C/E", indices: [4, 7, 12] },
      { expected: "C/G", indices: [7, 12, 16] },
      { expected: "Dm", indices: [2, 5, 9] },
      { expected: "Dm/F", indices: [5, 9, 14] },
      { expected: "E", indices: [4] },
      { expected: "Edim", indices: [4, 7, 10], mode: ChordDisplayMode.Letters_Short },
      { expected: "E°", indices: [4, 7, 10], mode: ChordDisplayMode.Symbols },
      {
        expected: "D♭",
        indices: [1, 5, 8],
        mode: ChordDisplayMode.Letters_Short,
        key: MusicalKey.fromClassicalMode("Db", KeyType.Major),
      },
      { expected: "C7", indices: [0, 4, 7, 10], mode: ChordDisplayMode.Letters_Long },
      { expected: "C7", indices: [0, 4, 7, 10], mode: ChordDisplayMode.Symbols },
      { expected: "Csus4", indices: [0, 5, 7] },
      { expected: "C-", indices: [0, 1, 2] },
    ];

    testCases.forEach(({ expected, indices, mode, key }) => {
      it(`should return "${expected}" for given indices`, () => {
        verifyChordNameWithMode(expected, indices, mode, key);
      });
    });
  });

  describe("getDisplayPropertiesFromIndices", () => {
    const testCases = [
      { noteGrouping: "Chord", chordName: "C", indices: [0, 4, 7] },
      { noteGrouping: "None", chordName: "Ø", indices: [] },
      { noteGrouping: "Chord", chordName: "C-", indices: [0, 1, 2] },
      { noteGrouping: "Chord", chordName: "C-", indices: [0, 2, 4] },
      { noteGrouping: "Chord", chordName: "G-", indices: [7, 9, 11] },
      { noteGrouping: "Chord", chordName: "B-", indices: [11, 13, 15] },
      { noteGrouping: "Chord", chordName: "A♯-", indices: [10, 12, 16] },
      {
        noteGrouping: "Chord",
        chordName: "B♭-",
        indices: [10, 12, 16],
        key: MusicalKey.fromGreekMode("C", GreekModeType.Dorian),
      },
    ];

    testCases.forEach(({ noteGrouping, chordName, indices, key }) => {
      it(`should return correct display properties for ${chordName}`, () => {
        verifyDisplayInfo(noteGrouping, chordName, indices, key);
      });
    });
  });
});
