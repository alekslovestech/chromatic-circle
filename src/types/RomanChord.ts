import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType, getAccidentalSignForDisplay } from "./AccidentalType";
import { ScaleDegree, scaleDegreeToIndex } from "./GreekModes/ScaleDegreeType";
import { ChordType } from "./NoteGroupingTypes";
import { IScalePatternForRomanChords } from "./IScalePatternForRomanChords";
import { ScaleDegreeInfo } from "./GreekModes/ScaleDegreeInfo";

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

  getString(): string {
    const accidentalString = getAccidentalSignForDisplay(this.accidental);
    const romanNumeralString = RomanNumeralUtils.getScaleDegreeAsRomanString(
      this.scaleDegree,
      this.chordType === ChordType.Minor || this.chordType === ChordType.Diminished,
    );
    let chordPostfix = "?";
    switch (this.chordType) {
      case ChordType.Diminished:
        chordPostfix = "°";
        break;
      case ChordType.Augmented:
        chordPostfix = "+";
        break;
      case ChordType.Minor:
      case ChordType.Major:
        chordPostfix = "";
        break;
      default:
        chordPostfix = "";
    }

    return `${accidentalString}${romanNumeralString}${chordPostfix}`;
  }
}
