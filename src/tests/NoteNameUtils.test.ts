import { formatNoteNameForDisplay, getDisplayString } from "../utils/NoteNameUtils";
import { AccidentalType } from "../types/AccidentalType";
import { ixChromatic } from "../types/ChromaticIndex";
import { MusicalKey } from "../types/MusicalKey";
import { KeyTextMode } from "../types/SettingModes";
import { GreekModeType } from "../types/GreekMode";
import { TWELVE } from "../types/NoteConstants";

describe("formatNoteNameForDisplay", () => {
  it("should return correct note text for C", () => {
    expect(formatNoteNameForDisplay(ixChromatic(0), AccidentalType.Sharp)).toBe("C");
  });

  it("should return correct note text for C# with sharp preference", () => {
    expect(formatNoteNameForDisplay(ixChromatic(1), AccidentalType.Sharp)).toBe("C♯");
  });

  it("should return correct note text for Db with flat preference", () => {
    expect(formatNoteNameForDisplay(ixChromatic(1), AccidentalType.Flat)).toBe("D♭");
  });
});

function verifyScaleDegreesArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  Array.from({ length: TWELVE }).forEach((_, i) => {
    const scaleDegreeDisplayString = getDisplayString(
      ixChromatic(i),
      musicalKey,
      KeyTextMode.ScaleDegree,
    );
    expect(scaleDegreeDisplayString).toBe(expectedArray[i]);
  });
}

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
