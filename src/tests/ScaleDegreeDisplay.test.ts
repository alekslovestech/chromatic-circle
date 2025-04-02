import { GreekModeType } from "../types/GreekMode";
import { MusicalKey } from "../types/MusicalKey";
import { verifyGreekModeScaleDegrees, verifyScaleDegreesArray } from "./utils/DisplayTestUtils";

describe("Greek Mode Index Arrays", () => {
  describe("verifyFromPattern", () => {
    test("C Ionian mode - major scale pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Ionian, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Do rian mode - major scale pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Dorian, ["1", "2", "♭3", "4", "5", "6", "♭7"]);
    });
    test("C Phrygian mode - major scale pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Phrygian, ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"]);
    });

    test("C Lydian mode - major scale pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Lydian, ["1", "2", "3", "♯4", "5", "6", "7"]);
    });

    test("C Mixolydian mode - major scale pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Mixolydian, ["1", "2", "3", "4", "5", "6", "♭7"]);
    });

    test("C Aeolian mode - major scale pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Aeolian, ["1", "2", "♭3", "4", "5", "♭6", "♭7"]);
    });

    test("C Locrian mode - major scale pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Locrian, ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"]);
    });
  });
});

describe("getScaleDegreeDisplayString", () => {
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
