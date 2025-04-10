import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { TWELVE } from "../types/NoteConstants";
import { KeyTextMode } from "../types/SettingModes";
import { GreekTestConstants } from "./utils/GreekTestConstants";

function verifyScaleDegreeDisplayStrings(greekMode: GreekModeType, expectedNotes: string[]) {
  const musicalKey = MusicalKey.fromGreekMode("C", greekMode);
  const displayStrings = musicalKey.greekModeInfo.getScaleDegreeDisplayStrings();
  expect(displayStrings).toEqual(expectedNotes);
}

function verifyScaleDegreesArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  const displayStrings = musicalKey.getDisplayStringArray(KeyTextMode.ScaleDegree);
  expect(displayStrings).toEqual(expectedArray);
}

describe("Greek Mode Index Arrays", () => {
  describe("verifyFromPattern", () => {
    test("Ionian mode pattern", () => {
      verifyScaleDegreeDisplayStrings(GreekModeType.Ionian, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("Dorian mode pattern", () => {
      verifyScaleDegreeDisplayStrings(GreekModeType.Dorian, ["1", "2", "♭3", "4", "5", "6", "♭7"]);
    });
    test("Phrygian mode pattern", () => {
      verifyScaleDegreeDisplayStrings(GreekModeType.Phrygian, [
        "1",
        "♭2",
        "♭3",
        "4",
        "5",
        "♭6",
        "♭7",
      ]);
    });

    test("Lydian mode pattern", () => {
      verifyScaleDegreeDisplayStrings(GreekModeType.Lydian, ["1", "2", "3", "♯4", "5", "6", "7"]);
    });

    test("Mixolydian mode pattern", () => {
      verifyScaleDegreeDisplayStrings(GreekModeType.Mixolydian, [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "♭7",
      ]);
    });

    test("Aeolian mode pattern", () => {
      verifyScaleDegreeDisplayStrings(GreekModeType.Aeolian, [
        "1",
        "2",
        "♭3",
        "4",
        "5",
        "♭6",
        "♭7",
      ]);
    });

    test("Locrian mode pattern", () => {
      verifyScaleDegreeDisplayStrings(GreekModeType.Locrian, [
        "1",
        "♭2",
        "♭3",
        "4",
        "♭5",
        "♭6",
        "♭7",
      ]);
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
