import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { Accidental } from "../types/Accidental";
import { ActualIndex, ixActual } from "../types/IndexTypes";

describe("NoteNameUtils", () => {
  describe("getNoteTextFromIndex", () => {
    it("should return correct note text for C", () => {
      expect(getNoteTextFromIndex(ixActual(0), Accidental.Sharp)).toBe("C");
    });

    it("should return correct note text for C# with sharp preference", () => {
      expect(getNoteTextFromIndex(ixActual(1), Accidental.Sharp)).toBe("C♯");
    });

    it("should return correct note text for Db with flat preference", () => {
      expect(getNoteTextFromIndex(ixActual(1), Accidental.Flat)).toBe("D♭");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(0), Accidental.Sharp, true)).toBe("C4");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(7), Accidental.Sharp, true)).toBe("G4");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(12), Accidental.Sharp, true)).toBe("C5");
    });
    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(14), Accidental.Sharp, true)).toBe("D5");
    });
  });
});
