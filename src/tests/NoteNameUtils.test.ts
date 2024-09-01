import { getNoteTextFromIndex, computeChordName } from "../utils/NoteNameUtils";
import { Accidental } from "../types/Accidental";
import { ActualIndex } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGrouping";

describe("NoteNameUtils", () => {
  describe("getNoteTextFromIndex", () => {
    it("should return correct note text for C", () => {
      expect(getNoteTextFromIndex(0 as ActualIndex, Accidental.Sharp)).toBe("C");
    });

    it("should return correct note text for C# with sharp preference", () => {
      expect(getNoteTextFromIndex(1 as ActualIndex, Accidental.Sharp)).toBe("C♯");
    });

    it("should return correct note text for Db with flat preference", () => {
      expect(getNoteTextFromIndex(1 as ActualIndex, Accidental.Flat)).toBe("D♭");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(0 as ActualIndex, Accidental.Sharp, true)).toBe("C4");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(7 as ActualIndex, Accidental.Sharp, true)).toBe("G4");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(12 as ActualIndex, Accidental.Sharp, true)).toBe("C5");
    });
    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(14 as ActualIndex, Accidental.Sharp, true)).toBe("D5");
    });
  });

  describe("computeChordName", () => {
    it("should compute correct name for major chord", () => {
      const result = computeChordName(
        NoteGroupingId.Chord_Maj,
        0 as ActualIndex,
        0 as ActualIndex,
        Accidental.Sharp,
      );
      expect(result).toBe("C");
    });

    it("should compute correct name for minor chord", () => {
      const result = computeChordName(
        NoteGroupingId.Chord_Min,
        2 as ActualIndex,
        2 as ActualIndex,
        Accidental.Sharp,
      );
      expect(result).toBe("Dm");
    });

    it("should handle inversions correctly", () => {
      const result = computeChordName(
        NoteGroupingId.Chord_Maj,
        0 as ActualIndex,
        4 as ActualIndex,
        Accidental.Sharp,
      );
      expect(result).toBe("C/E");
    });

    it("should use flat accidentals when specified", () => {
      const result = computeChordName(
        NoteGroupingId.Chord_Maj,
        1 as ActualIndex,
        1 as ActualIndex,
        Accidental.Flat,
      );
      expect(result).toBe("D♭");
    });

    it("should handle seventh chords", () => {
      const result = computeChordName(
        NoteGroupingId.Chord_Dom7,
        5 as ActualIndex,
        5 as ActualIndex,
        Accidental.Sharp,
      );
      expect(result).toBe("Fdom7");
    });

    it("should handle suspended chords", () => {
      const result = computeChordName(
        NoteGroupingId.Chord_Sus4,
        7 as ActualIndex,
        7 as ActualIndex,
        Accidental.Sharp,
      );
      expect(result).toBe("Gsus4");
    });
  });
});
