import { getAccidentalSignForDisplay, getAccidentalType } from "../AccidentalType";

import { AccidentalType } from "../AccidentalType";
import { ScaleDegree, ixScaleDegree } from "./ScaleDegreeType";
export class ScaleDegreeInfo {
  public readonly scaleDegree: ScaleDegree;
  public readonly accidentalPrefix: AccidentalType;

  public constructor(scaleDegree: ScaleDegree, accidental: AccidentalType = AccidentalType.None) {
    this.scaleDegree = scaleDegree;
    this.accidentalPrefix = accidental;
  }

  getDisplayString(): string {
    return getAccidentalSignForDisplay(this.accidentalPrefix) + this.scaleDegree.toString();
  }

  static fromString(scaleDegreeString: string): ScaleDegreeInfo {
    const accidentalChar = scaleDegreeString.length > 1 ? scaleDegreeString[0] : "";
    const numberPart = scaleDegreeString.slice(-1);
    const scaleDegree = ixScaleDegree(parseInt(numberPart));
    const accidental = getAccidentalType(accidentalChar);
    return new ScaleDegreeInfo(scaleDegree, accidental);
  }
}
