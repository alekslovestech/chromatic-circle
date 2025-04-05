import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { NoteInfo } from "../types/NoteInfo";
import { AccidentalType } from "../types/AccidentalType";
import { KeyType } from "../types/Keys/KeyType";
import { NoteConverter } from "../types/NoteConverter";

/**
 * Helper function to verify that a note resolves correctly in a given key
 * @param musicalKey - The musical key context to resolve the note in
 * @param noteText - The text representation of the note (e.g. "C#", "Bb")
 * @param expectedNote - The expected NoteInfo result after resolution
 */
function verifyResolvedNote(musicalKey: MusicalKey, noteText: string, expectedNote: NoteInfo) {
  const chromaticIndex = NoteConverter.toChromaticIndex(noteText);
  const note = musicalKey.getNoteInKey(chromaticIndex);
  expect(note).toEqual(expectedNote);
}

const cMajor = DEFAULT_MUSICAL_KEY;
const dMajor = MusicalKey.fromClassicalMode("D", KeyType.Major);
const dMinor = MusicalKey.fromClassicalMode("D", KeyType.Minor);
const eMajor = MusicalKey.fromClassicalMode("E", KeyType.Major);

describe("Note resolution in keys", () => {
  describe("C major", () => {
    test("D resolves without accidental", () => {
      verifyResolvedNote(cMajor, "D", new NoteInfo("D", AccidentalType.None));
    });

    test("C# resolves as sharp", () => {
      verifyResolvedNote(cMajor, "C#", new NoteInfo("C", AccidentalType.Sharp));
    });

    test("Db is enharmonically equivalent to C#", () => {
      verifyResolvedNote(cMajor, "Db", new NoteInfo("C", AccidentalType.Sharp));
    });
  });

  describe("D major", () => {
    test("F# is diatonic (no accidental needed)", () => {
      verifyResolvedNote(dMajor, "F#", new NoteInfo("F", AccidentalType.None));
    });

    test("F natural requires explicit natural", () => {
      verifyResolvedNote(dMajor, "F", new NoteInfo("F", AccidentalType.Natural));
    });
  });

  describe("D minor", () => {
    test("Bb is diatonic (no accidental needed)", () => {
      verifyResolvedNote(dMinor, "Bb", new NoteInfo("B", AccidentalType.None));
    });

    test("B natural requires explicit natural", () => {
      verifyResolvedNote(dMinor, "B", new NoteInfo("B", AccidentalType.Natural));
    });
  });
});
