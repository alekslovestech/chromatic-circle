import { ChordProgression } from "../types/ChordProgression";
import { KeyType, MusicalKey } from "../types/MusicalKey";
import { ChordType } from "../types/NoteGroupingTypes";
import { AbsoluteChord } from "../types/RomanNumeral";

describe("Chord progression derives correct chords for C major key", () => {
  const cMajor = new MusicalKey("C", KeyType.Major);
  const fMajor = new MusicalKey("F", KeyType.Major);
  const aMajor = new MusicalKey("A", KeyType.Major);

  const fiftiesProgression = new ChordProgression(["I", "vi", "IV", "V"], "50s progression");
  const somethingProgression = new ChordProgression(["I", "Imaj7", "I7", "IV"], "Something");
  const bluesProgression = new ChordProgression(["I", "IV", "V", "IV"], "Blues");

  it("50s progression for C major", () => {
    const derivedChords = fiftiesProgression.resolvedChords(cMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("C", ChordType.Major),
      new AbsoluteChord("A", ChordType.Minor),
      new AbsoluteChord("F", ChordType.Major),
      new AbsoluteChord("G", ChordType.Major),
    ]);
  });

  it("Something progression for C major", () => {
    const derivedChords = somethingProgression.resolvedChords(cMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("C", ChordType.Major),
      new AbsoluteChord("C", ChordType.Major7),
      new AbsoluteChord("C", ChordType.Dominant7),
      new AbsoluteChord("F", ChordType.Major),
    ]);
  });

  it("Something progression for F major", () => {
    const derivedChords = somethingProgression.resolvedChords(fMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("F", ChordType.Major),
      new AbsoluteChord("F", ChordType.Major7),
      new AbsoluteChord("F", ChordType.Dominant7),
      new AbsoluteChord("Bb", ChordType.Major),
    ]);
  });

  it("Blues progression for C major", () => {
    const derivedChords = bluesProgression.resolvedChords(cMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("C", ChordType.Major),
      new AbsoluteChord("F", ChordType.Major),
      new AbsoluteChord("G", ChordType.Major),
      new AbsoluteChord("F", ChordType.Major),
    ]);
  });

  it("Blues progression for A major", () => {
    const derivedChords = bluesProgression.resolvedChords(aMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("A", ChordType.Major),
      new AbsoluteChord("D", ChordType.Major),
      new AbsoluteChord("E", ChordType.Major),
      new AbsoluteChord("D", ChordType.Major),
    ]);
  });
});
