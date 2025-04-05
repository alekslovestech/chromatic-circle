import { AccidentalType } from "../AccidentalType";
import { ChromaticIndex } from "../ChromaticIndex";
import { GreekModeDictionary } from "../GreekModes/GreekModeDictionary";
import { GreekModeInfo } from "../GreekModes/GreekModeInfo";
import { GreekModeType } from "../GreekModes/GreekModeType";
import { NoteConverter } from "../NoteConverter";
import { NoteInfo } from "../NoteInfo";
import { KeyType } from "../Keys/KeyType";
import { KeySignature } from "../Keys/KeySignature";

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

    const enharmonicPairs: Record<string, string> = {
      Ab: "G#",
      Db: "C#",
      "G#": "Ab",
      "C#": "Db",
    };

    if (this.tonicString in enharmonicPairs) {
      const newTonic = enharmonicPairs[this.tonicString];
      return MusicalKey.fromClassicalMode(newTonic, newMode);
    }

    return MusicalKey.fromClassicalMode(this.tonicString, newMode);
  }

  getDefaultAccidental(): AccidentalType {
    return this.keySignature.getDefaultAccidental();
  }

  private static getClassicalModeFromGreekMode(mode: GreekModeType): KeyType {
    const majorModes = [GreekModeType.Ionian, GreekModeType.Lydian, GreekModeType.Mixolydian];
    return majorModes.includes(mode) ? KeyType.Major : KeyType.Minor;
  }
}

export const DEFAULT_MUSICAL_KEY = MusicalKey.fromClassicalMode("C", KeyType.Major);
