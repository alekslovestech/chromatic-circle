import { ChordProgression } from "../types/ChordProgression";
import { ixRomanString } from "../types/IndexTypes";
import { KeyType, MusicalKey } from "../types/MusicalKey";
import { ChordQuality, RomanNumeral } from "../types/RomanNumeral";
import { noteTextToIndex } from "../utils/NoteUtils";

function verifyResolvedChord(
  musicalKey: MusicalKey,
  romanNumeral: RomanNumeral,
  noteName: string,
  quality: ChordQuality,
) {
  const noteIndex = noteTextToIndex(noteName);
  const resolvedChordQuality = romanNumeral.getResolvedChordQuality(musicalKey);
  expect(resolvedChordQuality).toEqual({ chromaticIndex: noteIndex, quality: quality });
}

describe("Resolved roman numeral tests", () => {
  test("Resolve roman numeral I in C major", () => {
    const cMajor = new MusicalKey("C", KeyType.Major);
    verifyResolvedChord(cMajor, new RomanNumeral("I"), "C", ChordQuality.Major);
  });

  test("Resolve roman numeral V in C major", () => {
    const cMajor = new MusicalKey("C", KeyType.Major);
    verifyResolvedChord(cMajor, new RomanNumeral("V"), "G", ChordQuality.Major);
  });

  test("Resolve roman numeral in E major", () => {
    const eMajor = new MusicalKey("E", KeyType.Major);
    verifyResolvedChord(eMajor, new RomanNumeral("I"), "E", ChordQuality.Major);
  });

  test("Resolve roman numeral V in E major", () => {
    const eMajor = new MusicalKey("E", KeyType.Major);
    verifyResolvedChord(eMajor, new RomanNumeral("V"), "B", ChordQuality.Major);
  });
});

test("Chord progression derives correct chords for C major key", () => {
  // Define a key
  const cMajor = new MusicalKey("C", KeyType.Major);

  // Define Roman numerals
  const I = new RomanNumeral("I");
  const vi = new RomanNumeral("vi");
  const IV = new RomanNumeral("IV");
  const V = new RomanNumeral("V");

  // Create a progression
  const progression = new ChordProgression(cMajor, [I, vi, IV, V], "50s progression");

  // Derive concrete chords
  const derivedChords = progression.resolvedChords();

  // Check the output
  expect(derivedChords).toEqual(["C (major)", "A (minor)", "F (major)", "G (major)"]);
});

test.skip("Something Chord progression derives correct chords for C major key", () => {
  // Define a key
  const cMajor = new MusicalKey("C", KeyType.Major);

  // Define Roman numerals
  const I = new RomanNumeral(ixRomanString("I"));
  const IMaj7 = new RomanNumeral(ixRomanString("IMaj7"));
  const I7 = new RomanNumeral(ixRomanString("I7"));
  const IV = new RomanNumeral(ixRomanString("IV"));

  // Create a progression
  const progression = new ChordProgression(cMajor, [I, IMaj7, I7, IV], "Something");

  // Derive concrete chords
  const derivedChords = progression.resolvedChords();

  // Check the output
  expect(derivedChords).toEqual(["C (major)", "C (maj7)", "C (7)", "F (major)"]);
});
