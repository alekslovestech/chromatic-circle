import { AccidentalType } from "../AccidentalType";
import { IONIAN_PATTERN } from "./GreekModeDictionary";
import { GreekModeType } from "./GreekModeType";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";
import { ixScaleDegree } from "./ScaleDegreeType";

export class GreekModeInfo {
  constructor(
    public readonly type: GreekModeType,
    public readonly pattern: number[],
    public readonly modeNumber: number,
  ) {}

  public getScaleDegreeInfoFromPosition(scaleDegreeIndex: number): ScaleDegreeInfo {
    const currentNote = this.pattern[scaleDegreeIndex];
    const ionianNote = IONIAN_PATTERN[scaleDegreeIndex];
    const accidental = this.getAccidentalFromNotes(currentNote, ionianNote);
    return new ScaleDegreeInfo(ixScaleDegree(scaleDegreeIndex + 1), accidental);
  }

  private getAccidentalFromNotes(currentNote: number, ionianNote: number): AccidentalType {
    return currentNote > ionianNote
      ? AccidentalType.Sharp
      : currentNote < ionianNote
      ? AccidentalType.Flat
      : AccidentalType.None;
  }
}
