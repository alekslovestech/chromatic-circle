import { AccidentalType, getAccidentalSignForDisplay } from "./AccidentalType";
import {
  ixScaleDegreeIndex,
  ScaleDegree,
  ScaleDegreeIndex,
  ixScaleDegree,
} from "./GreekModes/ScaleDegreeType";
import { ChordType } from "./NoteGroupingTypes";
import { IScalePatternForRomanChords } from "./IScalePatternForRomanChords";
import { ScaleDegreeInfo } from "./GreekModes/ScaleDegreeInfo";
import { RomanNumeralString } from "./RomanTypes";

export class RomanChord {
  //implements IRomanChord {
  scaleDegree: ScaleDegree;
  chordType: ChordType;
  accidental: AccidentalType;
  bassDegree: number | undefined;
  constructor(
    scaleDegree: ScaleDegree,
    chordType: ChordType,
    accidental: AccidentalType = AccidentalType.None,
    bassDegree: number | undefined = undefined,
  ) {
    this.scaleDegree = scaleDegree;
    this.chordType = chordType;
    this.accidental = accidental;
    this.bassDegree = bassDegree;
  }

  get scaleDegreeIndex(): ScaleDegreeIndex {
    return ixScaleDegreeIndex(this.scaleDegree - 1);
  }

  /**
   * Creates a Roman chord from a scale degree info using a scale pattern.
   * @param scaleDegreeInfo The scale degree info containing the scale degree and accidental
   * @param scalePattern The scale pattern to use for determining the chord type
   * @returns A new Roman chord with the correct chord type based on the scale pattern
   */
  static fromScaleDegreeInfo(
    scaleDegreeInfo: ScaleDegreeInfo,
    scalePattern: IScalePatternForRomanChords,
  ): RomanChord {
    const offsets = scalePattern.getTriadOffsets(scaleDegreeInfo);
    const chordType = scalePattern.determineChordType(offsets);

    return new RomanChord(scaleDegreeInfo.scaleDegree, chordType, scaleDegreeInfo.accidentalPrefix);
  }

  /**
   * Converts a Roman numeral string to a scale degree.
   * @param roman The Roman numeral string (e.g., "I", "II", "iii")
   * @returns The corresponding scale degree
   */
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

  /**
   * Checks if a Roman numeral string is lowercase.
   * @param numeral The Roman numeral string to check
   * @returns True if the numeral is lowercase, false otherwise
   */
  static isLowercaseRomanNumeral(numeral: string): boolean {
    return numeral.toLowerCase() === numeral;
  }

  /**
   * Converts a scale degree index to a Roman numeral string.
   * @param scaleDegreeIndex The scale degree index (0-6)
   * @param isLowercase Whether to use lowercase numerals
   * @returns The Roman numeral string
   */
  static getScaleDegreeAsRomanString(
    scaleDegreeIndex: ScaleDegreeIndex,
    isLowercase: boolean = false,
  ): RomanNumeralString {
    const bigNumerals: RomanNumeralString[] = ["I", "II", "III", "IV", "V", "VI", "VII"];
    const smallNumerals: RomanNumeralString[] = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

    return isLowercase ? smallNumerals[scaleDegreeIndex] : bigNumerals[scaleDegreeIndex];
  }

  /**
   * Determines the chord type based on whether the Roman numeral is lowercase and its suffix.
   * @param isLowercase Whether the Roman numeral is lowercase
   * @param suffix The chord suffix (e.g., "", "7", "maj7", "dim")
   * @returns The determined chord type
   */
  static determineChordType(isLowercase: boolean, suffix: string): ChordType {
    let chordType: ChordType;
    switch (suffix) {
      case "":
        chordType = isLowercase ? ChordType.Minor : ChordType.Major;
        break;
      case "7":
        chordType = isLowercase ? ChordType.Minor7 : ChordType.Dominant7;
        break;
      case "maj7":
        chordType = isLowercase ? ChordType.Unknown : ChordType.Major7;
        break;
      case "o":
      case "dim":
        chordType = isLowercase ? ChordType.Diminished : ChordType.Unknown;
        break;
      case "o7":
      case "dim7":
        chordType = isLowercase ? ChordType.Diminished7 : ChordType.Unknown;
        break;
      case "aug":
      case "+":
        chordType = isLowercase ? ChordType.Unknown : ChordType.Augmented;
        break;
      case "ø7":
        chordType = isLowercase ? ChordType.HalfDiminished : ChordType.Unknown;
        break;
      default:
        chordType = ChordType.Unknown;
    }

    return chordType;
  }

  /**
   * Gets the postfix string for a chord type.
   * @param chordType The chord type
   * @returns The postfix string for the chord type
   */
  static getChordTypePostfix(chordType: ChordType): string {
    switch (chordType) {
      case ChordType.Diminished:
        return "°";
      case ChordType.Augmented:
        return "+";
      case ChordType.Minor:
      case ChordType.Major:
      case ChordType.Dominant7:
      case ChordType.Minor7:
      case ChordType.Major7:
      case ChordType.Diminished7:
      case ChordType.HalfDiminished:
        return "";
      default:
        return "";
    }
  }

  /**
   * Gets the string representation of this Roman chord.
   * @returns The string representation of this Roman chord
   */
  getString(): string {
    const accidentalString = getAccidentalSignForDisplay(this.accidental);
    const romanNumeralString = RomanChord.getScaleDegreeAsRomanString(
      this.scaleDegreeIndex,
      this.chordType === ChordType.Minor || this.chordType === ChordType.Diminished,
    );
    const chordPostfix = RomanChord.getChordTypePostfix(this.chordType);

    return `${accidentalString}${romanNumeralString}${chordPostfix}`;
  }
}
