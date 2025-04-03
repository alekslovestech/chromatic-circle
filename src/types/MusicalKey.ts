import { KeySignatureUtils } from "../utils/KeySignatureUtils";
import { AccidentalType } from "./AccidentalType";
import { addChromatic, ChromaticIndex, noteTextToIndex } from "./ChromaticIndex";
import { GreekModeDictionary } from "./GreekModes/GreekModeDictionary";
import { GreekModeType } from "./GreekModes/GreekModeType";
import { GreekModeUtils } from "./GreekModes/GreekModeUtils";
import { ScaleDegreeInfo } from "./GreekModes/ScaleDegreeInfo";
import { KeyType } from "./KeyType";
import { getBasicNoteInfo } from "./NoteConstants";
import { NoteInfo } from "./NoteInfo";

export class MusicalKey {
  public readonly tonicString: string; // Root note (e.g., "C", "A")
  public readonly classicalMode: KeyType; // Major or minor scale
  public readonly greekMode: GreekModeType;

  private constructor(tonicAsString: string, classicalMode: KeyType, greekMode: GreekModeType) {
    this.tonicString = tonicAsString;
    this.classicalMode = classicalMode;
    this.greekMode = greekMode;
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

  getScaleDegreeInfo(chromaticIndex: ChromaticIndex): ScaleDegreeInfo | null {
    const thisGreekMode = GreekModeDictionary.getModeInfo(this.greekMode);
    const scaleDegreeInfo = GreekModeUtils.getScaleDegreeInfoFromChromatic(
      thisGreekMode,
      chromaticIndex,
      this.tonicIndex,
    );
    return scaleDegreeInfo;
  }

  getScaleDegreeDisplayString(chromaticIndex: ChromaticIndex): string {
    if (!this.isDiatonicNote(chromaticIndex)) return "";

    const scaleDegreeInfo = this.getScaleDegreeInfo(chromaticIndex);
    return scaleDegreeInfo!.getDisplayString();
  }

  private static getClassicalModeFromGreekMode(mode: GreekModeType): KeyType {
    const majorModes = [GreekModeType.Ionian, GreekModeType.Lydian, GreekModeType.Mixolydian];
    return majorModes.includes(mode) ? KeyType.Major : KeyType.Minor;
  }

  get tonicIndex(): ChromaticIndex {
    return noteTextToIndex(this.tonicString);
  }

  //the name of the key with the same tonic but opposite mode (e.g. C major and A minor)
  getOppositeKey(): MusicalKey {
    const newMode = this.classicalMode === KeyType.Major ? KeyType.Minor : KeyType.Major;
    const newKeyList = KeySignatureUtils.getKeyList(newMode);
    const newTonicString = newKeyList.find((key) => noteTextToIndex(key) === this.tonicIndex);
    return MusicalKey.fromClassicalMode(newTonicString!, newMode);
  }

  getAbsoluteScaleNotes(): ChromaticIndex[] {
    const tonicIndex = this.tonicIndex;
    const offsetScale = GreekModeDictionary.getModeInfo(this.greekMode).pattern;
    return offsetScale.map((offsetIndex) => addChromatic(tonicIndex, offsetIndex));
  }

  isDiatonicNote(chromaticIndex: ChromaticIndex): boolean {
    const indexArray = this.getAbsoluteScaleNotes();
    return indexArray.includes(chromaticIndex);
  }

  getNoteInKey(chromaticIndex: ChromaticIndex): NoteInfo {
    const defaultAccidental = this.getDefaultAccidental();
    const noteAtIndex = getBasicNoteInfo(chromaticIndex, defaultAccidental);
    return {
      noteName: noteAtIndex.noteName,
      accidental: this.getAccidentalInKey(noteAtIndex, defaultAccidental),
    };
  }

  getDefaultAccidental(): AccidentalType {
    const accidentals = this.getKeySignature();
    return accidentals.every((acc) => acc.includes("#"))
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  private getKeySignature(): string[] {
    const keyMap = KeySignatureUtils.getKeySignatures(this.classicalMode);
    return keyMap[this.tonicString] || [];
  }

  private getAccidentalInKey(note: NoteInfo, defaultAccidental: AccidentalType): AccidentalType {
    const keySignatureWithoutAccidentals = this.getKeySignatureWithoutAccidentals();
    return keySignatureWithoutAccidentals.includes(note.noteName)
      ? note.accidental === defaultAccidental
        ? AccidentalType.None
        : AccidentalType.Natural
      : note.accidental;
  }

  private getKeySignatureWithoutAccidentals(): string[] {
    const keySignature = this.getKeySignature();
    return keySignature.map((note) => note.replace(/[#b]/g, ""));
  }
}

export const DEFAULT_MUSICAL_KEY = MusicalKey.fromClassicalMode("C", KeyType.Major);
