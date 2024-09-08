import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { AccidentalType } from "../types/AccidentalType";
import { ixActual } from "../types/IndexTypes";

describe("NoteNameUtils", () => {
  describe("getNoteTextFromIndex", () => {
    it("should return correct note text for C", () => {
      expect(getNoteTextFromIndex(ixActual(0), AccidentalType.Sharp)).toBe("C");
    });

    it("should return correct note text for C# with sharp preference", () => {
      expect(getNoteTextFromIndex(ixActual(1), AccidentalType.Sharp)).toBe("C♯");
    });

    it("should return correct note text for Db with flat preference", () => {
      expect(getNoteTextFromIndex(ixActual(1), AccidentalType.Flat)).toBe("D♭");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(0), AccidentalType.Sharp, true)).toBe("C4");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(7), AccidentalType.Sharp, true)).toBe("G4");
    });

    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(12), AccidentalType.Sharp, true)).toBe("C5");
    });
    it("should include octave when showOctave is true", () => {
      expect(getNoteTextFromIndex(ixActual(14), AccidentalType.Sharp, true)).toBe("D5");
    });
  });
});
