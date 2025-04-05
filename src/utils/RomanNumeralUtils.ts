import { getAccidentalSignForDisplay } from "../types/AccidentalType";
import { ScaleDegreeInfo } from "../types/GreekModes/ScaleDegreeInfo";
import { ScaleDegree, ixScaleDegree } from "../types/GreekModes/ScaleDegreeType";
import { ChordType } from "../types/NoteGroupingTypes";
import { RomanChord } from "../types/RomanChord";

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

  private static ScaleDegreeToRoman(scaleDegree: ScaleDegree): string {
    switch (scaleDegree) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
      case 5:
        return "V";
      case 6:
        return "VI";
      case 7:
        return "VII";
      default:
        return "Ø";
    }
  }

  //replace later
  static toRoman(scaleDegreeInfo: ScaleDegreeInfo): string {
    const romanChord = new RomanChord(
      scaleDegreeInfo.scaleDegree,
      ChordType.Major,
      scaleDegreeInfo.accidentalPrefix,
    );
    return romanChord.getString();
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

    return isLowercase ? smallNumerals[scaleDegree - 1] : bigNumerals[scaleDegree - 1];
  }
}
