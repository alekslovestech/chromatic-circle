import { getNoteNameForDisplay } from "../utils/NoteUtils";
import { AccidentalType } from "../types/AccidentalType";
import { ixChromatic } from "../types/ChromaticIndex";

describe("NoteNameUtils", () => {
  describe("getNoteTextFromIndex", () => {
    it("should return correct note text for C", () => {
      expect(getNoteNameForDisplay(ixChromatic(0), AccidentalType.Sharp)).toBe("C");
    });

    it("should return correct note text for C# with sharp preference", () => {
      expect(getNoteNameForDisplay(ixChromatic(1), AccidentalType.Sharp)).toBe("C♯");
    });

    it("should return correct note text for Db with flat preference", () => {
      expect(getNoteNameForDisplay(ixChromatic(1), AccidentalType.Flat)).toBe("D♭");
    });
  });
});
