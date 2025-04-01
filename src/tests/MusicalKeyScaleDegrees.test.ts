import { GreekModeDictionary, GreekModeType } from "../types/GreekMode";

describe("Greek Mode Index Arrays", () => {
  let greekModeDictionary: GreekModeDictionary;
  let ionianPattern: number[];
  beforeAll(() => {
    greekModeDictionary = GreekModeDictionary.getInstance();
    ionianPattern = greekModeDictionary.getMode(GreekModeType.Ionian).pattern;
  });

  function verifyFromPattern(greekMode: GreekModeType, expectedNotes: string[]) {
    expectedNotes.forEach((note, index) => {
      const scaleDegreeInfo = greekModeDictionary
        .getMode(greekMode)
        .getScaleDegreeInfo(index, ionianPattern);
      expect(scaleDegreeInfo.getDisplayString()).toEqual(note);
    });
  }
  describe("verifyFromPattern", () => {
    test("C Ionian mode - major scale pattern", () => {
      verifyFromPattern(GreekModeType.Ionian, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Do rian mode - major scale pattern", () => {
      verifyFromPattern(GreekModeType.Dorian, ["1", "2", "♭3", "4", "5", "6", "♭7"]);
    });
    test("C Phrygian mode - major scale pattern", () => {
      verifyFromPattern(GreekModeType.Phrygian, ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"]);
    });

    test("C Lydian mode - major scale pattern", () => {
      verifyFromPattern(GreekModeType.Lydian, ["1", "2", "3", "♯4", "5", "6", "7"]);
    });

    test("C Mixolydian mode - major scale pattern", () => {
      verifyFromPattern(GreekModeType.Mixolydian, ["1", "2", "3", "4", "5", "6", "♭7"]);
    });

    test("C Aeolian mode - major scale pattern", () => {
      verifyFromPattern(GreekModeType.Aeolian, ["1", "2", "♭3", "4", "5", "♭6", "♭7"]);
    });

    test("C Locrian mode - major scale pattern", () => {
      verifyFromPattern(GreekModeType.Locrian, ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"]);
    });
  });
});
