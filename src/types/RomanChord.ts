import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType, getAccidentalSignForDisplay } from "./AccidentalType";
import { ScaleDegree } from "./GreekModes/ScaleDegreeType";
import { ChordType } from "./NoteGroupingTypes";

export class RomanChord {
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

  getString(): string {
    const accidentalString = getAccidentalSignForDisplay(this.accidental);
    const romanNumeralString = RomanNumeralUtils.getScaleDegreeAsRomanString(
      this.scaleDegree,
      this.chordType === ChordType.Minor || this.chordType === ChordType.Diminished,
    );
    const chordPostfix = this.chordType === ChordType.Diminished ? "°" : "";

    return `${accidentalString}${romanNumeralString}${chordPostfix}`;
  }
}
