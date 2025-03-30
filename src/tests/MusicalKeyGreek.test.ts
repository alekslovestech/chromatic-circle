import { noteTextToIndex } from "../types/ChromaticIndex";
import { GreekModeType, MusicalKey } from "../types/MusicalKey";

//NB: here we don't care about the distinction between C# and Db, etc.
//We just want to verify that the scale is correct.
function verifyNoteList(musicalKey: MusicalKey, expectedNotes: string[]) {
  const noteList = musicalKey.generateIndexArray();
  const expectedIndices = expectedNotes.map((note) => noteTextToIndex(note));
  expect(noteList).toEqual(expectedIndices);
}

describe("Greek Mode Index Arrays", () => {
  describe("Ionian (Major) Mode", () => {
    const C_IONIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Ionian);

    test("has correct scale indexes", () => {
      verifyNoteList(C_IONIAN_KEY, ["C", "D", "E", "F", "G", "A", "B"]);
    });
  });

  describe("Dorian Mode", () => {
    const D_DORIAN_KEY = MusicalKey.fromGreekMode("D", GreekModeType.Dorian);

    test("has correct scale indexes", () => {
      verifyNoteList(D_DORIAN_KEY, ["D", "E", "F", "G", "A", "B", "C"]);
    });
  });

  describe("Phrygian Mode", () => {
    const E_PHRYGIAN_KEY = MusicalKey.fromGreekMode("E", GreekModeType.Phrygian);

    test("has correct scale indexes", () => {
      verifyNoteList(E_PHRYGIAN_KEY, ["E", "F", "G", "A", "B", "C", "D"]);
    });
  });

  describe("Lydian Mode", () => {
    const F_LYDIAN_KEY = MusicalKey.fromGreekMode("F", GreekModeType.Lydian);

    test("has correct scale indexes", () => {
      verifyNoteList(F_LYDIAN_KEY, ["F", "G", "A", "B", "C", "D", "E"]);
    });
  });

  describe("Mixolydian Mode", () => {
    const G_MIXOLYDIAN_KEY = MusicalKey.fromGreekMode("G", GreekModeType.Mixolydian);

    test("has correct scale indexes", () => {
      verifyNoteList(G_MIXOLYDIAN_KEY, ["G", "A", "B", "C", "D", "E", "F"]);
    });

    describe("Aeolian (Natural Minor) Mode", () => {
      const A_AEOLIAN_KEY = MusicalKey.fromGreekMode("A", GreekModeType.Aeolian);

      test("has correct scale indexes", () => {
        verifyNoteList(A_AEOLIAN_KEY, ["A", "B", "C", "D", "E", "F", "G"]);
      });
    });

    describe("Locrian Mode", () => {
      const B_LOCRIAN_KEY = MusicalKey.fromGreekMode("B", GreekModeType.Locrian);

      test("has correct scale indexes", () => {
        verifyNoteList(B_LOCRIAN_KEY, ["B", "C", "D", "E", "F", "G", "A"]);
      });
    });
  });
});
