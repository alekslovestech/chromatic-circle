import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/MusicalKey";
import { RomanResolver } from "../types/RomanResolver";
import { ChordType } from "../types/NoteGroupingTypes";
import { KeyType } from "../types/KeyType";
import { NoteConverter } from "../types/NoteConverter";
function verifyResolvedChord(
  musicalKey: MusicalKey,
  romanNumeral: string,
  noteName: string,
  chordType: ChordType,
) {
  const noteIndex = NoteConverter.toChromaticIndex(noteName);
  const absoluteChord = RomanResolver.resolveAsAbsoluteChord(romanNumeral, musicalKey);
  expect(absoluteChord).toEqual({ chromaticIndex: noteIndex, chordType: chordType });
}

const C_MAJOR = DEFAULT_MUSICAL_KEY;
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
