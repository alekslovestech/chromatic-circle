import {
  ScaleDegree,
  ixScaleDegree,
  scaleDegreeToIndex,
} from "../types/GreekModes/ScaleDegreeType";

import { RomanNumeralString } from "../types/RomanTypes";

export class RomanNumeralUtils {
  static fromRoman(roman: string): ScaleDegree {
    const normalized = roman.toUpperCase();
    switch (normalized) {
      case "I":
        return ixScaleDegree(1);
      case "II":
        return ixScaleDegree(2);
      case "III":
        return ixScaleDegree(3);
      case "IV":
        return ixScaleDegree(4);
      case "V":
        return ixScaleDegree(5);
      case "VI":
        return ixScaleDegree(6);
      case "VII":
        return ixScaleDegree(7);
      default:
        return ixScaleDegree(-1);
    }
  }

  static isLowercaseRomanNumeral(numeral: string): boolean {
    return numeral.toLowerCase() === numeral;
  }

  static getScaleDegreeAsRomanString(
    scaleDegree: ScaleDegree,
    isLowercase: boolean = false,
  ): RomanNumeralString {
    const bigNumerals: RomanNumeralString[] = ["I", "II", "III", "IV", "V", "VI", "VII"];
    const smallNumerals: RomanNumeralString[] = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

    const index = scaleDegreeToIndex(scaleDegree);
    return isLowercase ? smallNumerals[index] : bigNumerals[index];
  }
}
