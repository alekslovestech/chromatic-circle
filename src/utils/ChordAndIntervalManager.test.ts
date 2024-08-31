import { ChordAndIntervalManager } from "./ChordAndIntervalManager";
import { ActualIndex } from "../types/IndexTypes";
import { Accidental } from "../types/Accidental";
import { NoteGroupingName } from "../types/NoteGrouping";

describe("ChordAndIntervalManager", () => {
  describe("getChordName", () => {
    it('should return "No notes selected" for empty array', () => {
      const result = ChordAndIntervalManager.getChordName([], Accidental.Sharp);
      expect(result.name).toBe("No notes selected");
    });

    it("should return single note name for one note", () => {
      const result: NoteGroupingName = ChordAndIntervalManager.getChordName(
        [0] as ActualIndex[],
        Accidental.Sharp,
      );
      expect(result.name).toBe("C");
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

    it("return correct name for 6th chord", () => {
      const result = ChordAndIntervalManager.getChordName(
        [0, 4, 7, 9] as ActualIndex[],
        Accidental.Flat,
      );
      expect(result.name).toBe("C6");
    });

    it("return correct name for 6th chord", () => {
      const result = ChordAndIntervalManager.getChordName(
        [0, 3, 7, 9] as ActualIndex[],
        Accidental.Flat,
      );
      expect(result.name).toBe("Cm6");
    });

    it('should return "Unknown" for unrecognized chord', () => {
      const result = ChordAndIntervalManager.getChordName(
        [0, 1, 2] as ActualIndex[],
        Accidental.Sharp,
      );
      expect(result.name).toBe("Unknown");
    });
  });
});
