import { getBasicNoteInfo } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import { addChromatic, ChromaticIndex, noteTextToIndex } from "./ChromaticIndex";
import { GreekModeType, MODE_PATTERNS } from "./GreekMode";
import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./KeySignatures";
import { NoteInfo } from "./NoteInfo";

export enum KeyType {
  Major = "Major",
  Minor = "Minor",
}

export class MusicalKey {
  tonicString: string; // Root note (e.g., "C", "A")
  classicalMode: KeyType; // Major or minor scale
  greekMode: GreekModeType;

  private constructor(tonicAsString: string, classicalMode: KeyType, greekMode: GreekModeType) {
    this.tonicString = tonicAsString;
    this.classicalMode = classicalMode;
    this.greekMode = greekMode;
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

  private static getClassicalModeFromGreekMode(mode: GreekModeType): KeyType {
    switch (mode) {
      case GreekModeType.Ionian:
      case GreekModeType.Lydian:
      case GreekModeType.Mixolydian:
        return KeyType.Major;
      default:
        return KeyType.Minor;
    }
  }

  get tonicIndex(): ChromaticIndex {
    return noteTextToIndex(this.tonicString);
  }

  //the name of the key with the same tonic but opposite mode (e.g. C major and A minor)
  getOppositeKey(): MusicalKey {
    const newMode = this.classicalMode === KeyType.Major ? KeyType.Minor : KeyType.Major;
    const newKeyList = MusicalKeyUtil.getKeyList(newMode);
    const newTonicString = newKeyList.find((key) => noteTextToIndex(key) === this.tonicIndex);
    return MusicalKey.fromClassicalMode(newTonicString!, newMode);
  }

  generateIndexArray(): ChromaticIndex[] {
    const tonicIndex = this.tonicIndex;
    const offsetScale = MODE_PATTERNS[this.greekMode];
    return offsetScale.map((offsetIndex) => addChromatic(tonicIndex, offsetIndex));
  }

  getNoteInKey = (chromaticIndex: ChromaticIndex): NoteInfo => {
    const defaultAccidental = this.getDefaultAccidental();
    const noteAtIndex = getBasicNoteInfo(chromaticIndex, defaultAccidental);
    return {
      noteName: noteAtIndex.noteName,
      accidental: this.applyKeySignature(noteAtIndex, defaultAccidental),
    };
  };

  getDefaultAccidental(): AccidentalType {
    const accidentals = this.getKeySignature();
    return accidentals.every((acc) => acc.includes("#"))
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  private getKeySignature(): string[] {
    const keyMap = MusicalKeyUtil.getKeySignatures(this.classicalMode);
    return keyMap[this.tonicString] || [];
  }

  private applyKeySignature(note: NoteInfo, defaultAccidental: AccidentalType): AccidentalType {
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

export class MusicalKeyUtil {
  public static getKeyList(mode: KeyType): string[] {
    return Object.keys(this.getKeySignatures(mode)).sort(
      (a, b) => noteTextToIndex(a) - noteTextToIndex(b),
    );
  }

  public static getKeySignatures(mode: KeyType): Record<string, string[]> {
    return mode === KeyType.Major ? MAJOR_KEY_SIGNATURES : MINOR_KEY_SIGNATURES;
  }

  public static defaultMusicalKey = MusicalKey.fromClassicalMode("C", KeyType.Major);
}
