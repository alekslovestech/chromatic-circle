import { splitRomanString, ParsedRomanString } from "../types/RomanParser";

describe("SplitRomanString  tests", () => {
  test("I", () => {
    expect(splitRomanString("I")).toEqual(new ParsedRomanString("", "I", "", undefined));
  });

  test("♯I", () => {
    expect(splitRomanString("♯I")).toEqual(new ParsedRomanString("♯", "I", "", undefined));
  });

  test("♭I", () => {
    expect(splitRomanString("♭I")).toEqual(new ParsedRomanString("♭", "I", "", undefined));
  });

  test("I7", () => {
    expect(splitRomanString("I7")).toEqual(new ParsedRomanString("", "I", "7", undefined));
  });

  test("I+", () => {
    expect(splitRomanString("I+")).toEqual(new ParsedRomanString("", "I", "+", undefined));
  });

  test("Imaj7", () => {
    expect(splitRomanString("Imaj7")).toEqual(new ParsedRomanString("", "I", "maj7", undefined));
  });

  test("♯Imaj7", () => {
    expect(splitRomanString("♯Imaj7")).toEqual(new ParsedRomanString("♯", "I", "maj7", undefined));
  });

  test("♭iii", () => {
    expect(splitRomanString("♭iii")).toEqual(new ParsedRomanString("♭", "iii", "", undefined));
  });

  test("I/V (slash chord)", () => {
    expect(splitRomanString("I/V")).toEqual(new ParsedRomanString("", "I", "", "V"));
  });
});
