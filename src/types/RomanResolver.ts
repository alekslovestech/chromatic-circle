import { MusicalKey } from "./MusicalKey";
import { ChordType } from "./NoteGroupingTypes";
import { AbsoluteChord, RomanChord } from "./RomanNumeral";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType, getAccidentalType } from "./AccidentalType";
import { ixChromatic, ixOffset, OffsetIndex } from "./IndexTypes";
import { TWELVE } from "./NoteConstants";

const romanRegex: RegExp =
  /^(#|♯|b|♭)?(I|II|III|IV|V|VI|VII|i|ii|iii|iv|v|vi|vii)(\+|7|maj7|o|o7|dim|dim7|aug|ø7)?$/;

export class RomanResolver {
  static splitRomanString(romanString: string): {
    prefix: string;
    pureRoman: string;
    suffix: string;
  } {
    const match = romanString.match(romanRegex);
    if (match) {
      return { prefix: match[1] || "", pureRoman: match[2], suffix: match[3] || "" };
    }
    return { prefix: "", pureRoman: romanString, suffix: "" };
  }

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
    const { prefix, pureRoman, suffix } = RomanResolver.splitRomanString(romanString);
    const accidental: AccidentalType = getAccidentalType(prefix);

    const ordinal = RomanNumeralUtils.getOrdinal(pureRoman);
    const isLowercase = RomanNumeralUtils.isLowercaseRomanNumeral(romanString);
    const chordType = RomanResolver.determineChordType(isLowercase, suffix);
    if (chordType === ChordType.Unknown) {
      throw new Error(`Invalid roman notation ${romanString}`);
    }
    return new RomanChord(ordinal, chordType, accidental);
  }
}
