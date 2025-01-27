import { KeyType, MusicalKey } from "../types/MusicalKey";
import { noteTextToIndex } from "../utils/NoteUtils";
import { RomanResolver } from "../types/RomanResolver";
import { ChordType } from "../types/NoteGroupingTypes";

function verifyResolvedChord(
  musicalKey: MusicalKey,
  romanNumeral: string,
  noteName: string,
  chordType: ChordType,
) {
  const noteIndex = noteTextToIndex(noteName);
  const absoluteChord = RomanResolver.resolveAsChord(romanNumeral, musicalKey);
  expect(absoluteChord).toEqual({ chromaticIndex: noteIndex, chordType: chordType });
}

describe("Resolved roman numeral tests", () => {
  test("Resolve roman numeral I in C major", () => {
    const cMajor = new MusicalKey("C", KeyType.Major);
    verifyResolvedChord(cMajor, "I", "C", ChordType.Major);
  });

  test("Resolve roman numeral Imaj7 in C major", () => {
    const cMajor = new MusicalKey("C", KeyType.Major);
    verifyResolvedChord(cMajor, "Imaj7", "C", ChordType.Major7);
  });

  test("Resolve roman numeral V in C major", () => {
    const cMajor = new MusicalKey("C", KeyType.Major);
    verifyResolvedChord(cMajor, "V", "G", ChordType.Major);
  });

  test("Resolve roman numeral in E major", () => {
    const eMajor = new MusicalKey("E", KeyType.Major);
    verifyResolvedChord(eMajor, "I", "E", ChordType.Major);
  });

  test("Resolve roman numeral V in E major", () => {
    const eMajor = new MusicalKey("E", KeyType.Major);
    verifyResolvedChord(eMajor, "V", "B", ChordType.Major);
  });

  test("Resolve roman numeral ♭VI in G major", () => {
    const gMajor = new MusicalKey("G", KeyType.Major);
    verifyResolvedChord(gMajor, "♭VI", "Eb", ChordType.Major);
  });
});
