import { KeyType, MusicalKey } from "../types/MusicalKey";
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

const cMajor = new MusicalKey("C", KeyType.Major);
const eMajor = new MusicalKey("E", KeyType.Major);
describe("Resolved roman numeral tests", () => {
  test("Resolve roman numeral I in C major", () => {
    verifyResolvedChord(cMajor, "I", "C", ChordType.Major);
  });

  test("Resolve roman numeral Imaj7 in C major", () => {
    verifyResolvedChord(cMajor, "Imaj7", "C", ChordType.Major7);
  });

  test("Resolve roman numeral V in C major", () => {
    verifyResolvedChord(cMajor, "V", "G", ChordType.Major);
  });

  test("Resolve roman numeral in E major", () => {
    verifyResolvedChord(eMajor, "I", "E", ChordType.Major);
  });

  test("Resolve roman numeral V in E major", () => {
    verifyResolvedChord(eMajor, "V", "B", ChordType.Major);
  });

  test("Resolve roman numeral ♭VI in G major", () => {
    const gMajor = new MusicalKey("G", KeyType.Major);
    verifyResolvedChord(gMajor, "♭VI", "Eb", ChordType.Major);
  });
});
