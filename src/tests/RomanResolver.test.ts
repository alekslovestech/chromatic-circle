import { KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";
import { RomanResolver } from "../types/RomanResolver";
import { ChordType } from "../types/NoteGroupingTypes";
import { noteTextToIndex } from "../types/ChromaticIndex";

function verifyResolvedChord(
  musicalKey: MusicalKey,
  romanNumeral: string,
  noteName: string,
  chordType: ChordType,
) {
  const noteIndex = noteTextToIndex(noteName);
  const absoluteChord = RomanResolver.resolveAsAbsoluteChord(romanNumeral, musicalKey);
  expect(absoluteChord).toEqual({ chromaticIndex: noteIndex, chordType: chordType });
}

const C_MAJOR = MusicalKeyUtil.DEFAULT_MUSICAL_KEY;
const E_MAJOR = MusicalKey.fromClassicalMode("E", KeyType.Major);

describe("Resolved roman numeral tests", () => {
  test("Resolve roman numeral I in C major", () => {
    verifyResolvedChord(C_MAJOR, "I", "C", ChordType.Major);
  });

  test("Resolve roman numeral Imaj7 in C major", () => {
    verifyResolvedChord(C_MAJOR, "Imaj7", "C", ChordType.Major7);
  });

  test("Resolve roman numeral V in C major", () => {
    verifyResolvedChord(C_MAJOR, "V", "G", ChordType.Major);
  });

  test("Resolve roman numeral in E major", () => {
    verifyResolvedChord(E_MAJOR, "I", "E", ChordType.Major);
  });

  test("Resolve roman numeral V in E major", () => {
    verifyResolvedChord(E_MAJOR, "V", "B", ChordType.Major);
  });

  test("Resolve roman numeral ♭VI in G major", () => {
    const gMajor = MusicalKey.fromClassicalMode("G", KeyType.Major);
    verifyResolvedChord(gMajor, "♭VI", "Eb", ChordType.Major);
  });
});

describe("Scale degree from chromatic index", () => {
  test("C in C major (I)", () => {
    expect(RomanResolver.getScaleDegreeFromNoteAndKey("C", C_MAJOR)).toBe(1);
  });

  /*
  test("E♭ in C major (♭III)", () => {
    const key = new MusicalKey("C", KeyType.Major); // C major
    expect(RomanResolver.getScaleDegreeFromNoteAndKey("E♭", key)).toBe(3);
  }); */

  test("G in C major (V)", () => {
    expect(RomanResolver.getScaleDegreeFromNoteAndKey("G", C_MAJOR)).toBe(5);
  });

  test("F♯ in D major (III)", () => {
    const key = MusicalKey.fromClassicalMode("D", KeyType.Major); // D major
    expect(RomanResolver.getScaleDegreeFromNoteAndKey("F#", key)).toBe(3);
  });

  test("B♭ in F major (IV)", () => {
    const key = MusicalKey.fromClassicalMode("F", KeyType.Major); // F major
    expect(RomanResolver.getScaleDegreeFromNoteAndKey("Bb", key)).toBe(4);
  });
});
