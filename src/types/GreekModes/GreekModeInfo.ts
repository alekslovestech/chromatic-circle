import { AccidentalType } from "../AccidentalType";
import { GREEK_MODE_PATTERNS } from "./GreekModePatterns";
import { GreekModeType } from "./GreekModeType";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";
import { ixScaleDegree } from "./ScaleDegreeType";

export class GreekModeInfo {
  constructor(
    public readonly type: GreekModeType,
    public readonly pattern: number[], // The pattern of the mode, typically 7 notes. e.g. [0, 2, 4, 5, 7, 9, 10] for Mixolydian
    public readonly modeNumber: number, // The number of the mode, typically 1-7. e.g. 1 for Ionian, 2 for Dorian, etc.
  ) {}

  public getScaleDegreeInfoFromPosition(scaleDegreeIndex: number): ScaleDegreeInfo {
    const currentNote = this.pattern[scaleDegreeIndex];
    const ionianNote = GREEK_MODE_PATTERNS.IONIAN[scaleDegreeIndex];
    const accidental =
      currentNote > ionianNote
        ? AccidentalType.Sharp
        : currentNote < ionianNote
        ? AccidentalType.Flat
        : AccidentalType.None;
    return new ScaleDegreeInfo(ixScaleDegree(scaleDegreeIndex + 1), accidental);
  }

  public getScaleDegreeDisplayStrings(): string[] {
    return this.pattern.map((_, index) =>
      this.getScaleDegreeInfoFromPosition(index).getDisplayString(),
    );
  }
}
