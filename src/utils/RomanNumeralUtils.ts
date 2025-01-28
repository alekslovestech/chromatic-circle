import { RomanNumeralString } from "../types/RomanTypes";

export namespace RomanNumeralUtils {
  export function getOrdinal(roman: string): number {
    const normalized = roman.toUpperCase();
    switch (normalized) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      case "IV":
        return 4;
      case "V":
        return 5;
      case "VI":
        return 6;
      case "VII":
        return 7;
      default:
        return -1;
    }
  }

  export function isLowercaseRomanNumeral(numeral: string): boolean {
    return numeral.toLowerCase() === numeral;
  }

  export function getOrdinalAsRomanString(
    ordinal: number,
    isLowercase: boolean = false,
  ): RomanNumeralString {
    const bigNumerals: RomanNumeralString[] = ["I", "II", "III", "IV", "V", "VI", "VII"];
    const smallNumerals: RomanNumeralString[] = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

    if (ordinal < 1 || ordinal > 7) {
      throw new Error("Invalid ordinal number for Roman numeral");
    }

    return isLowercase ? smallNumerals[ordinal - 1] : bigNumerals[ordinal - 1];
  }
}
