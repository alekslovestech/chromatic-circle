import { MusicalKey } from "../types/Keys/MusicalKey";
import { KeyType } from "../types/Keys/KeyType";
import { AccidentalType } from "../types/AccidentalType";

describe("getDefaultAccidental", () => {
  const testCases = [
    // Sharp major keys
    { key: "C", type: KeyType.Major, expected: AccidentalType.Sharp },
    { key: "G", type: KeyType.Major, expected: AccidentalType.Sharp },
    { key: "D", type: KeyType.Major, expected: AccidentalType.Sharp },
    { key: "F#", type: KeyType.Major, expected: AccidentalType.Sharp },

    // Flat major keys
    { key: "F", type: KeyType.Major, expected: AccidentalType.Flat },
    { key: "Bb", type: KeyType.Major, expected: AccidentalType.Flat },
    { key: "Eb", type: KeyType.Major, expected: AccidentalType.Flat },

    // Minor keys
    { key: "D", type: KeyType.Minor, expected: AccidentalType.Flat },
    { key: "C#", type: KeyType.Minor, expected: AccidentalType.Sharp },
    { key: "F", type: KeyType.Minor, expected: AccidentalType.Flat },
  ];

  testCases.forEach(({ key, type, expected }) => {
    it(`${key} ${type} => ${expected}`, () => {
      const musicalKey = MusicalKey.fromClassicalMode(key, type);
      expect(musicalKey.getDefaultAccidental()).toBe(expected);
    });
  });
});
