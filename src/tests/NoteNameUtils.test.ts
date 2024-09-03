import { getNoteTextFromIndex } from "../utils/NoteNameUtils";
import { Accidental } from "../types/Accidental";
import { ActualIndex } from "../types/IndexTypes";

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
});
