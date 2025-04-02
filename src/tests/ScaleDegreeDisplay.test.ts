import { ixChromatic } from "../types/ChromaticIndex";
import { GreekModeType } from "../types/GreekMode";
import { MusicalKey } from "../types/MusicalKey";
import { verifyGreekModeScaleDegrees, verifyScaleDegreesArray } from "./utils/DisplayTestUtils";

describe("Greek Mode Index Arrays", () => {
  describe("verifyFromPattern", () => {
    test("Ionian mode pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Ionian, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("Dorian mode pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Dorian, ["1", "2", "♭3", "4", "5", "6", "♭7"]);
    });
    test("Phrygian mode pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Phrygian, ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"]);
    });

    test("Lydian mode pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Lydian, ["1", "2", "3", "♯4", "5", "6", "7"]);
    });

    test("Mixolydian mode pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Mixolydian, ["1", "2", "3", "4", "5", "6", "♭7"]);
    });

    test("Aeolian mode pattern", () => {
      verifyGreekModeScaleDegrees(GreekModeType.Aeolian, ["1", "2", "♭3", "4", "5", "♭6", "♭7"]);
    });

    test("Locrian mode pattern", () => {
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
    it("C is a flat 7 in D Dorian", () => {
      expect(dDorianKey.getScaleDegreeDisplayString(ixChromatic(0))).toEqual("♭7");
    });
    it("C is a 1 in C Dorian", () => {
      expect(cDorianKey.getScaleDegreeDisplayString(ixChromatic(0))).toEqual("1");
    });
    it("B♭ does not exist in D Dorian", () => {
      expect(dDorianKey.getScaleDegreeDisplayString(ixChromatic(10))).toEqual("");
    });
    it("B is a 6 in D Dorian", () => {
      expect(dDorianKey.getScaleDegreeDisplayString(ixChromatic(11))).toEqual("6");
    });

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
