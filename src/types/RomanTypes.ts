export type RomanNumeralString =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii";

export const isRoman = (numeral: string): boolean =>
  ["I", "II", "III", "IV", "V", "VI", "VII"].includes(numeral.toUpperCase());

export function ixRomanString(numeral: string): RomanNumeralString {
  if (!isRoman(numeral)) {
    throw new Error("Invalid Roman Numeral");
  }
  return numeral as RomanNumeralString;
}

export type ChordSuffixes =
  | "7"
  | "Maj7"
  | "min7"
  | "minMaj7"
  | "dim"
  | "aug"
  | "dimMaj7"
  | "+"
  | "o"
  | "ø";
