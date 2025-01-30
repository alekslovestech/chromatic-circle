import { splitRomanString, ParsedRomanString } from "../types/RomanParser";

describe("SplitRomanString  tests", () => {
  test("I", () => {
    expect(splitRomanString("I")).toEqual(new ParsedRomanString("", "I", "", undefined));
  });

  //pure accidentals
  test("♯I", () => {
    expect(splitRomanString("♯I")).toEqual(new ParsedRomanString("♯", "I", "", undefined));
  });

  test("♭I", () => {
    expect(splitRomanString("♭I")).toEqual(new ParsedRomanString("♭", "I", "", undefined));
  });

  test("♭iii", () => {
    expect(splitRomanString("♭iii")).toEqual(new ParsedRomanString("♭", "iii", "", undefined));
  });

  //chord suffixes
  test("I7", () => {
    expect(splitRomanString("I7")).toEqual(new ParsedRomanString("", "I", "7", undefined));
  });

  test("I+", () => {
    expect(splitRomanString("I+")).toEqual(new ParsedRomanString("", "I", "+", undefined));
  });

  test("Imaj7", () => {
    expect(splitRomanString("Imaj7")).toEqual(new ParsedRomanString("", "I", "maj7", undefined));
  });

  //accidentals and chord suffixes
  test("♯Imaj7", () => {
    expect(splitRomanString("♯Imaj7")).toEqual(new ParsedRomanString("♯", "I", "maj7", undefined));
  });

  //slash chords
  test("I/V (slash chord)", () => {
    expect(splitRomanString("I/V")).toEqual(new ParsedRomanString("", "I", "", "V"));
  });

  test("I/v (Major/minor)", () => {
    expect(splitRomanString("I/v")).toEqual(new ParsedRomanString("", "I", "", "v"));
  });

  test("i/V (Minor/major)", () => {
    expect(splitRomanString("i/V")).toEqual(new ParsedRomanString("", "i", "", "V"));
  });

  //invalid slash chord
  test("I/V/VII", () => {
    expect(() => splitRomanString("I/V/VII")).toThrow();
  });
});
