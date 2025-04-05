import { AccidentalType } from "../types/AccidentalType";
import { NoteConverter } from "../types/NoteConverter";
import { ixActual } from "../types/IndexTypes";

describe("getNoteTextFromActualIndex", () => {
  it("should return correct note text for C", () => {
    expect(NoteConverter.getNoteTextFromActualIndex(ixActual(0), AccidentalType.Sharp)).toBe("C");
  });

  it("should return correct note text for C# with sharp preference", () => {
    expect(NoteConverter.getNoteTextFromActualIndex(ixActual(1), AccidentalType.Sharp)).toBe("C♯");
  });

  it("should return correct note text for Db with flat preference", () => {
    expect(NoteConverter.getNoteTextFromActualIndex(ixActual(1), AccidentalType.Flat)).toBe("D♭");
  });

  it("should handle octave changes", () => {
    expect(NoteConverter.getNoteTextFromActualIndex(ixActual(12), AccidentalType.Sharp)).toBe("C");
    expect(NoteConverter.getNoteTextFromActualIndex(ixActual(13), AccidentalType.Sharp)).toBe("C♯");
  });
});
