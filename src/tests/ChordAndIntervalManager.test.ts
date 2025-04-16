import { InversionIndex, ixActual, ixActualArray, ixInversion } from "../types/IndexTypes";
import { ChordType } from "../types/NoteGroupingTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { ChordDisplayMode } from "../types/SettingModes";
import { KeyType } from "../types/Keys/KeyType";

import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { ChordNameResolver } from "../utils/ChordNameResolver";
import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ChordFactory } from "../utils/ChordFactory";

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
  const chordMatch = ChordFactory.getMatchFromIndices(ixActualArray(indices));
  const actual = ChordNameResolver.deriveChordName(chordMatch, displayMode, musicalKey);
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
  expect(result.length).toEqual(expectedNotes.length);
  expect(result).toEqual(expectedNotes);
}

function verifyOffsetsFromIdAndInversion(
  expectedOffsets: number[],
  id: ChordType,
  inversionIndex: InversionIndex = ixInversion(0),
) {
  const result = ChordFactory.getOffsetsFromIdAndInversion(id, inversionIndex);
  expect(result).toEqual(expectedOffsets);
}

describe("ChordAndIntervalManager", () => {
  describe("getOffsetsFromIdAndInversion", () => {
    it("should return correct offsets for major chord", () => {
      verifyOffsetsFromIdAndInversion([0, 4, 7], ChordType.Major);
    });

    it("should return correct offsets for minor chord", () => {
      verifyOffsetsFromIdAndInversion([0, 3, 7], ChordType.Minor);
    });

    it("should return correct offsets for dominant seventh chord", () => {
      verifyOffsetsFromIdAndInversion([0, 4, 7, 10], ChordType.Dominant7);
    });

    it("should return correct offsets for major seventh chord", () => {
      verifyOffsetsFromIdAndInversion([0, 4, 7, 11], ChordType.Major7);
    });

    it("should return correct offsets for minor seventh chord", () => {
      verifyOffsetsFromIdAndInversion([0, 3, 7, 10], ChordType.Minor7);
    });

    it("should return correct offsets for diminished chord", () => {
      verifyOffsetsFromIdAndInversion([0, 3, 6], ChordType.Diminished);
    });

    it("should return correct offsets for augmented chord", () => {
      verifyOffsetsFromIdAndInversion([0, 4, 8], ChordType.Augmented);
    });

    it("should return correct offsets for suspended fourth chord", () => {
      verifyOffsetsFromIdAndInversion([0, 5, 7], ChordType.Sus4);
    });

    it("should handle first inversion of major chord", () => {
      verifyOffsetsFromIdAndInversion([-8, -5, 0], ChordType.Major, ixInversion(1));
    });

    it("should handle second inversion of major chord", () => {
      verifyOffsetsFromIdAndInversion([-5, 0, 4], ChordType.Major, ixInversion(2));
    });

    it("should handle first inversion of minor chord", () => {
      verifyOffsetsFromIdAndInversion([-9, -5, 0], ChordType.Minor, ixInversion(1));
    });

    it("should handle second inversion of dominant seventh chord", () => {
      verifyOffsetsFromIdAndInversion([-5, -2, 0, 4], ChordType.Dominant7, ixInversion(2));
    });

    it("should handle third inversion of major seventh chord", () => {
      verifyOffsetsFromIdAndInversion([-1, 0, 4, 7], ChordType.Major7, ixInversion(3));
    });
  });

  describe("calculateChordNotesFromIndex", () => {
    it("should calculate correct notes for major chord", () => {
      verifyChordNotesFromIndex([0, 4, 7], 0, ChordType.Major);
    });

    it("should calculate correct notes for minor chord", () => {
      verifyChordNotesFromIndex([0, 3, 7], 0, ChordType.Minor);
    });

    it("should calculate correct notes for first inversion of major chord", () => {
      verifyChordNotesFromIndex([4, 7, 12], 0, ChordType.Major, ixInversion(1));
    });

    it("should calculate correct notes for second inversion of dominant seventh chord", () => {
      verifyChordNotesFromIndex([7, 10, 12, 16], 0, ChordType.Dominant7, ixInversion(2));
    });

    it("should clip notes to range when doClip is true", () => {
      verifyChordNotesFromIndex([10, 14, 17], 22, ChordType.Major, ixInversion(0));
    });

    it("should calculate correct notes for first inversion of minor chord", () => {
      verifyChordNotesFromIndex([3, 7, 12], 0, ChordType.Minor, ixInversion(1));
    });

    it("should calculate correct notes for second inversion of augmented chord", () => {
      verifyChordNotesFromIndex([7, 12, 15], 0, ChordType.Minor, ixInversion(2));
    });

    it("should calculate correct notes for third inversion of dominant seventh chord", () => {
      verifyChordNotesFromIndex([10, 12, 16, 19], 0, ChordType.Dominant7, ixInversion(3));
    });

    it("7add13 should span 13 semitones", () => {
      verifyChordNotesFromIndex([0, 4, 7, 10, 13], 0, ChordType.Seven13);
    });

    it("7add13 starting at 12, fit to range by being moved to 0", () => {
      verifyChordNotesFromIndex([0, 4, 7, 10, 13], 12, ChordType.Seven13);
    });

    it("7add13 starting at 11, doesn't fit, so we truncate", () => {
      verifyChordNotesFromIndex([11, 15, 18, 21], 11, ChordType.Seven13);
    });

    it("7add9 should span 14 semitones", () => {
      verifyChordNotesFromIndex([0, 4, 7, 14], 12, ChordType.Add9);
    });

    it("7add9 starting at 11 doesn't fit, so we truncate", () => {
      verifyChordNotesFromIndex([11, 15, 18], 11, ChordType.Add9);
    });
  });

  describe("getChordNameFromIndices", () => {
    it('should return "Ø" for empty array', () => {
      verifyChordNameWithMode("Ø", []);
    });

    it("should return correct interval name for major third", () => {
      verifyChordNameWithMode("M3", [0, 4]);
    });

    it("should return correct chord name for major chord", () => {
      verifyChordNameWithMode("C", [0, 4, 7]);
    });

    it("should return correct chord name for major chord in first inversion", () => {
      verifyChordNameWithMode("C/E", [4, 7, 12]);
    });

    it("should return correct chord name for major chord in second inversion", () => {
      verifyChordNameWithMode("C/G", [7, 12, 16]);
    });

    it("should return correct chord name for minor chord", () => {
      verifyChordNameWithMode("Dm", [2, 5, 9]);
    });

    it("should return correct chord name for minor chord in first inversion", () => {
      verifyChordNameWithMode("Dm/F", [5, 9, 14]);
    });

    it("should return only note name for single note", () => {
      verifyChordNameWithMode("E", [4]);
    });

    it("should return correct chord for diminished chord", () => {
      verifyChordNameWithMode("Edim", [4, 7, 10], ChordDisplayMode.Letters_Short);
      verifyChordNameWithMode("E°", [4, 7, 10], ChordDisplayMode.Symbols);
    });

    it("should use flat accidentals when specified", () => {
      verifyChordNameWithMode(
        "D♭",
        [1, 5, 8],
        ChordDisplayMode.Letters_Short,
        MusicalKey.fromClassicalMode("Db", KeyType.Major),
      );
    });

    it("should correctly identify a dominant seventh chord in root position", () => {
      verifyChordNameWithMode("C7", [0, 4, 7, 10], ChordDisplayMode.Letters_Long);
      verifyChordNameWithMode("C7", [0, 4, 7, 10], ChordDisplayMode.Symbols);
    });

    it("should correctly identify a sus4 chord", () => {
      verifyChordNameWithMode("Csus4", [0, 5, 7]);
    });

    it('should return "Unknown" for unrecognized chord', () => {
      verifyChordNameWithMode("C-", [0, 1, 2]);
    });
  });

  describe("getDisplayPropertiesFromIndices", () => {
    it("should return correct display properties for major chord", () => {
      verifyDisplayInfo("Chord", "C", [0, 4, 7]);
    });

    it("test 0 notes selected", () => {
      verifyDisplayInfo("None", "Ø", []);
    });

    it("test C, C#, D notes selected", () => {
      verifyDisplayInfo("Chord", "C-", [0, 1, 2]);
    });

    it("test C D E notes selected", () => {
      verifyDisplayInfo("Chord", "C-", [0, 2, 4]);
    });

    it("test G, A, B notes selected", () => {
      verifyDisplayInfo("Chord", "G-", [7, 9, 11]);
    });

    it("test B, Db, F notes selected", () => {
      verifyDisplayInfo("Chord", "B-", [11, 13, 15]);
    });

    it("test A#, C, E notes selected", () => {
      verifyDisplayInfo("Chord", "A♯-", [10, 12, 16]);
    });

    it("test A#, C, E notes selected in C Dorian", () => {
      verifyDisplayInfo(
        "Chord",
        "B♭-",
        [10, 12, 16],
        MusicalKey.fromGreekMode("C", GreekModeType.Dorian),
      );
    });
  });
});
