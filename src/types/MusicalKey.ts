import { noteTextToIndex } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import { ChromaticIndex, ixChromatic } from "./IndexTypes"; // Represents a musical key (e.g., C major, A minor)
import { getNotesArray } from "./NoteConstants";
import { NoteWithAccidental } from "./NoteWithAccidental";

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

  generateIndexArray(): ChromaticIndex[] {
    const majorPattern: number[] = [0, 2, 4, 5, 7, 9, 11]; // Offsets for major scale
    const minorPattern: number[] = [0, 2, 3, 5, 7, 8, 10]; // Offsets for minor scale
    const tonicIndex = this.tonicIndex; // Get the tonic index
    const offsetScale = this.mode === KeyType.Major ? majorPattern : minorPattern;
    return offsetScale.map((index) => ixChromatic((index + tonicIndex) % 12)); // Offset the scale by tonic in a wraparound fashion
  }

  getNoteWithAccidentalFromIndexAndKey = (chromaticIndex: ChromaticIndex): NoteWithAccidental => {
    const defaultAccidental = this.getDefaultAccidental();
    const notesArray = getNotesArray(defaultAccidental); //this should really be a set of notes for THAT key
    const notesArrayWithKeySignature = notesArray.map((note) => ({
      noteName: note.noteName,
      accidental: this.getAccidentalForNote(note, defaultAccidental),
    }));
    return notesArrayWithKeySignature[chromaticIndex];
  };

  getDefaultAccidental(): AccidentalType {
    const accidentals = this.getKeySignature();
    return accidentals.every((acc) => acc.includes("#"))
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  private getKeySignature(): string[] {
    const keyMap =
      this.mode === KeyType.Major
        ? MusicalKeyUtil.majorKeySignatures
        : MusicalKeyUtil.minorKeySignatures;
    return keyMap[this.tonicString] || [];
  }

  private getAccidentalForNote(
    note: NoteWithAccidental,
    defaultAccidental: AccidentalType,
  ): AccidentalType {
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
  public static getMajorsList(): string[] {
    return Object.keys(this.majorKeySignatures).sort();
  }

  public static getMinorsList(): string[] {
    return Object.keys(this.minorKeySignatures).sort();
  }

  public static majorKeySignatures: Record<string, string[]> = {
    C: [],
    G: ["F#"],
    D: ["F#", "C#"],
    A: ["F#", "C#", "G#"],
    E: ["F#", "C#", "G#", "D#"],
    B: ["F#", "C#", "G#", "D#", "A#"],
    "F#": ["F#", "C#", "G#", "D#", "A#", "E#"],

    F: ["Bb"],
    Bb: ["Bb", "Eb"],
    Eb: ["Bb", "Eb", "Ab"],
    Ab: ["Bb", "Eb", "Ab", "Db"],
    Db: ["Bb", "Eb", "Ab", "Db", "Gb"],
    Gb: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
  };

  // Define minor key signatures with their accidentals
  public static minorKeySignatures: Record<string, string[]> = {
    A: [],
    E: ["F#"],
    B: ["F#", "C#"],
    "F#": ["F#", "C#", "G#"],
    "C#": ["F#", "C#", "G#", "D#"],
    "G#": ["F#", "C#", "G#", "D#", "A#"],
    "D#": ["F#", "C#", "G#", "D#", "A#", "E#"],

    D: ["Bb"],
    G: ["Bb", "Eb"],
    C: ["Bb", "Eb", "Ab"],
    F: ["Bb", "Eb", "Ab", "Db"],
    Bb: ["Bb", "Eb", "Ab", "Db", "Gb"],
    Eb: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
  };
}
