import { MusicalKey } from "../types/Keys/MusicalKey";
import { KeyType } from "../types/Keys/KeyType";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { GreekTestConstants } from "./utils/GreekTestConstants";

const greekTestConstants = GreekTestConstants.getInstance();

describe("getOppositeKey", () => {
  it("C major => C minor", () => {
    const musicalKey = greekTestConstants.C_IONIAN_KEY;
    expect(musicalKey.getOppositeKey()).toEqual(MusicalKey.fromClassicalMode("C", KeyType.Minor));
  });

  it("Db major => C# minor", () => {
    const musicalKey = MusicalKey.fromClassicalMode("Db", KeyType.Major);

    expect(musicalKey.getOppositeKey()).toEqual(MusicalKey.fromClassicalMode("C#", KeyType.Minor));
  });

  it("Eb major => Eb minor", () => {
    const musicalKey = MusicalKey.fromClassicalMode("Eb", KeyType.Major);
    expect(musicalKey.getOppositeKey()).toEqual(MusicalKey.fromClassicalMode("Eb", KeyType.Minor));
  });
});

describe("getTransposedKey", () => {
  it("C major => Db major", () => {
    const musicalKey = greekTestConstants.C_IONIAN_KEY;
    expect(musicalKey.getTransposedKey(+1)).toEqual(
      MusicalKey.fromClassicalMode("Db", KeyType.Major),
    );
  });

  it("C Dorian => C# Dorian", () => {
    const musicalKey = greekTestConstants.C_DORIAN_KEY;
    expect(musicalKey.getTransposedKey(+1)).toEqual(
      MusicalKey.fromGreekMode("C#", GreekModeType.Dorian),
    );
  });

  it("E Phrygian minor => F Phrygian minor", () => {
    const musicalKey = greekTestConstants.E_PHRYGIAN_KEY;
    expect(musicalKey.getTransposedKey(+1)).toEqual(
      MusicalKey.fromGreekMode("F", GreekModeType.Phrygian),
    );
  });

  it("C major => B major", () => {
    const musicalKey = greekTestConstants.C_IONIAN_KEY;
    expect(musicalKey.getTransposedKey(-1)).toEqual(
      MusicalKey.fromClassicalMode("B", KeyType.Major),
    );
  });

  it("C Dorian => B Dorian", () => {
    const musicalKey = greekTestConstants.C_DORIAN_KEY;
    expect(musicalKey.getTransposedKey(-1)).toEqual(
      MusicalKey.fromGreekMode("B", GreekModeType.Dorian),
    );
  });

  it("F Phrygian minor => E Phrygian minor", () => {
    const musicalKey = MusicalKey.fromGreekMode("F", GreekModeType.Phrygian);
    expect(musicalKey.getTransposedKey(-1)).toEqual(
      MusicalKey.fromGreekMode("E", GreekModeType.Phrygian),
    );
  });
});

describe("getCanonicalIonianKey", () => {
  it("C major => C Ionian", () => {
    expect(greekTestConstants.C_IONIAN_KEY.getCanonicalIonianKey().tonicString).toEqual("C");
  });

  it("D Dorian => C Ionian", () => {
    expect(greekTestConstants.D_DORIAN_KEY.getCanonicalIonianKey().tonicString).toEqual("C");
  });

  it("E Phrygian => C Ionian", () => {
    expect(greekTestConstants.E_PHRYGIAN_KEY.getCanonicalIonianKey().tonicString).toEqual("C");
  });

  it("C Lydian => G Ionian", () => {
    expect(greekTestConstants.C_LYDIAN_KEY.getCanonicalIonianKey().tonicString).toEqual("G");
  });

  it("C Phrygian => Ab Ionian", () => {
    expect(greekTestConstants.C_PHRYGIAN_KEY.getCanonicalIonianKey().tonicString).toEqual("Ab");
  });

  it("C Arabic => Ab Ionian", () => {
    const musicalKey = MusicalKey.fromGreekMode("C", GreekModeType.Arabic);
    expect(musicalKey.getCanonicalIonianKey().tonicString).toEqual("Ab");
  });
});
