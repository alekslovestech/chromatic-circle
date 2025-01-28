import { AccidentalType } from "../types/AccidentalType";
import { ChordType } from "../types/NoteGroupingTypes";
import { RomanChord } from "../types/RomanNumeral";
import { RomanResolver } from "../types/RomanResolver";

function verifyOrdinalChordQuality(numeral: string, expected: RomanChord) {
  expect(RomanResolver.getRomanChord(numeral)).toEqual(expected);
}

describe("SplitRomanString  tests", () => {
  test("I", () => {
    expect(RomanResolver.splitRomanString("I")).toEqual({
      prefix: "",
      pureRoman: "I",
      suffix: "",
    });
  });

  test("♯I", () => {
    expect(RomanResolver.splitRomanString("♯I")).toEqual({
      prefix: "♯",
      pureRoman: "I",
      suffix: "",
    });
  });

  test("♭I", () => {
    expect(RomanResolver.splitRomanString("♭I")).toEqual({
      prefix: "♭",
      pureRoman: "I",
      suffix: "",
    });
  });

  test("I7", () => {
    expect(RomanResolver.splitRomanString("I7")).toEqual({
      prefix: "",
      pureRoman: "I",
      suffix: "7",
    });
  });

  test("I+", () => {
    expect(RomanResolver.splitRomanString("I+")).toEqual({
      prefix: "",
      pureRoman: "I",
      suffix: "+",
    });
  });

  test("Imaj7", () => {
    expect(RomanResolver.splitRomanString("Imaj7")).toEqual({
      prefix: "",
      pureRoman: "I",
      suffix: "maj7",
    });
  });

  test("♯Imaj7", () => {
    expect(RomanResolver.splitRomanString("♯Imaj7")).toEqual({
      prefix: "♯",
      pureRoman: "I",
      suffix: "maj7",
    });
  });

  test("♭iii", () => {
    expect(RomanResolver.splitRomanString("♭iii")).toEqual({
      prefix: "♭",
      pureRoman: "iii",
      suffix: "",
    });
  });
});

describe("RomanNumeral chord tests", () => {
  test("I", () => {
    verifyOrdinalChordQuality("I", new RomanChord(1, ChordType.Major));
  });

  test("IV", () => {
    verifyOrdinalChordQuality("IV", new RomanChord(4, ChordType.Major));
  });

  test("vi", () => {
    verifyOrdinalChordQuality("vi", new RomanChord(6, ChordType.Minor));
  });

  test("vii", () => {
    verifyOrdinalChordQuality("vii", new RomanChord(7, ChordType.Minor));
  });

  test("viio (dim)", () => {
    verifyOrdinalChordQuality("viio", new RomanChord(7, ChordType.Diminished));
  });

  test("VIIo (dim chord cannot be uppercase)", () => {
    expect(() =>
      verifyOrdinalChordQuality("VIIo", new RomanChord(6, ChordType.Diminished)),
    ).toThrow();
  });

  test("viio7 (dim7)", () => {
    verifyOrdinalChordQuality("viio7", new RomanChord(7, ChordType.Diminished7));
  });

  test("VIIo7 (dim7 chord cannot be uppercase)", () => {
    expect(() =>
      verifyOrdinalChordQuality("VIIo7", new RomanChord(6, ChordType.Diminished7)),
    ).toThrow();
  });

  test("I+ (I aug)", () => {
    verifyOrdinalChordQuality("I+", new RomanChord(1, ChordType.Augmented));
  });

  test("i+ (aug chord cannot be lowercase)", () => {
    expect(() => verifyOrdinalChordQuality("i+", new RomanChord(6, ChordType.Augmented))).toThrow();
  });

  test("IV7", () => {
    verifyOrdinalChordQuality("IV7", new RomanChord(4, ChordType.Dominant7));
  });

  test("iv7 (iv min7)", () => {
    verifyOrdinalChordQuality("vi7", new RomanChord(6, ChordType.Minor7));
  });

  test("imaj7 (maj7 cannot be lowercase)", () => {
    expect(() => verifyOrdinalChordQuality("imaj7", new RomanChord(1, ChordType.Major7))).toThrow();
  });

  test("IVmaj7", () => {
    verifyOrdinalChordQuality("IVmaj7", new RomanChord(4, ChordType.Major7));
  });

  test("viiø7 (vii dim7)", () => {
    verifyOrdinalChordQuality("viiø7", new RomanChord(7, ChordType.HalfDiminished));
  });

  test("VIIø7 (dim7 cannot be uppercase)", () => {
    expect(() =>
      verifyOrdinalChordQuality("VIIø7", new RomanChord(7, ChordType.HalfDiminished)),
    ).toThrow();
  });

  test("#iii", () => {
    verifyOrdinalChordQuality("♯iii", new RomanChord(3, ChordType.Minor, AccidentalType.Sharp));
  });

  test("♭iii", () => {
    verifyOrdinalChordQuality("♭iii", new RomanChord(3, ChordType.Minor, AccidentalType.Flat));
  });

  test("♭VI", () => {
    verifyOrdinalChordQuality("♭VI", new RomanChord(6, ChordType.Major, AccidentalType.Flat));
  });
});
