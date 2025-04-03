import { GreekModeType } from "../types/GreekMode";
import { MusicalKey } from "../types/MusicalKey";
import { verifyGreekModeScaleNotes } from "./utils/DisplayTestUtils";

describe("Greek Mode Index Arrays", () => {
  // C-based modes for comparing accidental patterns
  const C_IONIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Ionian);
  const C_DORIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Dorian);
  const C_PHRYGIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Phrygian);
  const C_LYDIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Lydian);
  const C_MIXOLYDIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Mixolydian);
  const C_AEOLIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Aeolian);
  const C_LOCRIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Locrian);

  // Traditional starting positions for each mode
  const D_DORIAN_KEY = MusicalKey.fromGreekMode("D", GreekModeType.Dorian);
  const E_PHRYGIAN_KEY = MusicalKey.fromGreekMode("E", GreekModeType.Phrygian);
  const F_LYDIAN_KEY = MusicalKey.fromGreekMode("F", GreekModeType.Lydian);
  const G_MIXOLYDIAN_KEY = MusicalKey.fromGreekMode("G", GreekModeType.Mixolydian);
  const A_AEOLIAN_KEY = MusicalKey.fromGreekMode("A", GreekModeType.Aeolian);
  const B_LOCRIAN_KEY = MusicalKey.fromGreekMode("B", GreekModeType.Locrian);

  describe("Ionian (Major) Mode", () => {
    test("C Ionian mode - major scale pattern", () => {
      verifyGreekModeScaleNotes(C_IONIAN_KEY, ["C", "D", "E", "F", "G", "A", "B"]);
    });
  });

  describe("Dorian Mode", () => {
    test("D Dorian mode - traditional position", () => {
      verifyGreekModeScaleNotes(D_DORIAN_KEY, ["D", "E", "F", "G", "A", "B", "C"]);
    });
    test("C Dorian mode - shows characteristic b3 and b7", () => {
      verifyGreekModeScaleNotes(C_DORIAN_KEY, ["C", "D", "Eb", "F", "G", "A", "Bb"]);
    });
  });

  describe("Phrygian Mode", () => {
    test("E Phrygian mode - traditional position", () => {
      verifyGreekModeScaleNotes(E_PHRYGIAN_KEY, ["E", "F", "G", "A", "B", "C", "D"]);
    });
    test("C Phrygian mode - shows characteristic b2, b3, b6, b7", () => {
      verifyGreekModeScaleNotes(C_PHRYGIAN_KEY, ["C", "Db", "Eb", "F", "G", "Ab", "Bb"]);
    });
  });

  describe("Lydian Mode", () => {
    test("F Lydian mode - traditional position", () => {
      verifyGreekModeScaleNotes(F_LYDIAN_KEY, ["F", "G", "A", "B", "C", "D", "E"]);
    });
    test("C Lydian mode - shows characteristic #4", () => {
      verifyGreekModeScaleNotes(C_LYDIAN_KEY, ["C", "D", "E", "F#", "G", "A", "B"]);
    });
  });

  describe("Mixolydian Mode", () => {
    test("G Mixolydian mode - traditional position", () => {
      verifyGreekModeScaleNotes(G_MIXOLYDIAN_KEY, ["G", "A", "B", "C", "D", "E", "F"]);
    });
    test("C Mixolydian mode - shows characteristic b7", () => {
      verifyGreekModeScaleNotes(C_MIXOLYDIAN_KEY, ["C", "D", "E", "F", "G", "A", "Bb"]);
    });
  });

  describe("Aeolian (Natural Minor) Mode", () => {
    test("A Aeolian mode - traditional position", () => {
      verifyGreekModeScaleNotes(A_AEOLIAN_KEY, ["A", "B", "C", "D", "E", "F", "G"]);
    });
    test("C Aeolian mode - shows characteristic b3, b6, b7", () => {
      verifyGreekModeScaleNotes(C_AEOLIAN_KEY, ["C", "D", "Eb", "F", "G", "Ab", "Bb"]);
    });
  });

  describe("Locrian Mode", () => {
    test("B Locrian mode - traditional position", () => {
      verifyGreekModeScaleNotes(B_LOCRIAN_KEY, ["B", "C", "D", "E", "F", "G", "A"]);
    });
    test("C Locrian mode - shows characteristic b2, b3, b5, b6, b7", () => {
      verifyGreekModeScaleNotes(C_LOCRIAN_KEY, ["C", "Db", "Eb", "F", "Gb", "Ab", "Bb"]);
    });
  });
});
