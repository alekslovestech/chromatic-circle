import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { verifyGreekModeScaleDegrees, verifyScaleDegreesArray } from "./utils/DisplayTestUtils";
import { GreekTestConstants } from "./utils/GreekTestConstants";

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
  let constants: GreekTestConstants;

  beforeEach(() => {
    constants = GreekTestConstants.getInstance();
  });

  describe("Ionian (Major) Scale", () => {
    it("should display correct scale degrees for C Ionian", () => {
      verifyScaleDegreesArray(constants.C_IONIAN_KEY, [
        "1",
        "",
        "2",
        "",
        "3",
        "4",
        "",
        "5",
        "",
        "6",
        "",
        "7",
      ]);
    });

    it("should display correct scale degrees for D Ionian", () => {
      verifyScaleDegreesArray(constants.D_IONIAN_KEY, [
        "",
        "7",
        "1",
        "",
        "2",
        "",
        "3",
        "4",
        "",
        "5",
        "",
        "6",
      ]);
    });
  });

  describe("Dorian Mode", () => {
    it("should display correct scale degrees for C Dorian", () => {
      verifyScaleDegreesArray(constants.C_DORIAN_KEY, [
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
      verifyScaleDegreesArray(constants.D_DORIAN_KEY, [
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
