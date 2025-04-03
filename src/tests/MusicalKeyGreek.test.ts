import { noteTextToIndex } from "../types/ChromaticIndex";
import { MusicalKey } from "../types/MusicalKey";
import { GreekTestConstants } from "./utils/GreekTestConstants";

function verifyGreekModeScaleNotes(musicalKey: MusicalKey, expectedNotes: string[]) {
  const noteList = musicalKey.getAbsoluteScaleNotes();
  const expectedIndices = expectedNotes.map((note) => noteTextToIndex(note));
  expect(noteList).toEqual(expectedIndices);
}

describe("Greek Mode Index Arrays", () => {
  let constants: GreekTestConstants;

  beforeEach(() => {
    constants = GreekTestConstants.getInstance();
  });

  describe("Ionian (Major) Mode", () => {
    test("C Ionian mode - major scale pattern", () => {
      verifyGreekModeScaleNotes(constants.C_IONIAN_KEY, ["C", "D", "E", "F", "G", "A", "B"]);
    });
  });

  describe("Dorian Mode", () => {
    test("D Dorian mode - traditional position", () => {
      verifyGreekModeScaleNotes(constants.D_DORIAN_KEY, ["D", "E", "F", "G", "A", "B", "C"]);
    });
    test("C Dorian mode - shows characteristic b3 and b7", () => {
      verifyGreekModeScaleNotes(constants.C_DORIAN_KEY, ["C", "D", "Eb", "F", "G", "A", "Bb"]);
    });
  });

  describe("Phrygian Mode", () => {
    test("E Phrygian mode - traditional position", () => {
      verifyGreekModeScaleNotes(constants.E_PHRYGIAN_KEY, ["E", "F", "G", "A", "B", "C", "D"]);
    });
    test("C Phrygian mode - shows characteristic b2, b3, b6, b7", () => {
      verifyGreekModeScaleNotes(constants.C_PHRYGIAN_KEY, ["C", "Db", "Eb", "F", "G", "Ab", "Bb"]);
    });
  });

  describe("Lydian Mode", () => {
    test("F Lydian mode - traditional position", () => {
      verifyGreekModeScaleNotes(constants.F_LYDIAN_KEY, ["F", "G", "A", "B", "C", "D", "E"]);
    });
    test("C Lydian mode - shows characteristic #4", () => {
      verifyGreekModeScaleNotes(constants.C_LYDIAN_KEY, ["C", "D", "E", "F#", "G", "A", "B"]);
    });
  });

  describe("Mixolydian Mode", () => {
    test("G Mixolydian mode - traditional position", () => {
      verifyGreekModeScaleNotes(constants.G_MIXOLYDIAN_KEY, ["G", "A", "B", "C", "D", "E", "F"]);
    });
    test("C Mixolydian mode - shows characteristic b7", () => {
      verifyGreekModeScaleNotes(constants.C_MIXOLYDIAN_KEY, ["C", "D", "E", "F", "G", "A", "Bb"]);
    });
  });

  describe("Aeolian (Natural Minor) Mode", () => {
    test("A Aeolian mode - traditional position", () => {
      verifyGreekModeScaleNotes(constants.A_AEOLIAN_KEY, ["A", "B", "C", "D", "E", "F", "G"]);
    });
    test("C Aeolian mode - shows characteristic b3, b6, b7", () => {
      verifyGreekModeScaleNotes(constants.C_AEOLIAN_KEY, ["C", "D", "Eb", "F", "G", "Ab", "Bb"]);
    });
  });

  describe("Locrian Mode", () => {
    test("B Locrian mode - traditional position", () => {
      verifyGreekModeScaleNotes(constants.B_LOCRIAN_KEY, ["B", "C", "D", "E", "F", "G", "A"]);
    });
    test("C Locrian mode - shows characteristic b2, b3, b5, b6, b7", () => {
      verifyGreekModeScaleNotes(constants.C_LOCRIAN_KEY, ["C", "Db", "Eb", "F", "Gb", "Ab", "Bb"]);
    });
  });
});
