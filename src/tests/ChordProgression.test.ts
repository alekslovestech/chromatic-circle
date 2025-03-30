import { ChordProgression } from "../types/ChordProgression";
import { KeyType, MusicalKey } from "../types/MusicalKey";
import { ChordType } from "../types/NoteGroupingTypes";
import { AbsoluteChord } from "../types/AbsoluteChord";
describe("Chord progression derives correct chords for C major key", () => {
  const cMajor = MusicalKey.fromClassicalMode("C", KeyType.Major);
  const dMajor = MusicalKey.fromClassicalMode("D", KeyType.Major);
  const fMajor = MusicalKey.fromClassicalMode("F", KeyType.Major);
  const gMajor = MusicalKey.fromClassicalMode("G", KeyType.Major);
  const aMajor = MusicalKey.fromClassicalMode("A", KeyType.Major);

  const fiftiesProgression = new ChordProgression(["I", "vi", "IV", "V"], "50s progression");
  const somethingProgression = new ChordProgression(["I", "Imaj7", "I7", "IV"], "Something");
  const bluesProgression = new ChordProgression(["I", "IV", "V", "IV"], "Blues");
  const creepProgression = new ChordProgression(["I", "III", "IV", "iv"], "Creep");
  const axisOfAwesomeProgression = new ChordProgression(["I", "V", "vi", "IV"], "Axis of Awesome");

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

  it("Creep progression for G major", () => {
    const derivedChords = creepProgression.resolvedChords(gMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("G", ChordType.Major),
      new AbsoluteChord("B", ChordType.Major),
      new AbsoluteChord("C", ChordType.Major),
      new AbsoluteChord("C", ChordType.Minor),
    ]);
  });

  it("Let it be: Axis of Awesome progression for C major", () => {
    const derivedChords = axisOfAwesomeProgression.resolvedChords(cMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("C", ChordType.Major),
      new AbsoluteChord("G", ChordType.Major),
      new AbsoluteChord("A", ChordType.Minor),
      new AbsoluteChord("F", ChordType.Major),
    ]);
  });

  it("With or without you: Axis of Awesome progression for D major", () => {
    const derivedChords = axisOfAwesomeProgression.resolvedChords(dMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("D", ChordType.Major),
      new AbsoluteChord("A", ChordType.Major),
      new AbsoluteChord("B", ChordType.Minor),
      new AbsoluteChord("G", ChordType.Major),
    ]);
  });

  it("I → ♭VI → IV → I", () => {
    const blackHoleSunProgression = new ChordProgression(["I", "♭VI", "IV", "I"], "Black Hole Sun");

    const derivedChords = blackHoleSunProgression.resolvedChords(gMajor);
    expect(derivedChords).toEqual([
      new AbsoluteChord("G", ChordType.Major),
      new AbsoluteChord("Eb", ChordType.Major),
      new AbsoluteChord("C", ChordType.Major),
      new AbsoluteChord("G", ChordType.Major),
    ]);
  });
});
