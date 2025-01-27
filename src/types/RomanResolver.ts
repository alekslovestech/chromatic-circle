import { MusicalKey } from "./MusicalKey";
import { ChordType } from "./NoteGroupingTypes";
import { AbsoluteChord, RomanChord } from "./RomanNumeral";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { isRoman } from "./RomanTypes";
import { AccidentalType } from "./AccidentalType";
import { ixChromatic, ixOffset, OffsetIndex } from "./IndexTypes";
import { TWELVE } from "./NoteConstants";
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

  static resolveAsChord(romanString: string, musicKey: MusicalKey): AbsoluteChord {
    const romanChord = RomanResolver.getRomanChord(romanString);
    const scale = musicKey.generateIndexArray();
    let chromaticIndex = scale[romanChord.ordinal - 1];
    const accidentalOffset: OffsetIndex =
      romanChord.accidental === AccidentalType.Flat
        ? ixOffset(-1)
        : romanChord.accidental === AccidentalType.Sharp
        ? ixOffset(1)
        : ixOffset(0);
    chromaticIndex = ixChromatic((chromaticIndex + accidentalOffset) % TWELVE);

    return new AbsoluteChord(chromaticIndex, romanChord.chordType);
  }

  static getRomanChord(romanString: string): RomanChord {
    let prefix: AccidentalType = AccidentalType.None;
    let ordinal = 0;
    let suffix = "";

    if (romanString.startsWith("#") || romanString.startsWith("♯")) {
      prefix = AccidentalType.Sharp;
      romanString = romanString.slice(1); // Remove the prefix from the roman numeral
    } else if (romanString.startsWith("b") || romanString.startsWith("♭")) {
      prefix = AccidentalType.Flat;
      romanString = romanString.slice(1); // Remove the prefix from the roman numeral
    } else {
      prefix = AccidentalType.None; // No accidental prefix
    }

    // Split the numeral and suffix
    let lastValidIndex = 0;
    for (let i = 1; i <= romanString.length; i++) {
      const currentSlice = romanString.slice(0, i);
      if (!isRoman(currentSlice)) break; // Stop at the first non-Roman character
      lastValidIndex = i; // Update to the next index after the valid Roman numeral
    }
    ordinal = RomanNumeralUtils.getOrdinal(romanString.slice(0, lastValidIndex));
    suffix = romanString.slice(lastValidIndex);

    let chordType: ChordType;
    const isLowercase = RomanNumeralUtils.isLowercaseRomanNumeral(romanString);
    chordType = RomanResolver.determineChordType(isLowercase, suffix);
    if (chordType === ChordType.Unknown) {
      throw new Error(`Invalid roman notation ${romanString}`);
    }
    return new RomanChord(ordinal, chordType, prefix);
  }
}
