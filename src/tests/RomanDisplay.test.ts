import { GreekModeDictionary } from "../types/GreekModes/GreekModeDictionary";
import { GreekModeType } from "../types/GreekModes/GreekModeType";

function verifyRomanDisplayStrings(greekMode: GreekModeType, expectedNotes: string[]) {
  const displayStrings = GreekModeDictionary.getModeInfo(greekMode).getRomanDisplayStrings();
  expect(displayStrings).toEqual(expectedNotes);
}

describe("Greek Mode Index Arrays", () => {
  describe("verifyFromPattern", () => {
    test("Ionian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Ionian, ["I", "II", "III", "IV", "V", "VI", "VII"]);
    });

    test("Dorian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Dorian, ["I", "II", "♭III", "IV", "V", "VI", "♭VII"]);
    });

    test("Phrygian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Phrygian, [
        "I",
        "♭II",
        "♭III",
        "IV",
        "V",
        "♭VI",
        "♭VII",
      ]);
    });

    test("Lydian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Lydian, ["I", "II", "III", "♯IV", "V", "VI", "VII"]);
    });

    test("Mixolydian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Mixolydian, [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "♭VII",
      ]);
    });

    test("Aeolian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Aeolian, [
        "I",
        "II",
        "♭III",
        "IV",
        "V",
        "♭VI",
        "♭VII",
      ]);
    });

    test("Locrian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Locrian, [
        "I",
        "♭II",
        "♭III",
        "IV",
        "♭V",
        "♭VI",
        "♭VII",
      ]);
    });
  });
});
