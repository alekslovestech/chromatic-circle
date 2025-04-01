import { noteTextToIndex } from "../types/ChromaticIndex";
import { GreekModeType } from "../types/GreekMode";
import { MusicalKey } from "../types/MusicalKey";

// Helper function to verify scale notes
// We don't care about enharmonic equivalents (C# vs Db) here,
// just that the scale degrees match the expected pattern
function verifyScaleDegreeList(musicalKey: MusicalKey, expectedNotes: string[]) {
  const noteList = musicalKey.generateIndexArray();
  const expectedIndices = expectedNotes.map((note) => noteTextToIndex(note));
  expect(noteList).toEqual(expectedIndices);
}

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
      verifyScaleDegreeList(C_IONIAN_KEY, ["1", "2", "3", "4", "5", "6", "7"]);
    });
  });

  describe("Dorian Mode", () => {
    test("D Dorian mode - traditional position", () => {
      verifyScaleDegreeList(D_DORIAN_KEY, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Dorian mode - shows characteristic b3 and b7", () => {
      verifyScaleDegreeList(C_DORIAN_KEY, ["1", "2", "b3", "4", "5", "6", "b7"]);
    });
  });

  describe("Phrygian Mode", () => {
    test("E Phrygian mode - traditional position", () => {
      verifyScaleDegreeList(E_PHRYGIAN_KEY, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Phrygian mode - shows characteristic b2, b3, b6, b7", () => {
      verifyScaleDegreeList(C_PHRYGIAN_KEY, ["1", "b2", "b3", "4", "5", "b6", "b7"]);
    });
  });

  describe("Lydian Mode", () => {
    test("F Lydian mode - traditional position", () => {
      verifyScaleDegreeList(F_LYDIAN_KEY, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Lydian mode - shows characteristic #4", () => {
      verifyScaleDegreeList(C_LYDIAN_KEY, ["1", "2", "3", "#4", "5", "6", "7"]);
    });
  });

  describe("Mixolydian Mode", () => {
    test("G Mixolydian mode - traditional position", () => {
      verifyScaleDegreeList(G_MIXOLYDIAN_KEY, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Mixolydian mode - shows characteristic b7", () => {
      verifyScaleDegreeList(C_MIXOLYDIAN_KEY, ["1", "2", "3", "4", "5", "6", "b7"]);
    });
  });

  describe("Aeolian (Natural Minor) Mode", () => {
    test("A Aeolian mode - traditional position", () => {
      verifyScaleDegreeList(A_AEOLIAN_KEY, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Aeolian mode - shows characteristic b3, b6, b7", () => {
      verifyScaleDegreeList(C_AEOLIAN_KEY, ["1", "2", "b3", "4", "5", "b6", "b7"]);
    });
  });

  describe("Locrian Mode", () => {
    test("B Locrian mode - traditional position", () => {
      verifyScaleDegreeList(B_LOCRIAN_KEY, ["1", "2", "3", "4", "5", "6", "7"]);
    });
    test("C Locrian mode - shows characteristic b2, b3, b5, b6, b7", () => {
      verifyScaleDegreeList(C_LOCRIAN_KEY, ["1", "b2", "b3", "4", "b5", "b6", "b7"]);
    });
  });
});
