import { ScaleDegree } from "./IndexTypes";

import { getAccidentalSignForDisplay } from "./AccidentalType";

import { AccidentalType } from "./AccidentalType";
import { ixScaleDegree } from "./IndexTypes";

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
    const accidental =
      accidentalChar === "♯" || accidentalChar === "#"
        ? AccidentalType.Sharp
        : accidentalChar === "♭" || accidentalChar === "b"
        ? AccidentalType.Flat
        : AccidentalType.None;
    return new ScaleDegreeInfo(scaleDegree, accidental);
  }
}
