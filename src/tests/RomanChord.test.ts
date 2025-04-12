import { AccidentalType } from "../types/AccidentalType";
import { ChordType } from "../types/NoteGroupingTypes";
import { RomanChord } from "../types/RomanChord";
import { RomanResolver } from "../types/RomanResolver";
import { ixScaleDegree } from "../types/GreekModes/ScaleDegreeType";

export function verifyRomanChord(numeral: string, expected: RomanChord) {
  expect(RomanResolver.createRomanChordFromString(numeral)).toEqual(expected);
}

describe("RomanNumeral chord tests", () => {
  test("I", () => {
    verifyRomanChord("I", new RomanChord(ixScaleDegree(1), ChordType.Major));
  });

  test("IV", () => {
    verifyRomanChord("IV", new RomanChord(ixScaleDegree(4), ChordType.Major));
  });

  test("vi", () => {
    verifyRomanChord("vi", new RomanChord(ixScaleDegree(6), ChordType.Minor));
  });

  test("vii", () => {
    verifyRomanChord("vii", new RomanChord(ixScaleDegree(7), ChordType.Minor));
  });

  //pure accidentals
  test("♯I", () => {
    verifyRomanChord("♯I", new RomanChord(ixScaleDegree(1), ChordType.Major, AccidentalType.Sharp));
  });

  test("♭I", () => {
    verifyRomanChord("♭I", new RomanChord(ixScaleDegree(1), ChordType.Major, AccidentalType.Flat));
  });

  test("♭iii", () => {
    verifyRomanChord(
      "♭iii",
      new RomanChord(ixScaleDegree(3), ChordType.Minor, AccidentalType.Flat),
    );
  });

  test("#iii", () => {
    verifyRomanChord(
      "♯iii",
      new RomanChord(ixScaleDegree(3), ChordType.Minor, AccidentalType.Sharp),
    );
  });

  test("♭VI", () => {
    verifyRomanChord("♭VI", new RomanChord(ixScaleDegree(6), ChordType.Major, AccidentalType.Flat));
  });

  //chord suffixes
  test("I7", () => {
    verifyRomanChord("I7", new RomanChord(ixScaleDegree(1), ChordType.Dominant7));
  });

  test("I+", () => {
    verifyRomanChord("I+", new RomanChord(ixScaleDegree(1), ChordType.Augmented));
  });

  test("i+ (aug chord cannot be lowercase)", () => {
    expect(() =>
      verifyRomanChord("i+", new RomanChord(ixScaleDegree(6), ChordType.Augmented)),
    ).toThrow();
  });

  test("Imaj7", () => {
    verifyRomanChord("Imaj7", new RomanChord(ixScaleDegree(1), ChordType.Major7));
  });

  test("imaj7 (maj7 cannot be lowercase)", () => {
    expect(() =>
      verifyRomanChord("imaj7", new RomanChord(ixScaleDegree(1), ChordType.Major7)),
    ).toThrow();
  });

  test("viio (dim)", () => {
    verifyRomanChord("viio", new RomanChord(ixScaleDegree(7), ChordType.Diminished));
  });

  test("VIIo (dim chord cannot be uppercase)", () => {
    expect(() =>
      verifyRomanChord("VIIo", new RomanChord(ixScaleDegree(6), ChordType.Diminished)),
    ).toThrow();
  });

  test("viio7 (dim7)", () => {
    verifyRomanChord("viio7", new RomanChord(ixScaleDegree(7), ChordType.Diminished7));
  });

  test("VIIo7 (dim7 chord cannot be uppercase)", () => {
    expect(() =>
      verifyRomanChord("VIIo7", new RomanChord(ixScaleDegree(6), ChordType.Diminished7)),
    ).toThrow();
  });

  test("IV7", () => {
    verifyRomanChord("IV7", new RomanChord(ixScaleDegree(4), ChordType.Dominant7));
  });

  test("iv7 (iv min7)", () => {
    verifyRomanChord("vi7", new RomanChord(ixScaleDegree(6), ChordType.Minor7));
  });

  test("IVmaj7", () => {
    verifyRomanChord("IVmaj7", new RomanChord(ixScaleDegree(4), ChordType.Major7));
  });

  test("viiø7 (vii dim7)", () => {
    verifyRomanChord("viiø7", new RomanChord(ixScaleDegree(7), ChordType.HalfDiminished));
  });

  test("VIIø7 (dim7 cannot be uppercase)", () => {
    expect(() =>
      verifyRomanChord("VIIø7", new RomanChord(ixScaleDegree(7), ChordType.HalfDiminished)),
    ).toThrow();
  });

  //accidentals and chord suffixes
  test("♯Imaj7", () => {
    verifyRomanChord(
      "♯Imaj7",
      new RomanChord(ixScaleDegree(1), ChordType.Major7, AccidentalType.Sharp),
    );
  });

  //slash chords
  test("I/V (slash chord)", () => {
    verifyRomanChord("I/V", new RomanChord(ixScaleDegree(1), ChordType.Major, undefined, 5));
  });

  test("I/v (Major/minor)", () => {
    verifyRomanChord("I/v", new RomanChord(ixScaleDegree(1), ChordType.Major, undefined, 5));
  });

  test("i/V (Minor/major)", () => {
    verifyRomanChord("i/V", new RomanChord(ixScaleDegree(1), ChordType.Minor, undefined, 5));
  });
});
