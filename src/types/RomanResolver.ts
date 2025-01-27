import { MusicalKey } from "./MusicalKey";
import { ChordType } from "./NoteGroupingTypes";
import { AbsoluteChord, RomanChord } from "./RomanNumeral";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { isRoman } from "./RomanTypes";
export class RomanResolver {
  private static determineChordType(isLowercase: boolean, suffix: string): ChordType {
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

  static resolveAsChord(roman: string, musicKey: MusicalKey): AbsoluteChord {
    const romanChord = RomanResolver.getRomanChord(roman);
    const scale = musicKey.generateIndexArray();
    const chromaticIndex = scale[romanChord.ordinal - 1];

    return new AbsoluteChord(chromaticIndex, romanChord.chordType);
  }

  static getRomanChord(roman: string): RomanChord {
    let ordinal = 0;
    let suffix = "";

    // Split the numeral and suffix
    let lastValidIndex = 0;
    for (let i = 1; i <= roman.length; i++) {
      const currentSlice = roman.slice(0, i);
      if (!isRoman(currentSlice)) break; // Stop at the first non-Roman character
      lastValidIndex = i; // Update to the next index after the valid Roman numeral
    }
    ordinal = RomanNumeralUtils.getOrdinal(roman.slice(0, lastValidIndex));
    suffix = roman.slice(lastValidIndex);

    let chordType: ChordType;
    const isLowercase = RomanNumeralUtils.isLowercaseRomanNumeral(roman);
    chordType = RomanResolver.determineChordType(isLowercase, suffix);
    if (chordType === ChordType.Unknown) {
      throw new Error(`Invalid roman notation ${roman}`);
    }
    return new RomanChord(ordinal, chordType);
  }
}
