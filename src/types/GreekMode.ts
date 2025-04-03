import { getNoteTextFromChromaticIndex } from "../utils/NoteNameUtils";
import { AccidentalType } from "./AccidentalType";
import { addChromatic, noteTextToIndex } from "./ChromaticIndex";
import { ChromaticIndex } from "./ChromaticIndex";
import { MAJOR_KEY_SIGNATURES } from "./KeySignatures";
import { ScaleDegreeInfo } from "./GreekModes/ScaleDegreeInfo";
import { ixScaleDegree } from "./GreekModes/ScaleDegreeType";

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

const IONIAN_PATTERN = [0, 2, 4, 5, 7, 9, 11];
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

export class GreekModeDictionary {
  private static instance: GreekModeDictionary;
  private readonly modes: Record<GreekModeType, GreekModeInfo>;

  private constructor() {
    this.modes = {
      [GreekModeType.Ionian]: new GreekModeInfo(GreekModeType.Ionian, IONIAN_PATTERN, 1), // Major scale
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

  public static getModeInfo(type: GreekModeType): GreekModeInfo {
    return GreekModeDictionary.getInstance().modes[type];
  }
}

export class GreekModeUtils {
  public static getScaleDegreeInfoFromChromatic(
    greekModeInfo: GreekModeInfo,
    chromaticIndex: ChromaticIndex,
    tonicIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    // Find which scale degree this note is
    const scaleDegreePosition = greekModeInfo.pattern.findIndex(
      (offset) => addChromatic(tonicIndex, offset) === chromaticIndex,
    );

    return scaleDegreePosition === -1
      ? null
      : greekModeInfo.getScaleDegreeInfoFromPosition(scaleDegreePosition);
  }

  // Get the relative Ionian (major) key for a given Greek mode
  // For example: D Dorian -> C Ionian, E Phrygian -> C Ionian
  public static getKeySignatureFromGreekMode(note: string, mode: GreekModeType): string[] {
    const relativeIonian = this.getRelativeIonian(note, mode);
    return MAJOR_KEY_SIGNATURES[relativeIonian] || [];
  }

  private static getRelativeIonian(note: string, mode: GreekModeType): string {
    const greekModeInfo = GreekModeDictionary.getModeInfo(mode);
    const modeIndex = greekModeInfo.modeNumber;
    const modePattern = greekModeInfo.pattern;
    const relativeIonianIndex = modePattern.length - modeIndex;
    const initialIndex = noteTextToIndex(note);
    const relativeIonianChromaticIndex = addChromatic(
      initialIndex,
      modePattern[relativeIonianIndex],
    );
    return getNoteTextFromChromaticIndex(relativeIonianChromaticIndex, AccidentalType.Sharp);
  }
}
