import { MusicalKey } from "../types/Keys/MusicalKey";
import { KeyType } from "../types/Keys/KeyType";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { GreekTestConstants } from "./utils/GreekTestConstants";

const greekTestConstants = GreekTestConstants.getInstance();
describe("MusicalKey transforms", () => {
  describe("getOppositeKey", () => {
    const cases = [
      {
        desc: "C major => C minor",
        input: greekTestConstants.C_IONIAN_KEY,
        expected: MusicalKey.fromClassicalMode("C", KeyType.Minor),
      },
      {
        desc: "Db major => C# minor",
        input: MusicalKey.fromClassicalMode("Db", KeyType.Major),
        expected: MusicalKey.fromClassicalMode("C#", KeyType.Minor),
      },
      {
        desc: "Eb major => Eb minor",
        input: MusicalKey.fromClassicalMode("Eb", KeyType.Major),
        expected: MusicalKey.fromClassicalMode("Eb", KeyType.Minor),
      },
    ];

    cases.forEach(({ desc, input, expected }) => {
      it(desc, () => {
        expect(input.getOppositeKey()).toEqual(expected);
      });
    });
  });

  describe("getTransposedKey", () => {
    const cases = [
      {
        desc: "C major => Db major",
        input: greekTestConstants.C_IONIAN_KEY,
        semitones: 1,
        expected: MusicalKey.fromClassicalMode("Db", KeyType.Major),
      },
      {
        desc: "C Dorian => C# Dorian",
        input: greekTestConstants.C_DORIAN_KEY,
        semitones: 1,
        expected: MusicalKey.fromGreekMode("C#", GreekModeType.Dorian),
      },
      {
        desc: "E Phrygian minor => F Phrygian minor",
        input: greekTestConstants.E_PHRYGIAN_KEY,
        semitones: 1,
        expected: MusicalKey.fromGreekMode("F", GreekModeType.Phrygian),
      },
      {
        desc: "C major => B major",
        input: greekTestConstants.C_IONIAN_KEY,
        semitones: -1,
        expected: MusicalKey.fromClassicalMode("B", KeyType.Major),
      },
      {
        desc: "C Dorian => B Dorian",
        input: greekTestConstants.C_DORIAN_KEY,
        semitones: -1,
        expected: MusicalKey.fromGreekMode("B", GreekModeType.Dorian),
      },
      {
        desc: "F Phrygian minor => E Phrygian minor",
        input: MusicalKey.fromGreekMode("F", GreekModeType.Phrygian),
        semitones: -1,
        expected: MusicalKey.fromGreekMode("E", GreekModeType.Phrygian),
      },
    ];

    cases.forEach(({ desc, input, semitones, expected }) => {
      it(desc, () => {
        expect(input.getTransposedKey(semitones)).toEqual(expected);
      });
    });
  });

  describe("getCanonicalIonianKey", () => {
    const cases = [
      {
        desc: "C major => C Ionian",
        input: greekTestConstants.C_IONIAN_KEY,
        expected: "C",
      },
      {
        desc: "D Dorian => C Ionian",
        input: greekTestConstants.D_DORIAN_KEY,
        expected: "C",
      },
      {
        desc: "E Phrygian => C Ionian",
        input: greekTestConstants.E_PHRYGIAN_KEY,
        expected: "C",
      },
      {
        desc: "C Lydian => G Ionian",
        input: greekTestConstants.C_LYDIAN_KEY,
        expected: "G",
      },
      {
        desc: "C Phrygian => Ab Ionian",
        input: greekTestConstants.C_PHRYGIAN_KEY,
        expected: "Ab",
      },
      {
        desc: "C Arabic => Ab Ionian",
        input: MusicalKey.fromGreekMode("C", GreekModeType.Arabic),
        expected: "Ab",
      },
    ];

    cases.forEach(({ desc, input, expected }) => {
      it(desc, () => {
        expect(input.getCanonicalIonianKey().tonicString).toEqual(expected);
      });
    });
  });
});
