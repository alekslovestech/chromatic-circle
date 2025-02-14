import { getBasicNoteInfo } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import { addChromatic, ChromaticIndex, noteTextToIndex } from "./ChromaticIndex";
import { NoteInfo } from "./NoteInfo";

export enum KeyType {
  Major = "Major",
  Minor = "Minor",
}

export class MusicalKey {
  tonicString: string; // Root note (e.g., "C", "A")
  mode: KeyType; // Major or minor scale

  constructor(tonicAsString: string, mode: KeyType) {
    this.tonicString = tonicAsString;
    this.mode = mode;
  }

  get tonicIndex(): ChromaticIndex {
    return noteTextToIndex(this.tonicString);
  }

  getRelativeKey(): MusicalKey {
    const originalTonicIndex = this.tonicIndex;
    const newMode = this.mode === KeyType.Major ? KeyType.Minor : KeyType.Major;
    const newTonicIndex =
      this.mode === KeyType.Major
        ? addChromatic(originalTonicIndex, -3)
        : addChromatic(originalTonicIndex, 3);
    const newKeyList = MusicalKeyUtil.getKeyList(newMode);
    const newTonicString = newKeyList.find((key) => noteTextToIndex(key) === newTonicIndex);
    return new MusicalKey(newTonicString!, newMode);
  }

  generateIndexArray(): ChromaticIndex[] {
    const majorPattern: number[] = [0, 2, 4, 5, 7, 9, 11]; // Offsets for major scale
    const minorPattern: number[] = [0, 2, 3, 5, 7, 8, 10]; // Offsets for minor scale
    const tonicIndex = this.tonicIndex; // Get the tonic index
    const offsetScale = this.mode === KeyType.Major ? majorPattern : minorPattern;
    return offsetScale.map((offsetIndex) => addChromatic(tonicIndex, offsetIndex)); // Offset the scale by tonic in a wraparound fashion
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
    const keyMap = MusicalKeyUtil.getKeySignatures(this.mode);
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
    return mode === KeyType.Major ? this.majorKeySignatures : this.minorKeySignatures;
  }

  public static defaultMusicalKey = new MusicalKey("C", KeyType.Major);

  private static majorKeySignatures: Record<string, string[]> = {
    C: [],
    G: ["F#"],
    D: ["F#", "C#"],
    A: ["F#", "C#", "G#"],
    E: ["F#", "C#", "G#", "D#"],
    B: ["F#", "C#", "G#", "D#", "A#"],
    "F#": ["F#", "C#", "G#", "D#", "A#", "E#"], //in major key we prefer sharps
    F: ["Bb"],
    Bb: ["Bb", "Eb"],
    Eb: ["Bb", "Eb", "Ab"],
    Ab: ["Bb", "Eb", "Ab", "Db"],
    Db: ["Bb", "Eb", "Ab", "Db", "Gb"],
  };

  // Define minor key signatures with their accidentals
  private static minorKeySignatures: Record<string, string[]> = {
    A: [],
    E: ["F#"],
    B: ["F#", "C#"],
    "F#": ["F#", "C#", "G#"],
    "C#": ["F#", "C#", "G#", "D#"],
    "G#": ["F#", "C#", "G#", "D#", "A#"],
    D: ["Bb"],
    G: ["Bb", "Eb"],
    C: ["Bb", "Eb", "Ab"],
    F: ["Bb", "Eb", "Ab", "Db"],
    Bb: ["Bb", "Eb", "Ab", "Db", "Gb"],
    Eb: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"], //in mionor ksye we prefer flats
  };
}
