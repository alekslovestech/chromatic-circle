import { splitRomanString, ParsedRomanString } from "../types/RomanParser";

describe("SplitRomanString tests", () => {
  const testCases = [
    {
      desc: "Basic numeral",
      input: "I",
      expected: new ParsedRomanString("", "I", "", undefined),
    },
    {
      desc: "Sharp accidental",
      input: "♯I",
      expected: new ParsedRomanString("♯", "I", "", undefined),
    },
    {
      desc: "Flat accidental",
      input: "♭I",
      expected: new ParsedRomanString("♭", "I", "", undefined),
    },
    {
      desc: "Flat minor",
      input: "♭iii",
      expected: new ParsedRomanString("♭", "iii", "", undefined),
    },
    {
      desc: "Dominant 7",
      input: "I7",
      expected: new ParsedRomanString("", "I", "7", undefined),
    },
    {
      desc: "Augmented",
      input: "I+",
      expected: new ParsedRomanString("", "I", "+", undefined),
    },
    {
      desc: "Major 7",
      input: "Imaj7",
      expected: new ParsedRomanString("", "I", "maj7", undefined),
    },
    {
      desc: "Sharp with major 7",
      input: "♯Imaj7",
      expected: new ParsedRomanString("♯", "I", "maj7", undefined),
    },
    {
      desc: "Major/major slash chord",
      input: "I/V",
      expected: new ParsedRomanString("", "I", "", "V"),
    },
    {
      desc: "Major/minor slash chord",
      input: "I/v",
      expected: new ParsedRomanString("", "I", "", "v"),
    },
    {
      desc: "Minor/major slash chord",
      input: "i/V",
      expected: new ParsedRomanString("", "i", "", "V"),
    },
  ];

  testCases.forEach(({ desc, input, expected }) => {
    test(desc, () => {
      expect(splitRomanString(input)).toEqual(expected);
    });
  });

  test("Invalid slash chord throws error", () => {
    expect(() => splitRomanString("I/V/VII")).toThrow();
  });
});
