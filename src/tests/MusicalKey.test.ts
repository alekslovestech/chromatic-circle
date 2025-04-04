import { MusicalKey } from "../types/MusicalKey";
import { KeyType } from "../types/KeyType";
import { AccidentalType } from "../types/AccidentalType";

const verifyMusicalKeyAccidental = (
  key: string,
  keyType: KeyType,
  expectedAccidental: AccidentalType,
) => {
  const musicalKey = MusicalKey.fromClassicalMode(key, keyType);
  expect(musicalKey.getDefaultAccidental()).toBe(expectedAccidental);
};

describe("getDefaultAccidental", () => {
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

describe("getOppositeKey", () => {
  it("C major => C minor", () => {
    const musicalKey = MusicalKey.fromClassicalMode("C", KeyType.Major);
    expect(musicalKey.getOppositeKey()).toEqual(MusicalKey.fromClassicalMode("C", KeyType.Minor));
  });

  it("D# minor => C major", () => {
    const musicalKey = MusicalKey.fromClassicalMode("Db", KeyType.Major);
    expect(musicalKey.getOppositeKey()).toEqual(MusicalKey.fromClassicalMode("C#", KeyType.Minor));
  });

  it("Eb major => Eb minor", () => {
    const musicalKey = MusicalKey.fromClassicalMode("Eb", KeyType.Major);
    expect(musicalKey.getOppositeKey()).toEqual(MusicalKey.fromClassicalMode("Eb", KeyType.Minor));
  });
});
