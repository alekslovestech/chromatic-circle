import { MusicalKey } from "../types/Keys/MusicalKey";
import { RomanResolver } from "../types/RomanResolver";
import { ChordType } from "../types/NoteGroupingTypes";
import { NoteConverter } from "../types/NoteConverter";
import { GreekTestConstants } from "./utils/GreekTestConstants";

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

describe("Resolved roman numeral tests", () => {
  let constants: GreekTestConstants;
  beforeEach(() => {
    constants = GreekTestConstants.getInstance();
  });

  test("Resolve roman numeral I in C major", () => {
    verifyResolvedChord(constants.C_IONIAN_KEY, "I", "C", ChordType.Major);
  });

  test("Resolve roman numeral Imaj7 in C major", () => {
    verifyResolvedChord(constants.C_IONIAN_KEY, "Imaj7", "C", ChordType.Major7);
  });

  test("Resolve roman numeral V in C major", () => {
    verifyResolvedChord(constants.C_IONIAN_KEY, "V", "G", ChordType.Major);
  });

  test("Resolve roman numeral in E major", () => {
    verifyResolvedChord(constants.E_MAJOR, "I", "E", ChordType.Major);
  });

  test("Resolve roman numeral V in E major", () => {
    verifyResolvedChord(constants.E_MAJOR, "V", "B", ChordType.Major);
  });

  test("Resolve roman numeral ♭VI in G major", () => {
    verifyResolvedChord(constants.G_MAJOR, "♭VI", "Eb", ChordType.Major);
  });
});
