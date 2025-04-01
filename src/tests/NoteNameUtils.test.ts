import { verifyScaleDegreesArray } from "./utils/DisplayTestUtils";
import { MusicalKey } from "../types/MusicalKey";
import { GreekModeType } from "../types/GreekMode";
import { AccidentalType } from "../types/AccidentalType";
import { getNoteTextFromActualIndex } from "../utils/NoteNameUtils";
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

describe("getDisplayString with Arabic numerals", () => {
  const cMajorKey = MusicalKey.fromGreekMode("C", GreekModeType.Ionian);
  const dMajorKey = MusicalKey.fromGreekMode("D", GreekModeType.Ionian);
  const cDorianKey = MusicalKey.fromGreekMode("C", GreekModeType.Dorian);
  const dDorianKey = MusicalKey.fromGreekMode("D", GreekModeType.Dorian);

  describe("Ionian (Major) Scale", () => {
    it("should display correct scale degrees for C Ionian", () => {
      verifyScaleDegreesArray(cMajorKey, ["1", "", "2", "", "3", "4", "", "5", "", "6", "", "7"]);
    });

    it("should display correct scale degrees for D Ionian", () => {
      verifyScaleDegreesArray(dMajorKey, ["", "7", "1", "", "2", "", "3", "4", "", "5", "", "6"]);
    });
  });

  describe("Dorian Mode", () => {
    it("should display correct scale degrees for C Dorian", () => {
      verifyScaleDegreesArray(cDorianKey, [
        "1",
        "",
        "2",
        "♭3",
        "",
        "4",
        "",
        "5",
        "",
        "6",
        "♭7",
        "",
      ]);
    });

    it("should display correct scale degrees for D Dorian", () => {
      verifyScaleDegreesArray(dDorianKey, [
        "♭7",
        "",
        "1",
        "",
        "2",
        "♭3",
        "",
        "4",
        "",
        "5",
        "",
        "6",
      ]);
    });
  });
});
