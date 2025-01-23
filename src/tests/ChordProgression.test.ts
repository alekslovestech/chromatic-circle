import { ChordProgression } from "../types/ChordProgression";
import { ixChromatic } from "../types/IndexTypes";
import { MusicalKey } from "../types/MusicalKey";
import { ChordQuality, RomanNumeral } from "../types/RomanNumeral";

test("Resolve roman numeral I in C major", () => {
  const cMajor = new MusicalKey(ixChromatic(0), "major");
  const I = new RomanNumeral("I", 1, ChordQuality.Major);
  const resolvedIndex = I.resolve(cMajor);
  expect(resolvedIndex).toEqual(0);
});

test("Resolve roman numeral V in C major", () => {
  const cMajor = new MusicalKey(ixChromatic(0), "major");
  const V = new RomanNumeral("V", 5, ChordQuality.Major);
  const resolvedIndex = V.resolve(cMajor);
  expect(resolvedIndex).toEqual(7);
});

test("Resolve roman numeral in E major", () => {
  const eMajor = new MusicalKey(ixChromatic(5), "major");
  const I = new RomanNumeral("I", 1, ChordQuality.Major);
  const resolvedIndex = I.resolve(eMajor);
  expect(resolvedIndex).toEqual(5);
});

test("Resolve roman numeral V in E major", () => {
  const eMajor = new MusicalKey(ixChromatic(4), "major");
  const V = new RomanNumeral("V", 5, ChordQuality.Major);
  const resolvedIndex = V.resolve(eMajor);
  expect(resolvedIndex).toEqual(11);
});

test.skip("Chord progression derives correct chords for C major key", () => {
  // Define a key
  const cMajor = new MusicalKey(ixChromatic(0), "major");

  // Define Roman numerals
  const I = new RomanNumeral("I", 1, ChordQuality.Major);
  const vi = new RomanNumeral("vi", 6, ChordQuality.Minor);
  const IV = new RomanNumeral("IV", 4, ChordQuality.Major);
  const V = new RomanNumeral("V", 5, ChordQuality.Major);

  // Create a progression
  const progression = new ChordProgression(cMajor, [I, vi, IV, V], "50s progression");

  // Derive concrete chords
  const derivedChords = progression.deriveChords();

  // Check the output
  expect(derivedChords).toEqual(["C (major)", "A (minor)", "F (major)", "G (major)"]);
});

test.skip("Something Chord progression derives correct chords for C major key", () => {
  // Define a key
  const cMajor = new MusicalKey(ixChromatic(0), "major");

  // Define Roman numerals
  const I = new RomanNumeral("I", 1, ChordQuality.Major);
  const IMaj7 = new RomanNumeral("IMaj7", 1, ChordQuality.Major_Seventh);
  const I7 = new RomanNumeral("I7", 1, ChordQuality.Seventh);
  const IV = new RomanNumeral("IV", 4, ChordQuality.Major);

  // Create a progression
  const progression = new ChordProgression(cMajor, [I, IMaj7, I7, IV], "Something");

  // Derive concrete chords
  const derivedChords = progression.deriveChords();

  // Check the output
  expect(derivedChords).toEqual(["C (major)", "C (maj7)", "C (7)", "F (major)"]);
});
