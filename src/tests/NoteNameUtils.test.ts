import { AccidentalType } from "../types/AccidentalType";
import { getNoteTextFromActualIndex } from "../utils/NoteDisplayUtils";
import { ixActual } from "../types/IndexTypes";

describe("getNoteTextFromActualIndex", () => {
  it("should return correct note text for C", () => {
    expect(getNoteTextFromActualIndex(ixActual(0), AccidentalType.Sharp)).toBe("C");
  });

  it("should return correct note text for C# with sharp preference", () => {
    expect(getNoteTextFromActualIndex(ixActual(1), AccidentalType.Sharp)).toBe("C♯");
  });

  it("should return correct note text for Db with flat preference", () => {
    expect(getNoteTextFromActualIndex(ixActual(1), AccidentalType.Flat)).toBe("D♭");
  });

  it("should handle octave changes", () => {
    expect(getNoteTextFromActualIndex(ixActual(12), AccidentalType.Sharp)).toBe("C");
    expect(getNoteTextFromActualIndex(ixActual(13), AccidentalType.Sharp)).toBe("C♯");
  });
});
