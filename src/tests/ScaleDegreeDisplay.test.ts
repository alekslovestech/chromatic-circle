import { GreekModeDictionary } from "../types/GreekModes/GreekModeDictionary";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { TWELVE } from "../types/NoteConstants";
import { KeyDisplayMode } from "../types/SettingModes";
import { GreekTestConstants } from "./utils/GreekTestConstants";

function verifyScaleDegreeDisplayStrings(greekMode: GreekModeType, expectedNotes: string[]) {
  const greekModeInfo = GreekModeDictionary.getModeInfo(greekMode);
  const displayStrings = greekModeInfo.getDisplayStrings(KeyDisplayMode.ScaleDegree);
  expect(displayStrings).toEqual(expectedNotes);
}

function verifyScaleDegreesArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  const displayStrings = musicalKey.getDisplayStringArray(KeyDisplayMode.ScaleDegree);
  expect(displayStrings).toEqual(expectedArray);
}
describe("Scale Degree Display", () => {
  describe("Greek Mode Patterns", () => {
    const modePatternCases = [
      {
        mode: GreekModeType.Ionian,
        expected: ["1", "2", "3", "4", "5", "6", "7"],
      },
      {
        mode: GreekModeType.Dorian,
        expected: ["1", "2", "♭3", "4", "5", "6", "♭7"],
      },
      {
        mode: GreekModeType.UkrainianDorian,
        expected: ["1", "2", "♭3", "♯4", "5", "6", "♭7"],
      },
      {
        mode: GreekModeType.Phrygian,
        expected: ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"],
      },
      {
        mode: GreekModeType.Lydian,
        expected: ["1", "2", "3", "♯4", "5", "6", "7"],
      },
      {
        mode: GreekModeType.Mixolydian,
        expected: ["1", "2", "3", "4", "5", "6", "♭7"],
      },
      {
        mode: GreekModeType.Aeolian,
        expected: ["1", "2", "♭3", "4", "5", "♭6", "♭7"],
      },
      {
        mode: GreekModeType.HarmonicMinor,
        expected: ["1", "2", "♭3", "4", "5", "♭6", "7"],
      },
      {
        mode: GreekModeType.HungarianMinor,
        expected: ["1", "2", "♭3", "♯4", "5", "♭6", "7"],
      },
      {
        mode: GreekModeType.Locrian,
        expected: ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"],
      },
    ];

    modePatternCases.forEach(({ mode, expected }) => {
      test(`${mode} mode pattern`, () => {
        verifyScaleDegreeDisplayStrings(mode, expected);
      });
    });
  });

  describe("Scale Degree Arrays", () => {
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
            expected: ["1", "", "2", "", "3", "4", "", "5", "", "6", "", "7"],
          },
          {
            key: "D Ionian",
            musicalKey: () => constants.D_IONIAN_KEY,
            expected: ["", "7", "1", "", "2", "", "3", "4", "", "5", "", "6"],
          },
        ],
      },
      {
        desc: "Dorian Mode",
        cases: [
          {
            key: "C Dorian",
            musicalKey: () => constants.C_DORIAN_KEY,
            expected: ["1", "", "2", "♭3", "", "4", "", "5", "", "6", "♭7", ""],
          },
          {
            key: "D Dorian",
            musicalKey: () => constants.D_DORIAN_KEY,
            expected: ["♭7", "", "1", "", "2", "♭3", "", "4", "", "5", "", "6"],
          },
        ],
      },
    ];

    scaleCases.forEach(({ desc, cases }) => {
      describe(desc, () => {
        cases.forEach(({ key, musicalKey, expected }) => {
          it(`should display correct scale degrees for ${key}`, () => {
            verifyScaleDegreesArray(musicalKey(), expected);
          });
        });
      });
    });
  });
});
