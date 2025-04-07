import { AccidentalType } from "../AccidentalType";
import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { GreekModeDictionary } from "../GreekModes/GreekModeDictionary";
import { GreekModeInfo } from "../GreekModes/GreekModeInfo";
import { GreekModeType } from "../GreekModes/GreekModeType";
import { NoteConverter } from "../NoteConverter";
import { KeyType } from "../Keys/KeyType";
import { KeySignature } from "../Keys/KeySignature";
import { ScaleDegreeInfo } from "../GreekModes/ScaleDegreeInfo";
import { NoteInfo } from "../NoteInfo";
import { KeyNoteResolver } from "./KeyNoteResolver";
import { ScalePattern } from "../GreekModes/ScalePattern";

export class MusicalKey {
  public readonly tonicString: string; // Root note (e.g., "C", "A")
  public readonly classicalMode: KeyType; // Major or minor scale
  public readonly greekMode: GreekModeType;
  public readonly keySignature: KeySignature;
  public readonly tonicIndex: ChromaticIndex;
  public readonly greekModeInfo: GreekModeInfo;

  private constructor(tonicAsString: string, classicalMode: KeyType, greekMode: GreekModeType) {
    this.tonicString = NoteConverter.sanitizeNoteString(tonicAsString);
    this.classicalMode = classicalMode;
    this.greekMode = greekMode;
    this.keySignature = new KeySignature(tonicAsString, classicalMode);
    this.tonicIndex = NoteConverter.toChromaticIndex(this.tonicString);
    this.greekModeInfo = GreekModeDictionary.getModeInfo(greekMode);
  }

  public get scalePattern(): ScalePattern {
    return this.greekModeInfo.scalePattern;
  }

  toString(): string {
    return `${this.tonicString} (${this.classicalMode} | ${this.greekMode})`;
  }

  static fromClassicalMode(tonicAsString: string, classicalMode: KeyType): MusicalKey {
    const greekMode =
      classicalMode === KeyType.Major ? GreekModeType.Ionian : GreekModeType.Aeolian;
    return new MusicalKey(tonicAsString, classicalMode, greekMode);
  }

  static fromGreekMode(tonicAsString: string, greekMode: GreekModeType): MusicalKey {
    const classicalMode = this.getClassicalModeFromGreekMode(greekMode);
    return new MusicalKey(tonicAsString, classicalMode, greekMode);
  }

  getOppositeKey(): MusicalKey {
    const newMode = this.classicalMode === KeyType.Major ? KeyType.Minor : KeyType.Major;
    const newTonicAsString = this.findKeyWithTonicIndex(this.tonicIndex, newMode);
    return MusicalKey.fromClassicalMode(newTonicAsString, newMode);
  }

  getTransposedKey(amount: number): MusicalKey {
    const newTonicIndex = addChromatic(this.tonicIndex, amount);
    const newTonicAsString = this.findKeyWithTonicIndex(newTonicIndex, this.classicalMode);
    return MusicalKey.fromGreekMode(newTonicAsString, this.greekMode);
  }

  getCanonicalIonianKey(): MusicalKey {
    const ionianTonicIndex = this.greekModeInfo.getIonianTonicIndex(this.tonicIndex);
    const ionianTonicString = this.findKeyWithTonicIndex(ionianTonicIndex, KeyType.Major);
    return MusicalKey.fromGreekMode(ionianTonicString, GreekModeType.Ionian);
  }

  getDefaultAccidental(): AccidentalType {
    return this.keySignature.getDefaultAccidental();
  }

  public getScaleDegreeInfoFromChromatic(chromaticIndex: ChromaticIndex): ScaleDegreeInfo | null {
    return this.greekModeInfo.getScaleDegreeInfoFromChromatic(chromaticIndex, this.tonicIndex);
  }

  getNoteInfoFromChromatic(chromaticIndex: ChromaticIndex): NoteInfo {
    return KeyNoteResolver.resolveAbsoluteNote(chromaticIndex, this.getDefaultAccidental());
  }

  getScaleLength(): number {
    return this.scalePattern.getLength();
  }

  getScaleOffsetAtIndex(index: number): number {
    return this.scalePattern.getOffsetAtIndex(index);
  }

  private findKeyWithTonicIndex(tonicIndex: ChromaticIndex, mode: KeyType): string {
    const keyList = KeySignature.getKeyList(mode);
    const tonicAsString = keyList.find((key) => NoteConverter.toChromaticIndex(key) === tonicIndex);
    return tonicAsString!;
  }

  private static getClassicalModeFromGreekMode(mode: GreekModeType): KeyType {
    const majorModes = [GreekModeType.Ionian, GreekModeType.Lydian, GreekModeType.Mixolydian];
    return majorModes.includes(mode) ? KeyType.Major : KeyType.Minor;
  }
}

export const DEFAULT_MUSICAL_KEY = MusicalKey.fromClassicalMode("C", KeyType.Major);
