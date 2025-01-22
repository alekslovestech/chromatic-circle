import { ChordProgression } from "../types/ChordProgression";
import { MusicalKey } from "../types/MusicalKey";
import { ChordQuality, RomanNumeral } from "../types/RomanNumeral";

test("Chord progression derives correct chords for C major key", () => {
  // Define a key
  const cMajor = new MusicalKey("C", "major");

  // Define Roman numerals
  const I = new RomanNumeral("I", 1, ChordQuality.Major);
  const vi = new RomanNumeral("vi", 6, ChordQuality.Minor);
  const IV = new RomanNumeral("IV", 4, ChordQuality.Major);
  const V = new RomanNumeral("V", 5, ChordQuality.Major);

  // Create a progression
  const progression = new ChordProgression(cMajor, [I, vi, IV, V]);

  // Derive concrete chords
  const derivedChords = progression.deriveChords();

  // Check the output
  expect(derivedChords).toEqual(["C (major)", "A (minor)", "F (major)", "G (major)"]);
});
