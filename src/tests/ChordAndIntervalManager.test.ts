import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { ActualIndex, ixInversion } from "../types/IndexTypes";
import { Accidental } from "../types/Accidental";
import { NoteGroupingId } from "../types/NoteGrouping";

describe("ChordAndIntervalManager", () => {
  /* describe("getChordName", () => {
    it('should return "No notes selected" for empty array', () => {
      const result = ChordAndIntervalManager.getChordName([], Accidental.Sharp);
      expect(result.name).toBe("Ø");
    });

    it("should return single note name for one note", () => {
      const result: NoteGroupingName = ChordAndIntervalManager.getChordName(
        [0] as ActualIndex[],
        Accidental.Sharp,
      );
      expect(result.name).toBe("C(note)");
    });

    it("should return correct name for major chord", () => {
      const result = ChordAndIntervalManager.getChordName(
        [0, 4, 7] as ActualIndex[],
        Accidental.Sharp,
      );
      expect(result.name).toBe("C");
    });

    it("should return correct name for minor chord", () => {
      const result = ChordAndIntervalManager.getChordName(
        [0, 3, 7] as ActualIndex[],
        Accidental.Sharp,
      );
      expect(result.name).toBe("Cm");
    });

    it.skip("should handle inversions correctly", () => {
      const result = ChordAndIntervalManager.getChordName(
        [4, 7, 12] as ActualIndex[],
        Accidental.Sharp,
      );
      expect(result.name).toBe("C/E");
    });

    it("should use flat accidentals when specified", () => {
      const result = ChordAndIntervalManager.getChordName(
        [1, 5, 8] as ActualIndex[],
        Accidental.Flat,
      );
      expect(result.name).toBe("D♭");
    });

    it('should return "Unknown" for unrecognized chord', () => {
      const result = ChordAndIntervalManager.getChordName(
        [0, 1, 2] as ActualIndex[],
        Accidental.Sharp,
      );
      expect(result.name).toBe("Unknown");
    });
  }); */

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
        0 as ActualIndex,
        NoteGroupingId.Chord_Maj,
      );
      expect(result).toEqual([0, 4, 7]);
    });

    it("should calculate correct notes for minor chord", () => {
      const result = ChordAndIntervalManager.calculateChordNotesFromIndex(
        0 as ActualIndex,
        NoteGroupingId.Chord_Min,
      );
      expect(result).toEqual([0, 3, 7]);
    });
  });

  describe("getChordName", () => {
    it("should return correct chord name for major chord", () => {
      expect(
        ChordAndIntervalManager.getChordNameFromPreset(
          0 as ActualIndex,
          NoteGroupingId.Chord_Maj,
          Accidental.Sharp,
        ),
      ).toBe("C");
    });

    it("should return correct chord name for minor chord", () => {
      expect(
        ChordAndIntervalManager.getChordNameFromPreset(
          2 as ActualIndex,
          NoteGroupingId.Chord_Min,
          Accidental.Sharp,
        ),
      ).toBe("Dm");
    });

    it("should return only note name for single note", () => {
      expect(
        ChordAndIntervalManager.getChordNameFromPreset(
          4 as ActualIndex,
          NoteGroupingId.Note,
          Accidental.Sharp,
        ),
      ).toBe("E(note)");
    });

    it("should return correct chord for diminished chord", () => {
      expect(
        ChordAndIntervalManager.getChordNameFromPreset(
          4 as ActualIndex,
          NoteGroupingId.Chord_Dim,
          Accidental.Sharp,
        ),
      ).toBe("Edim");
    });
  });
});