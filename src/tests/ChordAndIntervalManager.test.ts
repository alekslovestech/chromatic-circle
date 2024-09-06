import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ixActual, ixActualArray, ixInversion } from "../types/IndexTypes";
import { Accidental } from "../types/Accidental";
import { NoteGroupingId } from "../types/NoteGrouping";

describe("ChordAndIntervalManager", () => {
  describe("getOffsetsFromIdAndInversion", () => {
    it("should return correct offsets for major chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(NoteGroupingId.Chord_Maj);
      expect(result).toEqual([0, 4, 7]);
    });

    it("should return correct offsets for minor chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(NoteGroupingId.Chord_Min);
      expect(result).toEqual([0, 3, 7]);
    });

    it("should return correct offsets for dominant seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Dom7,
      );
      expect(result).toEqual([0, 4, 7, 10]);
    });

    it("should return correct offsets for major seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Maj7,
      );
      expect(result).toEqual([0, 4, 7, 11]);
    });

    it("should return correct offsets for minor seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Min7,
      );
      expect(result).toEqual([0, 3, 7, 10]);
    });

    it("should return correct offsets for diminished chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(NoteGroupingId.Chord_Dim);
      expect(result).toEqual([0, 3, 6]);
    });

    it("should return correct offsets for augmented chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(NoteGroupingId.Chord_Aug);
      expect(result).toEqual([0, 4, 8]);
    });

    it("should return correct offsets for suspended fourth chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Sus4,
      );
      expect(result).toEqual([0, 5, 7]);
    });

    it("should handle first inversion of major chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Maj,
        ixInversion(1),
      );
      expect(result).toEqual([-8, -5, 0]); // E is the bass note, C is the root note
    });

    it("should handle second inversion of major chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Maj,
        ixInversion(2),
      );
      expect(result).toEqual([-5, 0, 4]); // G is the bass note, C is the root note
    });

    it("should handle first inversion of minor chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Min,
        ixInversion(1),
      );
      expect(result).toEqual([-9, -5, 0]); // E is the bass note, C is the root note
    });

    it("should handle second inversion of dominant seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Dom7,
        ixInversion(2),
      );
      expect(result).toEqual([-5, -2, 0, 4]); // G is the bass note, C is the root note
    });

    it("should handle third inversion of major seventh chord", () => {
      const result = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
        NoteGroupingId.Chord_Maj7,
        ixInversion(3),
      );
      expect(result).toEqual([-1, 0, 4, 7]); // B is the bass note, C is the root note
    });
  });

  describe("calculateChordNotesFromIndex", () => {
    it("should calculate correct notes for major chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        NoteGroupingId.Chord_Maj,
      );
      expect(result).toEqual([0, 4, 7]);
    });

    it("should calculate correct notes for minor chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        NoteGroupingId.Chord_Min,
      );
      expect(result).toEqual([0, 3, 7]);
    });

    it("should calculate correct notes for first inversion of major chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        NoteGroupingId.Chord_Maj,
        ixInversion(1),
      );
      expect(result).toEqual([4, 7, 12]);
    });

    it("should calculate correct notes for second inversion of dominant seventh chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        NoteGroupingId.Chord_Dom7,
        ixInversion(2),
      );
      expect(result).toEqual([7, 10, 12, 16]);
    });

    it("should clip notes to range when doClip is true", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(22),
        NoteGroupingId.Chord_Maj,
        ixInversion(0),
      );
      expect(result).toEqual([10, 14, 17]);
    });

    it("should calculate correct notes for first inversion of minor chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        NoteGroupingId.Chord_Min,
        ixInversion(1),
      );
      expect(result).toEqual([3, 7, 12]);
    });

    it("should calculate correct notes for second inversion of augmented chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        NoteGroupingId.Chord_Min,
        ixInversion(2),
      );
      expect(result).toEqual([7, 12, 15]);
    });

    it("should calculate correct notes for third inversion of dominant seventh chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        ixActual(0),
        NoteGroupingId.Chord_Dom7,
        ixInversion(3),
      );
      expect(result).toEqual([10, 12, 16, 19]);
    });
  });

  describe("getChordNameFromIndices", () => {
    it('should return "Ø" for empty array', () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices([])).toBe("Ø");
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
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([4]))).toBe("E(note)");
    });

    it("should return correct chord for diminished chord", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([4, 7, 10]))).toBe(
        "Edim",
      );
    });

    it("should use flat accidentals when specified", () => {
      expect(
        ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([1, 5, 8]), Accidental.Flat),
      ).toBe("D♭");
    });

    it("should correctly identify a dominant seventh chord in root position", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([0, 4, 7, 10]))).toBe(
        "Cdom7",
      );
    });

    it("should correctly identify a sus4 chord", () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([0, 5, 7]))).toBe(
        "Csus4",
      );
    });

    it('should return "Unknown" for unrecognized chord', () => {
      expect(ChordAndIntervalManager.getChordNameFromIndices(ixActualArray([0, 1, 2]))).toBe(
        "Unknown",
      );
    });
  });
});
