import { KeyType, MusicalKey } from "../types/MusicalKey";

import { AccidentalType } from "../types/AccidentalType";

const verifyMusicalKeyAccidental = (
  key: string,
  keyType: KeyType,
  expectedAccidental: AccidentalType,
) => {
  const musicalKey = new MusicalKey(key, keyType);
  expect(musicalKey.getDefaultAccidental()).toBe(expectedAccidental);
};

describe("getNoteTextFromIndex", () => {
  //sharp major keys
  it("C major => sharp", () => {
    verifyMusicalKeyAccidental("C", KeyType.Major, AccidentalType.Sharp);
  });

  it("G major => sharp", () => {
    verifyMusicalKeyAccidental("G", KeyType.Major, AccidentalType.Sharp);
  });

  it("D minor => flat", () => {
    verifyMusicalKeyAccidental("D", KeyType.Minor, AccidentalType.Flat);
  });

  it("D major => sharp", () => {
    verifyMusicalKeyAccidental("D", KeyType.Major, AccidentalType.Sharp);
  });

  it("F# major => sharp", () => {
    verifyMusicalKeyAccidental("F#", KeyType.Major, AccidentalType.Sharp);
  });

  //flat major keys
  it("F major => flat", () => {
    verifyMusicalKeyAccidental("F", KeyType.Major, AccidentalType.Flat);
  });

  it("Bb major => flat", () => {
    verifyMusicalKeyAccidental("Bb", KeyType.Major, AccidentalType.Flat);
  });

  it("Eb major => flat", () => {
    verifyMusicalKeyAccidental("Eb", KeyType.Major, AccidentalType.Flat);
  });

  //sharp minor keys
  it("C# minor => sharp", () => {
    verifyMusicalKeyAccidental("C#", KeyType.Minor, AccidentalType.Sharp);
  });

  //flat minor keys
  it("F minor => flat", () => {
    verifyMusicalKeyAccidental("F", KeyType.Minor, AccidentalType.Flat);
  });
});

describe("getRelativeKey", () => {
  it("C major => A minor", () => {
    const cMajor = new MusicalKey("C", KeyType.Major);
    const aMinor = cMajor.getRelativeKey();
    expect(aMinor.tonicString).toBe("A");
    expect(aMinor.mode).toBe(KeyType.Minor);
  });

  it("A minor => C major", () => {
    const aMinor = new MusicalKey("A", KeyType.Minor);
    const cMajor = aMinor.getRelativeKey();
    expect(cMajor.tonicString).toBe("C");
    expect(cMajor.mode).toBe(KeyType.Major);
  });

  it("G major => E minor", () => {
    const gMajor = new MusicalKey("G", KeyType.Major);
    const eMinor = gMajor.getRelativeKey();
    expect(eMinor.tonicString).toBe("E");
    expect(eMinor.mode).toBe(KeyType.Minor);
  });

  it("E minor => G major", () => {
    const eMinor = new MusicalKey("E", KeyType.Minor);
    const gMajor = eMinor.getRelativeKey();
    expect(gMajor.tonicString).toBe("G");
  });

  it("F major => D minor", () => {
    const fMajor = new MusicalKey("F", KeyType.Major);
    const dMinor = fMajor.getRelativeKey();
    expect(dMinor.tonicString).toBe("D");
    expect(dMinor.mode).toBe(KeyType.Minor);
  });
});
