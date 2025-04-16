import { ixActual, ixActualArray, ixInversion } from "../types/IndexTypes";
import { ChordType } from "../types/NoteGroupingTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { ChordDisplayMode } from "../types/SettingModes";
import { KeyType } from "../types/Keys/KeyType";

import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { GreekModeType } from "../types/GreekModes/GreekModeType";

describe("ChordAndIntervalManager", () => {
  describe("getOffsetsFromIdAndInversion", () => {
    it("should return correct offsets for major chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Major);
      expect(result).toEqual([0, 4, 7]);
    });

    it("should return correct offsets for minor chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Minor);
      expect(result).toEqual([0, 3, 7]);
    });

    it("should return correct offsets for dominant seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Dominant7);
      expect(result).toEqual([0, 4, 7, 10]);
    });

    it("should return correct offsets for major seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Major7);
      expect(result).toEqual([0, 4, 7, 11]);
    });

    it("should return correct offsets for minor seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Minor7);
      expect(result).toEqual([0, 3, 7, 10]);
    });

    it("should return correct offsets for diminished chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Diminished);
      expect(result).toEqual([0, 3, 6]);
    });

    it("should return correct offsets for augmented chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Augmented);
      expect(result).toEqual([0, 4, 8]);
    });

    it("should return correct offsets for suspended fourth chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(ChordType.Sus4);
      expect(result).toEqual([0, 5, 7]);
    });

    it("should handle first inversion of major chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        ChordType.Major,
        ixInversion(1),
      );
      expect(result).toEqual([-8, -5, 0]); // E is the bass note, C is the root note
    });

    it("should handle second inversion of major chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        ChordType.Major,
        ixInversion(2),
      );
      expect(result).toEqual([-5, 0, 4]); // G is the bass note, C is the root note
    });

    it("should handle first inversion of minor chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        ChordType.Minor,
        ixInversion(1),
      );
      expect(result).toEqual([-9, -5, 0]); // E is the bass note, C is the root note
    });

    it("should handle second inversion of dominant seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        ChordType.Dominant7,
        ixInversion(2),
      );
      expect(result).toEqual([-5, -2, 0, 4]); // G is the bass note, C is the root note
    });

    it("should handle third inversion of major seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        ChordType.Major7,
        ixInversion(3),
      );
      expect(result).toEqual([-1, 0, 4, 7]); // B is the bass note, C is the root note
    });
  });

  describe("calculateChordNotesFromIndex", () => {
    it("should calculate correct notes for major chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Major,
      );
      expect(result).toEqual([0, 4, 7]);
    });

    it("should calculate correct notes for minor chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Minor,
      );
      expect(result).toEqual([0, 3, 7]);
    });

    it("should calculate correct notes for first inversion of major chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Major,
        ixInversion(1),
      );
      expect(result).toEqual([4, 7, 12]);
    });

    it("should calculate correct notes for second inversion of dominant seventh chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Dominant7,
        ixInversion(2),
      );
      expect(result).toEqual([7, 10, 12, 16]);
    });

    it("should clip notes to range when doClip is true", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(22),
        ChordType.Major,
        ixInversion(0),
      );
      expect(result).toEqual([10, 14, 17]);
    });

    it("should calculate correct notes for first inversion of minor chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Minor,
        ixInversion(1),
      );
      expect(result).toEqual([3, 7, 12]);
    });

    it("should calculate correct notes for second inversion of augmented chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Minor,
        ixInversion(2),
      );
      expect(result).toEqual([7, 12, 15]);
    });

    it("should calculate correct notes for third inversion of dominant seventh chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Dominant7,
        ixInversion(3),
      );
      expect(result).toEqual([10, 12, 16, 19]);
    });

    it("7add13 should span 13 semitones", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        ChordType.Seven13,
      );
      expect(result.length).toEqual(5);
      expect(result).toEqual([0, 4, 7, 10, 13]);
    });

    it("7add13 starting at 12, fit to range by being moved to 0", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(12),
        ChordType.Seven13,
      );
      expect(result.length).toEqual(5);
      expect(result).toEqual([0, 4, 7, 10, 13]);
    });

    it("7add13 starting at 11, doesn't fit, so we truncate", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(11),
        ChordType.Seven13,
      );
      expect(result.length).toEqual(4);
      //expect(result).toEqual([0, 4, 7, 10, 13]);
    });

    it("7add9 should span 14 semitones", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(12),
        ChordType.Add9,
      );
      expect(result.length).toEqual(4);
      expect(result).toEqual([0, 4, 7, 14]);
    });

    it("7add9 starting at 11 doesn't fit, so we truncate", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(11),
        ChordType.Add9,
      );
      expect(result.length).toEqual(3);
      // expect(result).toEqual([0, 4, 7, 14]);
    });
  });

  describe("getChordNameFromIndices", () => {
    it('should return "Ø" for empty array', () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices([])).toBe("Ø");
    });

    it("should return correct interval name for major third", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([0, 4]))).toBe("M3");
    });

    it("should return correct chord name for major chord", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([0, 4, 7]))).toBe("C");
    });

    it("should return correct chord name for major chord in first inversion", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([4, 7, 12]))).toBe(
        "C/E",
      );
    });

    it("should return correct chord name for major chord in second inversion", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([7, 12, 16]))).toBe(
        "C/G",
      );
    });

    it("should return correct chord name for minor chord", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([2, 5, 9]))).toBe("Dm");
    });

    it("should return correct chord name for minor chord in first inversion", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([5, 9, 14]))).toBe(
        "Dm/F",
      );
    });

    it("should return only note name for single note", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([4]))).toBe("E");
    });

    it("should return correct chord for diminished chord", () => {
      const eDimIndices = ixActualArray([4, 7, 10]);
      expect(ChordAndIntervalManager.getChordNameFromIndices(eDimIndices)).toBe("Edim");
      expect(
        ChordAndIntervalManager.getChordNameFromIndices(eDimIndices, ChordDisplayMode.Symbols),
      ).toBe("E°");
    });

    it("should use flat accidentals when specified", () => {
      expect(
        ChordAndIntervalManager.getChordNameFromIndices(
          ixActualArray([1, 5, 8]),
          ChordDisplayMode.Letters_Short,
          MusicalKey.fromClassicalMode("Db", KeyType.Major),
        ),
      ).toBe("D♭");
    });

    it("should correctly identify a dominant seventh chord in root position", () => {
      const cDom7Indices = ixActualArray([0, 4, 7, 10]);
      expect(
        ChordAndIntervalManager.getChordNameFromIndices(
          cDom7Indices,
          ChordDisplayMode.Letters_Long,
        ),
      ).toBe("C7");
      expect(
        ChordAndIntervalManager.getChordNameFromIndices(cDom7Indices, ChordDisplayMode.Symbols),
      ).toBe("C7");
    });

    it("should correctly identify a sus4 chord", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([0, 5, 7]))).toBe(
        "Csus4",
      );
    });

    it('should return "Unknown" for unrecognized chord', () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([0, 1, 2]))).toBe("C-");
    });
  });

  describe("getDisplayPropertiesFromIndices", () => {
    it("should return correct display properties for major chord", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        ixActualArray([0, 4, 7]),
        ChordDisplayMode.Letters_Short,
        DEFAULT_MUSICAL_KEY,
      );
      expect(result.noteGroupingString).toBe("Chord");
      expect(result.chordName).toBe("C");
    });

    it("test 0 notes selected", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        [],
        ChordDisplayMode.Letters_Short,
        DEFAULT_MUSICAL_KEY,
      );
      expect(result.noteGroupingString).toBe("None");
      expect(result.chordName).toBe("Ø");
    });

    it("test C, C#, D notes selected", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        ixActualArray([0, 1, 2]),
        ChordDisplayMode.Letters_Short,
        DEFAULT_MUSICAL_KEY,
      );
      expect(result.noteGroupingString).toBe("Chord");
      expect(result.chordName).toBe("C-");
    });

    it("test C D E notes selected", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        ixActualArray([0, 2, 4]),
        ChordDisplayMode.Letters_Short,
        DEFAULT_MUSICAL_KEY,
      );
      expect(result.noteGroupingString).toBe("Chord");
      expect(result.chordName).toBe("C-");
    });

    it("test G, A, B notes selected", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        ixActualArray([7, 9, 11]),
        ChordDisplayMode.Letters_Short,
        DEFAULT_MUSICAL_KEY,
      );
      expect(result.noteGroupingString).toBe("Chord");
      expect(result.chordName).toBe("G-");
    });

    it("test B, Db, F notes selected", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        ixActualArray([11, 13, 15]),
        ChordDisplayMode.Letters_Short,
        DEFAULT_MUSICAL_KEY,
      );
      expect(result.noteGroupingString).toBe("Chord");
      expect(result.chordName).toBe("B-");
    });

    it("test A#, C, E notes selected", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        ixActualArray([10, 12, 16]),
        ChordDisplayMode.Letters_Short,
        DEFAULT_MUSICAL_KEY,
      );
      expect(result.noteGroupingString).toBe("Chord");
      expect(result.chordName).toBe("A♯-");
    });

    it("test A#, C, E notes selected in C Dorian", () => {
      const result = ChordAndIntervalManager.getDisplayInfoFromIndices(
        ixActualArray([10, 12, 16]),
        ChordDisplayMode.Letters_Short,
        MusicalKey.fromGreekMode("C", GreekModeType.Dorian),
      );
      expect(result.noteGroupingString).toBe("Chord");
      expect(result.chordName).toBe("B♭-");
    });
  });
});
