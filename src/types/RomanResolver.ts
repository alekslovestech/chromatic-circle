import { MusicalKey } from "./MusicalKey";
import { ChordType } from "./NoteGroupingTypes";
import { RomanChord } from "./RomanChord";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType, getAccidentalType } from "./AccidentalType";
import { ixChromatic, ixOffset, OffsetIndex } from "./IndexTypes";
import { TWELVE } from "./NoteConstants";
import { splitRomanString } from "./RomanParser";
import { AbsoluteChord } from "./AbsoluteChord";

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

  static resolveAsAbsoluteChord(romanString: string, musicKey: MusicalKey): AbsoluteChord {
    const romanChord = RomanResolver.getRomanChord(romanString);
    const scale = musicKey.generateIndexArray();
    let chromaticIndex = scale[romanChord.scaleDegree - 1];
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
    const parsedRoman = splitRomanString(romanString);
    const accidental: AccidentalType = getAccidentalType(parsedRoman.accidentalPrefix);

    const ordinal = RomanNumeralUtils.getScaleDegree(parsedRoman.pureRoman);
    const isLowercase = RomanNumeralUtils.isLowercaseRomanNumeral(parsedRoman.pureRoman);
    const chordType = RomanResolver.determineChordType(isLowercase, parsedRoman.chordSuffix);
    const bassDegree = parsedRoman.bassRoman
      ? RomanNumeralUtils.getScaleDegree(parsedRoman.bassRoman)
      : undefined;
    if (chordType === ChordType.Unknown) {
      throw new Error(`Invalid roman notation ${romanString}`);
    }
    return new RomanChord(ordinal, chordType, accidental, bassDegree);
  }
}
