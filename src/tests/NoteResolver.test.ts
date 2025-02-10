import { KeyType, MusicalKey } from "../types/MusicalKey";
import { NoteWithAccidental } from "../types/NoteWithAccidental";
import { AccidentalType } from "../types/AccidentalType";
import { noteTextToIndex } from "../types/ChromaticIndex";

function verifyResolvedNote(
  musicalKey: MusicalKey,
  noteText: string,
  expectedNote: NoteWithAccidental,
) {
  const chromaticIndex = noteTextToIndex(noteText);
  const note = musicalKey.getNoteWithAccidentalFromIndexAndKey(chromaticIndex);
  expect(note).toEqual(expectedNote);
}

const cMajor = new MusicalKey("C", KeyType.Major);
const dMajor = new MusicalKey("D", KeyType.Major);
const dMinor = new MusicalKey("D", KeyType.Minor);
const eMajor = new MusicalKey("E", KeyType.Major);

describe("Resolved roman numeral tests", () => {
  test("D in C major", () => {
    verifyResolvedNote(cMajor, "D", {
      noteName: "D",
      accidental: AccidentalType.None,
    });
  });

  test("C# in C major", () => {
    verifyResolvedNote(cMajor, "C#", {
      noteName: "C",
      accidental: AccidentalType.Sharp,
    });
  });

  test("Db in C major", () => {
    verifyResolvedNote(cMajor, "Db", {
      noteName: "C",
      accidental: AccidentalType.Sharp,
    });
  });

  test("F# in D major", () => {
    verifyResolvedNote(dMajor, "F#", {
      noteName: "F",
      accidental: AccidentalType.None,
    });
  });

  test("F (natural) in D major", () => {
    verifyResolvedNote(dMajor, "F", {
      noteName: "F",
      accidental: AccidentalType.Natural,
    });
  });

  test("Bb in D minor", () => {
    verifyResolvedNote(dMinor, "Bb", {
      noteName: "B",
      accidental: AccidentalType.None,
    });
  });

  test("B (natural) in D minor", () => {
    verifyResolvedNote(dMinor, "B", {
      noteName: "B",
      accidental: AccidentalType.Natural,
    });
  });
});
