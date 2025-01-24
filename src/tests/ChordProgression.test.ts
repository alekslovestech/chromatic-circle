import { ChordProgression } from "../types/ChordProgression";
import { ixRomanString } from "../types/IndexTypes";
import { MusicalKey } from "../types/MusicalKey";
import { ChordQuality, ChromaticChordQuality, RomanNumeral } from "../types/RomanNumeral";
import { noteTextToIndex } from "../utils/NoteUtils";

function verifyResolvedChordQuality(
  resolvedChordQuality: ChromaticChordQuality,
  noteName: string,
  quality: ChordQuality,
) {
  const noteIndex = noteTextToIndex(noteName);
  expect(resolvedChordQuality).toEqual({ chromaticIndex: noteIndex, quality: quality });
}

describe("Resolved roman numeral tests", () => {
  test("Resolve roman numeral I in C major", () => {
    const cMajor = new MusicalKey("C", "major");
    const I = new RomanNumeral("I");
    const resolvedIndex = I.resolve(cMajor);
    expect(resolvedIndex).toEqual(0);

    const resolvedChordQuality = I.getResolvedChordQuality(cMajor);
    verifyResolvedChordQuality(resolvedChordQuality, "C", ChordQuality.Major);
  });

  test("Resolve roman numeral V in C major", () => {
    const cMajor = new MusicalKey("C", "major");
    const V = new RomanNumeral("V");

    const resolvedChordQuality = V.getResolvedChordQuality(cMajor);
    verifyResolvedChordQuality(resolvedChordQuality, "G", ChordQuality.Major);
  });

  test("Resolve roman numeral in E major", () => {
    const eMajor = new MusicalKey("E", "major");
    const I = new RomanNumeral("I");
    const resolvedChordQuality = I.getResolvedChordQuality(eMajor);
    verifyResolvedChordQuality(resolvedChordQuality, "E", ChordQuality.Major);
  });

  test("Resolve roman numeral V in E major", () => {
    const eMajor = new MusicalKey("E", "major");
    const V = new RomanNumeral("V");
    const resolvedChordQuality = V.getResolvedChordQuality(eMajor);
    verifyResolvedChordQuality(resolvedChordQuality, "B", ChordQuality.Major);
  });
});

test("Chord progression derives correct chords for C major key", () => {
  // Define a key
  const cMajor = new MusicalKey("C", "major");

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
  const cMajor = new MusicalKey("C", "major");

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
