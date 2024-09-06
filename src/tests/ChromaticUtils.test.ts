import { Accidental } from "../types/Accidental";
import {
  actualToChromatic,
  chromaticToActual,
  ixActual,
  ixChromatic,
  ixOctaveOffset,
} from "../types/IndexTypes";
import { getNoteTextFromIndex } from "../utils/NoteNameUtils";

describe("ChromaticUtils", () => {
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
  });
});
