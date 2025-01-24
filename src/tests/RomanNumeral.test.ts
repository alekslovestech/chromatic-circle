import { RomanNumeralString } from "../types/IndexTypes";
import { ChordQuality, OrdinalChordQuality, RomanNumeral } from "../types/RomanNumeral";

function verifyOrdinalChordQuality(numeral: RomanNumeralString, expected: OrdinalChordQuality) {
  const romanNumeral = new RomanNumeral(numeral);
  expect(romanNumeral.getOrdinalChordQuality()).toEqual(expected);
}

describe("RomanNumeral tests", () => {
  test("Get ordinal number for Roman numeral I", () => {
    verifyOrdinalChordQuality("I", { ordinal: 1, quality: ChordQuality.Major });
  });

  test("Get ordinal number for Roman numeral IV", () => {
    verifyOrdinalChordQuality("IV", { ordinal: 4, quality: ChordQuality.Major });
  });

  test("Get ordinal number for Roman numeral vi", () => {
    verifyOrdinalChordQuality("vi", { ordinal: 6, quality: ChordQuality.Minor });
  });

  test("Get ordinal number for Roman numeral vii", () => {
    verifyOrdinalChordQuality("vii", { ordinal: 7, quality: ChordQuality.Minor });
  });
});
