import { KeyType, MusicalKey } from "../types/MusicalKey";
import { NoteInfo } from "../types/NoteInfo";
import { AccidentalType } from "../types/AccidentalType";
import { noteTextToIndex } from "../types/ChromaticIndex";

function verifyResolvedNote(musicalKey: MusicalKey, noteText: string, expectedNote: NoteInfo) {
  const chromaticIndex = noteTextToIndex(noteText);
  const note = musicalKey.getNoteInKey(chromaticIndex);
  expect(note).toEqual(expectedNote);
}

const cMajor = MusicalKey.fromClassicalMode("C", KeyType.Major);
const dMajor = MusicalKey.fromClassicalMode("D", KeyType.Major);
const dMinor = MusicalKey.fromClassicalMode("D", KeyType.Minor);
const eMajor = MusicalKey.fromClassicalMode("E", KeyType.Major);

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
