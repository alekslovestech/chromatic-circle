import { AccidentalType } from "../types/AccidentalType";
import { ChordType } from "../types/NoteGroupingTypes";
import { RomanChord } from "../types/RomanChord";
import { RomanResolver } from "../types/RomanResolver";
import { ixScaleDegree } from "../types/GreekModes/ScaleDegreeType";

export function verifyRomanChord(numeral: string, expected: RomanChord) {
  expect(RomanResolver.createRomanChordFromString(numeral)).toEqual(expected);
}

describe("RomanNumeral chord tests", () => {
  const testCases = [
    {
      desc: "Basic major and minor chords",
      cases: [
        { numeral: "I", expected: new RomanChord(ixScaleDegree(1), ChordType.Major) },
        { numeral: "IV", expected: new RomanChord(ixScaleDegree(4), ChordType.Major) },
        { numeral: "vi", expected: new RomanChord(ixScaleDegree(6), ChordType.Minor) },
        { numeral: "vii", expected: new RomanChord(ixScaleDegree(7), ChordType.Minor) },
      ],
    },
    {
      desc: "Accidentals",
      cases: [
        {
          numeral: "♯I",
          expected: new RomanChord(ixScaleDegree(1), ChordType.Major, AccidentalType.Sharp),
        },
        {
          numeral: "♭I",
          expected: new RomanChord(ixScaleDegree(1), ChordType.Major, AccidentalType.Flat),
        },
        {
          numeral: "♭iii",
          expected: new RomanChord(ixScaleDegree(3), ChordType.Minor, AccidentalType.Flat),
        },
        {
          numeral: "♯iii",
          expected: new RomanChord(ixScaleDegree(3), ChordType.Minor, AccidentalType.Sharp),
        },
        {
          numeral: "♭VI",
          expected: new RomanChord(ixScaleDegree(6), ChordType.Major, AccidentalType.Flat),
        },
      ],
    },
    {
      desc: "Chord suffixes",
      cases: [
        { numeral: "I7", expected: new RomanChord(ixScaleDegree(1), ChordType.Dominant7) },
        { numeral: "I+", expected: new RomanChord(ixScaleDegree(1), ChordType.Augmented) },
        { numeral: "Imaj7", expected: new RomanChord(ixScaleDegree(1), ChordType.Major7) },
        { numeral: "viio", expected: new RomanChord(ixScaleDegree(7), ChordType.Diminished) },
        { numeral: "viio7", expected: new RomanChord(ixScaleDegree(7), ChordType.Diminished7) },
        { numeral: "IV7", expected: new RomanChord(ixScaleDegree(4), ChordType.Dominant7) },
        { numeral: "vi7", expected: new RomanChord(ixScaleDegree(6), ChordType.Minor7) },
        { numeral: "IVmaj7", expected: new RomanChord(ixScaleDegree(4), ChordType.Major7) },
        { numeral: "viiø7", expected: new RomanChord(ixScaleDegree(7), ChordType.HalfDiminished) },
      ],
    },
    {
      desc: "Invalid cases",
      invalidCases: [
        { numeral: "i+", error: "aug chord cannot be lowercase" },
        { numeral: "imaj7", error: "maj7 cannot be lowercase" },
        { numeral: "VIIo", error: "dim chord cannot be uppercase" },
        { numeral: "VIIo7", error: "dim7 chord cannot be uppercase" },
        { numeral: "VIIø7", error: "dim7 cannot be uppercase" },
      ],
    },
    {
      desc: "Combined features",
      cases: [
        {
          numeral: "♯Imaj7",
          expected: new RomanChord(ixScaleDegree(1), ChordType.Major7, AccidentalType.Sharp),
        },
        {
          numeral: "I/V",
          expected: new RomanChord(ixScaleDegree(1), ChordType.Major, undefined, 5),
        },
        {
          numeral: "I/v",
          expected: new RomanChord(ixScaleDegree(1), ChordType.Major, undefined, 5),
        },
        {
          numeral: "i/V",
          expected: new RomanChord(ixScaleDegree(1), ChordType.Minor, undefined, 5),
        },
      ],
    },
  ];

  testCases.forEach(({ desc, cases, invalidCases }) => {
    describe(desc, () => {
      if (cases) {
        cases.forEach(({ numeral, expected }) => {
          test(numeral, () => {
            verifyRomanChord(numeral, expected);
          });
        });
      }

      if (invalidCases) {
        invalidCases.forEach(({ numeral, error }) => {
          test(`${numeral} (${error})`, () => {
            expect(() => RomanResolver.createRomanChordFromString(numeral)).toThrow();
          });
        });
      }
    });
  });
});
