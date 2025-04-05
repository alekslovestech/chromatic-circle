import { ixChromatic } from "../types/ChromaticIndex";
import { GreekModeDictionary } from "../types/GreekModes/GreekModeDictionary";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { MusicalKey } from "../types/MusicalKey";
import { TWELVE } from "../types/NoteConstants";
import { GreekTestConstants } from "./utils/GreekTestConstants";

function verifyRomanDisplayStrings(greekMode: GreekModeType, expectedNotes: string[]) {
  expectedNotes.forEach((expectedNote, i) => {
    const greekModeInfo = GreekModeDictionary.getModeInfo(greekMode);
    const romanChordDisplayString = greekModeInfo.getRomanDisplayString(i);
    expect(romanChordDisplayString).toEqual(expectedNote);
  });
}

function verifyRomanArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  Array.from({ length: TWELVE }).forEach((_, i) => {
    const romanDisplayString = musicalKey.getRomanDisplayString(ixChromatic(i));
    expect(romanDisplayString).toBe(expectedArray[i]);
  });
}

describe("Roman Mode Index Arrays", () => {
  describe("verifyFromPattern", () => {
    test("Ionian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Ionian, ["I", "ii", "iii", "IV", "V", "vi", "vii°"]);
    });

    test("Dorian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Dorian, [
        "i",
        "ii",
        "♭III",
        "IV",
        "v",
        "vi°",
        "♭VII",
      ]);
    });

    test("Phrygian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Phrygian, [
        "i",
        "♭II",
        "♭III",
        "iv",
        "v°",
        "♭VI",
        "♭vii",
      ]);
    });

    test("Lydian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Lydian, ["I", "II", "iii", "♯iv°", "V", "vi", "vii"]);
    });

    test("Mixolydian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Mixolydian, [
        "I",
        "ii",
        "iii°",
        "IV",
        "v",
        "vi",
        "♭VII",
      ]);
    });

    test("Aeolian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Aeolian, [
        "i",
        "ii°",
        "♭III",
        "iv",
        "v",
        "♭VI",
        "♭VII",
      ]);
    });

    test("Locrian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Locrian, [
        "i°",
        "♭II",
        "♭iii",
        "iv",
        "♭V",
        "♭VI",
        "♭vii",
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
      verifyRomanArray(constants.C_IONIAN_KEY, [
        "I",
        "",
        "ii",
        "",
        "iii",
        "IV",
        "",
        "V",
        "",
        "vi",
        "",
        "vii°",
      ]);
    });

    it("should display correct scale degrees for D Ionian", () => {
      verifyRomanArray(constants.D_IONIAN_KEY, [
        "",
        "vii°",
        "I",
        "",
        "ii",
        "",
        "iii",
        "IV",
        "",
        "V",
        "",
        "vi",
      ]);
    });
  });

  describe("Dorian Mode", () => {
    it("should display correct scale degrees for C Dorian", () => {
      verifyRomanArray(constants.C_DORIAN_KEY, [
        "i",
        "",
        "ii",
        "♭III",
        "",
        "IV",
        "",
        "v",
        "",
        "vi°",
        "♭VII",
        "",
      ]);
    });

    it("should display correct scale degrees for D Dorian", () => {
      verifyRomanArray(constants.D_DORIAN_KEY, [
        "♭VII",
        "",
        "i",
        "",
        "ii",
        "♭III",
        "",
        "IV",
        "",
        "v",
        "",
        "vi°",
      ]);
    });
  });
});
