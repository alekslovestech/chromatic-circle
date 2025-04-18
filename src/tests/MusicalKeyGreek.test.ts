import { MusicalKey } from "../types/Keys/MusicalKey";
import { NoteConverter } from "../types/NoteConverter";
import { GreekTestConstants } from "./utils/GreekTestConstants";

function verifyGreekModeScaleNotes(musicalKey: MusicalKey, expectedNotes: string[]) {
  const noteList = musicalKey.greekModeInfo.getAbsoluteScaleNotes(musicalKey.tonicIndex);
  const expectedIndices = NoteConverter.noteArrayToIndices(expectedNotes);
  expect(noteList).toEqual(expectedIndices);
}

describe("Greek Mode Index Arrays", () => {
  const constants = GreekTestConstants.getInstance();

  const testCases = [
    {
      mode: "Ionian (Major)",
      tests: [
        {
          desc: "C Ionian mode - major scale pattern",
          key: constants.C_IONIAN_KEY,
          expected: ["C", "D", "E", "F", "G", "A", "B"],
        },
      ],
    },
    {
      mode: "Dorian",
      tests: [
        {
          desc: "D Dorian mode - traditional position",
          key: constants.D_DORIAN_KEY,
          expected: ["D", "E", "F", "G", "A", "B", "C"],
        },
        {
          desc: "C Dorian mode - shows characteristic b3 and b7",
          key: constants.C_DORIAN_KEY,
          expected: ["C", "D", "Eb", "F", "G", "A", "Bb"],
        },
      ],
    },
    {
      mode: "Phrygian",
      tests: [
        {
          desc: "E Phrygian mode - traditional position",
          key: constants.E_PHRYGIAN_KEY,
          expected: ["E", "F", "G", "A", "B", "C", "D"],
        },
        {
          desc: "C Phrygian mode - shows characteristic b2, b3, b6, b7",
          key: constants.C_PHRYGIAN_KEY,
          expected: ["C", "Db", "Eb", "F", "G", "Ab", "Bb"],
        },
      ],
    },
    {
      mode: "Lydian",
      tests: [
        {
          desc: "F Lydian mode - traditional position",
          key: constants.F_LYDIAN_KEY,
          expected: ["F", "G", "A", "B", "C", "D", "E"],
        },
        {
          desc: "C Lydian mode - shows characteristic #4",
          key: constants.C_LYDIAN_KEY,
          expected: ["C", "D", "E", "F#", "G", "A", "B"],
        },
      ],
    },
    {
      mode: "Mixolydian",
      tests: [
        {
          desc: "G Mixolydian mode - traditional position",
          key: constants.G_MIXOLYDIAN_KEY,
          expected: ["G", "A", "B", "C", "D", "E", "F"],
        },
        {
          desc: "C Mixolydian mode - shows characteristic b7",
          key: constants.C_MIXOLYDIAN_KEY,
          expected: ["C", "D", "E", "F", "G", "A", "Bb"],
        },
      ],
    },
    {
      mode: "Aeolian (Natural Minor)",
      tests: [
        {
          desc: "A Aeolian mode - traditional position",
          key: constants.A_AEOLIAN_KEY,
          expected: ["A", "B", "C", "D", "E", "F", "G"],
        },
        {
          desc: "C Aeolian mode - shows characteristic b3, b6, b7",
          key: constants.C_AEOLIAN_KEY,
          expected: ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
        },
      ],
    },
    {
      mode: "Locrian",
      tests: [
        {
          desc: "B Locrian mode - traditional position",
          key: constants.B_LOCRIAN_KEY,
          expected: ["B", "C", "D", "E", "F", "G", "A"],
        },
        {
          desc: "C Locrian mode - shows characteristic b2, b3, b5, b6, b7",
          key: constants.C_LOCRIAN_KEY,
          expected: ["C", "Db", "Eb", "F", "Gb", "Ab", "Bb"],
        },
      ],
    },
  ];

  testCases.forEach(({ mode, tests }) => {
    describe(mode + " Mode", () => {
      tests.forEach(({ desc, key, expected }) => {
        test(desc, () => {
          verifyGreekModeScaleNotes(key, expected);
        });
      });
    });
  });
});
