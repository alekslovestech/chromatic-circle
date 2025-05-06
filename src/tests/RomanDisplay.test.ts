import { GreekModeDictionary } from "../types/GreekModes/GreekModeDictionary";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { TWELVE } from "../types/NoteConstants";
import { KeyDisplayMode } from "../types/SettingModes";
import { GreekTestConstants } from "./utils/GreekTestConstants";

function verifyRomanDisplayStrings(greekMode: GreekModeType, expectedNotes: string[]) {
  const greekModeInfo = GreekModeDictionary.getModeInfo(greekMode);
  const romanDisplayStrings = greekModeInfo.getDisplayStrings(KeyDisplayMode.Roman);

  expect(romanDisplayStrings).toEqual(expectedNotes);
}

function verifyRomanArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  const displayStrings = musicalKey.getDisplayStringArray(KeyDisplayMode.Roman);
  expect(displayStrings).toEqual(expectedArray);
}
describe("Roman Mode Index Arrays", () => {
  const modePatternCases = [
    {
      mode: GreekModeType.Ionian,
      expected: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    },
    {
      mode: GreekModeType.Dorian,
      expected: ["i", "ii", "♭III", "IV", "v", "vi°", "♭VII"],
    },
    {
      mode: GreekModeType.Phrygian,
      expected: ["i", "♭II", "♭III", "iv", "v°", "♭VI", "♭vii"],
    },
    {
      mode: GreekModeType.Spanish,
      expected: ["I", "♭II", "iii°", "iv", "v°", "♭VI+", "♭vii"],
    },
    {
      mode: GreekModeType.Arabic,
      expected: ["I", "♭II", "iii", "iv", "V", "♭VI+", "VII"],
    },
    {
      mode: GreekModeType.Lydian,
      expected: ["I", "II", "iii", "♯iv°", "V", "vi", "vii"],
    },
    {
      mode: GreekModeType.Mixolydian,
      expected: ["I", "ii", "iii°", "IV", "v", "vi", "♭VII"],
    },
    {
      mode: GreekModeType.Aeolian,
      expected: ["i", "ii°", "♭III", "iv", "v", "♭VI", "♭VII"],
    },
    {
      mode: GreekModeType.Locrian,
      expected: ["i°", "♭II", "♭iii", "iv", "♭V", "♭VI", "♭vii"],
    },
  ];

  describe("verifyFromPattern", () => {
    modePatternCases.forEach(({ mode, expected }) => {
      test(`${mode} mode pattern`, () => {
        verifyRomanDisplayStrings(mode, expected);
      });
    });
  });
});

describe("getScaleDegreeDisplayString", () => {
  let constants: GreekTestConstants;

  beforeEach(() => {
    constants = GreekTestConstants.getInstance();
  });

  const scaleCases = [
    {
      desc: "Ionian (Major) Scale",
      cases: [
        {
          key: "C Ionian",
          musicalKey: () => constants.C_IONIAN_KEY,
          expected: ["I", "", "ii", "", "iii", "IV", "", "V", "", "vi", "", "vii°"],
        },
        {
          key: "D Ionian",
          musicalKey: () => constants.D_IONIAN_KEY,
          expected: ["", "vii°", "I", "", "ii", "", "iii", "IV", "", "V", "", "vi"],
        },
      ],
    },
    {
      desc: "Dorian Mode",
      cases: [
        {
          key: "C Dorian",
          musicalKey: () => constants.C_DORIAN_KEY,
          expected: ["i", "", "ii", "♭III", "", "IV", "", "v", "", "vi°", "♭VII", ""],
        },
        {
          key: "D Dorian",
          musicalKey: () => constants.D_DORIAN_KEY,
          expected: ["♭VII", "", "i", "", "ii", "♭III", "", "IV", "", "v", "", "vi°"],
        },
      ],
    },
  ];

  scaleCases.forEach(({ desc, cases }) => {
    describe(desc, () => {
      cases.forEach(({ key, musicalKey, expected }) => {
        it(`should display correct scale degrees for ${key}`, () => {
          verifyRomanArray(musicalKey(), expected);
        });
      });
    });
  });
});
