import { GreekModeType } from "../types/GreekMode";
import { verifyGreekModeScaleDegrees } from "./utils/DisplayTestUtils";

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
