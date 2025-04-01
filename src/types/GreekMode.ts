import { AccidentalType } from "./AccidentalType";
import { ixScaleDegree } from "./IndexTypes";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";

export enum GreekModeType {
  Ionian = "Ionian",
  Dorian = "Dorian",
  Phrygian = "Phrygian",
  Spanish = "Spanish", //aka Phrygian Dominant
  Arabic = "Arabic",
  Lydian = "Lydian",
  Mixolydian = "Mixolydian",
  Aeolian = "Aeolian",
  Locrian = "Locrian",
}
export class GreekModeInfo {
  constructor(
    public readonly type: GreekModeType,
    public readonly pattern: number[],
    public readonly modeNumber: number,
  ) {}

  //private IONIAN_PATTERN = GreekModeDictionary.getInstance().getMode(GreekModeType.Ionian).pattern;
  public getScaleDegreeInfo(index: number): ScaleDegreeInfo {
    const currentNote = this.pattern[index];
    const ionianNote = GreekModeDictionary.IONIAN_PATTERN[index];
    const accidental =
      currentNote > ionianNote
        ? AccidentalType.Sharp
        : currentNote < ionianNote
        ? AccidentalType.Flat
        : AccidentalType.None;
    return new ScaleDegreeInfo(ixScaleDegree(index + 1), accidental);
  }
}
export class GreekModeDictionary {
  private static instance: GreekModeDictionary;
  private readonly modes: Record<GreekModeType, GreekModeInfo>;
  public static readonly IONIAN_PATTERN = [0, 2, 4, 5, 7, 9, 11];
  private constructor() {
    this.modes = {
      [GreekModeType.Ionian]: new GreekModeInfo(GreekModeType.Ionian, [0, 2, 4, 5, 7, 9, 11], 1), // Major scale
      [GreekModeType.Dorian]: new GreekModeInfo(GreekModeType.Dorian, [0, 2, 3, 5, 7, 9, 10], 2), // Minor with raised 6th
      [GreekModeType.Phrygian]: new GreekModeInfo(
        GreekModeType.Phrygian,
        [0, 1, 3, 5, 7, 8, 10],
        3,
      ), // Minor with lowered 2nd
      [GreekModeType.Spanish]: new GreekModeInfo(GreekModeType.Spanish, [0, 1, 4, 5, 7, 8, 10], 3),
      [GreekModeType.Arabic]: new GreekModeInfo(GreekModeType.Arabic, [0, 1, 4, 5, 7, 8, 11], 3),
      [GreekModeType.Lydian]: new GreekModeInfo(GreekModeType.Lydian, [0, 2, 4, 6, 7, 9, 11], 4), // Major with raised 4th
      [GreekModeType.Mixolydian]: new GreekModeInfo(
        GreekModeType.Mixolydian,
        [0, 2, 4, 5, 7, 9, 10],
        5,
      ), // Major with lowered 7th
      [GreekModeType.Aeolian]: new GreekModeInfo(GreekModeType.Aeolian, [0, 2, 3, 5, 7, 8, 10], 6), // Natural minor scale
      [GreekModeType.Locrian]: new GreekModeInfo(GreekModeType.Locrian, [0, 1, 3, 5, 6, 8, 10], 7), // Minor with lowered 2nd and 5th
    };
  }

  public static getInstance(): GreekModeDictionary {
    if (!GreekModeDictionary.instance) {
      GreekModeDictionary.instance = new GreekModeDictionary();
    }
    return GreekModeDictionary.instance;
  }

  public getMode(type: GreekModeType): GreekModeInfo {
    return this.modes[type];
  }
}

export const MODE_PATTERNS = GreekModeDictionary.getInstance().getMode;
