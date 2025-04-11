import { getAccidentalSignForDisplay } from "../AccidentalType";
import { NoteConverter } from "../NoteConverter";
import { AccidentalType } from "../AccidentalType";
import {
  ScaleDegree,
  ScaleDegreeIndex,
  ixScaleDegree,
  scaleDegreeIndexToScaleDegree,
} from "./ScaleDegreeType";
export class ScaleDegreeInfo {
  public readonly scaleDegree: ScaleDegree;
  public readonly accidentalPrefix: AccidentalType;

  public constructor(scaleDegree: ScaleDegree, accidental: AccidentalType = AccidentalType.None) {
    this.scaleDegree = scaleDegree;
    this.accidentalPrefix = accidental;
  }

  static fromScaleDegreeIndex(
    scaleDegreeIndex: ScaleDegreeIndex,
    accidental: AccidentalType = AccidentalType.None,
  ): ScaleDegreeInfo {
    return new ScaleDegreeInfo(scaleDegreeIndexToScaleDegree(scaleDegreeIndex), accidental);
  }

  getDisplayString(): string {
    return getAccidentalSignForDisplay(this.accidentalPrefix) + this.scaleDegree.toString();
  }

  static fromString(scaleDegreeString: string): ScaleDegreeInfo {
    const accidentalChar = scaleDegreeString.length > 1 ? scaleDegreeString[0] : "";
    const numberPart = scaleDegreeString.slice(-1);
    const scaleDegree = ixScaleDegree(parseInt(numberPart));
    const accidental = NoteConverter.getAccidentalType(accidentalChar);
    return new ScaleDegreeInfo(scaleDegree, accidental);
  }
}
