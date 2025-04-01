import { getNoteTextFromActualIndex } from "../utils/NoteNameUtils";
import { AccidentalType } from "./AccidentalType";
import { addChromatic, ChromaticIndex, noteTextToIndex } from "./ChromaticIndex";
import { GreekModeDictionary, GreekModeType } from "./GreekMode";
import { ixActual } from "./IndexTypes";
import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./KeySignatures";
import { getBasicNoteInfo } from "./NoteConstants";
import { NoteInfo } from "./NoteInfo";

export enum KeyType {
  Major = "Major",
  Minor = "Minor",
}

export class MusicalKey {
  public readonly tonicString: string; // Root note (e.g., "C", "A")
  public readonly classicalMode: KeyType; // Major or minor scale
  public readonly greekMode: GreekModeType;

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
    const majorModes = [GreekModeType.Ionian, GreekModeType.Lydian, GreekModeType.Mixolydian];
    return majorModes.includes(mode) ? KeyType.Major : KeyType.Minor;
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

  getAbsoluteScaleNotes(): ChromaticIndex[] {
    const tonicIndex = this.tonicIndex;
    const greekModeInfo = GreekModeDictionary.getInstance().getMode(this.greekMode);
    const offsetScale = greekModeInfo.pattern;
    return offsetScale.map((offsetIndex) => addChromatic(tonicIndex, offsetIndex));
  }

  isDiatonicNote = (chromaticIndex: ChromaticIndex): boolean => {
    const indexArray = this.getAbsoluteScaleNotes();
    return indexArray.includes(chromaticIndex);
  };

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

  private static getRelativeIonian = (note: string, mode: GreekModeType): string => {
    const greekModeInfo = GreekModeDictionary.getInstance().getMode(mode);
    const modeIndex = greekModeInfo.modeNumber;
    const modePattern = greekModeInfo.pattern;
    const relativeIonianIndex = modePattern.length - modeIndex;
    const initialIndex = noteTextToIndex(note);
    const relativeIonianChromaticIndex = addChromatic(
      initialIndex,
      modePattern[relativeIonianIndex],
    );
    return getNoteTextFromActualIndex(ixActual(relativeIonianChromaticIndex), AccidentalType.Sharp);
  };

  public static getKeySignatureFromGreekMode(note: string, mode: GreekModeType): string[] {
    // Get the relative Ionian (major) key for a given Greek mode
    // For example: D Dorian -> C Ionian, E Phrygian -> C Ionian

    const relativeIonian = this.getRelativeIonian(note, mode);
    return MAJOR_KEY_SIGNATURES[relativeIonian] || [];
  }

  public static readonly DEFAULT_MUSICAL_KEY = MusicalKey.fromClassicalMode("C", KeyType.Major);
}
