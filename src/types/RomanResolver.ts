import { MusicalKey } from "./Keys/MusicalKey";
import { ChordType } from "./NoteGroupingTypes";
import { RomanChord } from "./RomanChord";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType } from "./AccidentalType";
import { splitRomanString } from "./RomanParser";
import { AbsoluteChord } from "./AbsoluteChord";
import { addChromatic } from "./ChromaticIndex";
import { NoteConverter } from "./NoteConverter";

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

  static resolveAsAbsoluteChord(romanString: string, musicalKey: MusicalKey): AbsoluteChord {
    const romanChord = RomanResolver.getRomanChord(romanString);
    const scale = musicalKey.greekModeInfo.getAbsoluteScaleNotes(musicalKey.tonicIndex);
    let chromaticIndex = scale[romanChord.scaleDegree - 1];
    const accidentalOffset =
      romanChord.accidental === AccidentalType.Flat
        ? -1
        : romanChord.accidental === AccidentalType.Sharp
        ? 1
        : 0;
    chromaticIndex = addChromatic(chromaticIndex, accidentalOffset);

    return new AbsoluteChord(chromaticIndex, romanChord.chordType);
  }

  static getRomanChord(romanString: string): RomanChord {
    const parsedRoman = splitRomanString(romanString);
    const accidental: AccidentalType = NoteConverter.getAccidentalType(
      parsedRoman.accidentalPrefix,
    );

    const ordinal = RomanNumeralUtils.fromRoman(parsedRoman.pureRoman);
    const isLowercase = RomanNumeralUtils.isLowercaseRomanNumeral(parsedRoman.pureRoman);
    const chordType = RomanResolver.determineChordType(isLowercase, parsedRoman.chordSuffix);
    const bassDegree = parsedRoman.bassRoman
      ? RomanNumeralUtils.fromRoman(parsedRoman.bassRoman)
      : undefined;
    if (chordType === ChordType.Unknown) {
      throw new Error(`Invalid roman notation ${romanString}`);
    }
    return new RomanChord(ordinal, chordType, accidental, bassDegree);
  }
}
