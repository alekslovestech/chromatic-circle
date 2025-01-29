import { AccidentalType } from "../types/AccidentalType";
import { ChordType } from "../types/NoteGroupingTypes";
import { RomanChord } from "../types/RomanChord";
import { RomanResolver } from "../types/RomanResolver";

export function verifyRomanChord(numeral: string, expected: RomanChord) {
  expect(RomanResolver.getRomanChord(numeral)).toEqual(expected);
}

describe("RomanNumeral chord tests", () => {
  test("I", () => {
    verifyRomanChord("I", new RomanChord(1, ChordType.Major));
  });

  test("IV", () => {
    verifyRomanChord("IV", new RomanChord(4, ChordType.Major));
  });

  test("vi", () => {
    verifyRomanChord("vi", new RomanChord(6, ChordType.Minor));
  });

  test("vii", () => {
    verifyRomanChord("vii", new RomanChord(7, ChordType.Minor));
  });

  test("viio (dim)", () => {
    verifyRomanChord("viio", new RomanChord(7, ChordType.Diminished));
  });

  test("VIIo (dim chord cannot be uppercase)", () => {
    expect(() => verifyRomanChord("VIIo", new RomanChord(6, ChordType.Diminished))).toThrow();
  });

  test("viio7 (dim7)", () => {
    verifyRomanChord("viio7", new RomanChord(7, ChordType.Diminished7));
  });

  test("VIIo7 (dim7 chord cannot be uppercase)", () => {
    expect(() => verifyRomanChord("VIIo7", new RomanChord(6, ChordType.Diminished7))).toThrow();
  });

  test("I+ (I aug)", () => {
    verifyRomanChord("I+", new RomanChord(1, ChordType.Augmented));
  });

  test("i+ (aug chord cannot be lowercase)", () => {
    expect(() => verifyRomanChord("i+", new RomanChord(6, ChordType.Augmented))).toThrow();
  });

  test("IV7", () => {
    verifyRomanChord("IV7", new RomanChord(4, ChordType.Dominant7));
  });

  test("iv7 (iv min7)", () => {
    verifyRomanChord("vi7", new RomanChord(6, ChordType.Minor7));
  });

  test("imaj7 (maj7 cannot be lowercase)", () => {
    expect(() => verifyRomanChord("imaj7", new RomanChord(1, ChordType.Major7))).toThrow();
  });

  test("IVmaj7", () => {
    verifyRomanChord("IVmaj7", new RomanChord(4, ChordType.Major7));
  });

  test("viiø7 (vii dim7)", () => {
    verifyRomanChord("viiø7", new RomanChord(7, ChordType.HalfDiminished));
  });

  test("VIIø7 (dim7 cannot be uppercase)", () => {
    expect(() => verifyRomanChord("VIIø7", new RomanChord(7, ChordType.HalfDiminished))).toThrow();
  });

  test("#iii", () => {
    verifyRomanChord("♯iii", new RomanChord(3, ChordType.Minor, AccidentalType.Sharp));
  });

  test("♭iii", () => {
    verifyRomanChord("♭iii", new RomanChord(3, ChordType.Minor, AccidentalType.Flat));
  });

  test("♭VI", () => {
    verifyRomanChord("♭VI", new RomanChord(6, ChordType.Major, AccidentalType.Flat));
  });
});
