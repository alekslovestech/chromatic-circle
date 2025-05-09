import { getAccidentalSignForDisplay } from "../AccidentalType";
import { NoteConverter } from "../NoteConverter";
import { AccidentalType } from "../AccidentalType";
import {
  ScaleDegree,
  ScaleDegreeIndex,
  ixScaleDegree,
  ixScaleDegreeIndex,
} from "./ScaleDegreeType";
export class ScaleDegreeInfo {
  private readonly _scaleDegree: ScaleDegree;
  public readonly accidentalPrefix: AccidentalType;

  public constructor(scaleDegree: ScaleDegree, accidental: AccidentalType = AccidentalType.None) {
    this._scaleDegree = scaleDegree;
    this.accidentalPrefix = accidental;
  }

  static fromScaleDegreeIndex(
    scaleDegreeIndex: ScaleDegreeIndex,
    accidental: AccidentalType = AccidentalType.None,
  ): ScaleDegreeInfo {
    return new ScaleDegreeInfo(ixScaleDegree(scaleDegreeIndex + 1), accidental);
  }

  getDisplayString(): string {
    return getAccidentalSignForDisplay(this.accidentalPrefix) + this._scaleDegree.toString();
  }

  get scaleDegree(): ScaleDegree {
    return this._scaleDegree;
  }

  get scaleDegreeIndex(): ScaleDegreeIndex {
    return ixScaleDegreeIndex(this._scaleDegree - 1);
  }

  static fromString(scaleDegreeString: string): ScaleDegreeInfo {
    const accidentalChar = scaleDegreeString.length > 1 ? scaleDegreeString[0] : "";
    const numberPart = scaleDegreeString.slice(-1);
    const scaleDegree = ixScaleDegree(parseInt(numberPart));
    const accidental = NoteConverter.getAccidentalType(accidentalChar);
    return new ScaleDegreeInfo(scaleDegree, accidental);
  }
}
