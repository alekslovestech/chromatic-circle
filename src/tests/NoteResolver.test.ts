import { KeyType, MusicalKey } from "../types/MusicalKey";
import { NoteInfo } from "../types/NoteInfo";
import { AccidentalType } from "../types/AccidentalType";
import { noteTextToIndex } from "../types/ChromaticIndex";

/**
 * Helper function to verify that a note resolves correctly in a given key
 * @param musicalKey - The musical key context to resolve the note in
 * @param noteText - The text representation of the note (e.g. "C#", "Bb")
 * @param expectedNote - The expected NoteInfo result after resolution
 */
function verifyResolvedNote(musicalKey: MusicalKey, noteText: string, expectedNote: NoteInfo) {
  const chromaticIndex = noteTextToIndex(noteText);
  const note = musicalKey.getNoteInKey(chromaticIndex);
  expect(note).toEqual(expectedNote);
}

const cMajor = MusicalKey.fromClassicalMode("C", KeyType.Major);
const dMajor = MusicalKey.fromClassicalMode("D", KeyType.Major);
const dMinor = MusicalKey.fromClassicalMode("D", KeyType.Minor);
const eMajor = MusicalKey.fromClassicalMode("E", KeyType.Major);

describe("Note resolution in keys", () => {
  describe("C major", () => {
    test("D resolves without accidental", () => {
      verifyResolvedNote(cMajor, "D", {
        noteName: "D",
        accidental: AccidentalType.None,
      });
    });

    test("C# resolves as sharp", () => {
      verifyResolvedNote(cMajor, "C#", {
        noteName: "C",
        accidental: AccidentalType.Sharp,
      });
    });

    test("Db is enharmonically equivalent to C#", () => {
      verifyResolvedNote(cMajor, "Db", {
        noteName: "C",
        accidental: AccidentalType.Sharp,
      });
    });
  });

  describe("D major", () => {
    test("F# is diatonic (no accidental needed)", () => {
      verifyResolvedNote(dMajor, "F#", {
        noteName: "F",
        accidental: AccidentalType.None,
      });
    });

    test("F natural requires explicit natural", () => {
      verifyResolvedNote(dMajor, "F", {
        noteName: "F",
        accidental: AccidentalType.Natural,
      });
    });
  });

  describe("D minor", () => {
    test("Bb is diatonic (no accidental needed)", () => {
      verifyResolvedNote(dMinor, "Bb", {
        noteName: "B",
        accidental: AccidentalType.None,
      });
    });

    test("B natural requires explicit natural", () => {
      verifyResolvedNote(dMinor, "B", {
        noteName: "B",
        accidental: AccidentalType.Natural,
      });
    });
  });
});
