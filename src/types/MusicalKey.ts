import { getBasicNoteInfo } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import { addChromatic, ChromaticIndex, noteTextToIndex } from "./ChromaticIndex";
import { NoteInfo } from "./NoteInfo";

export enum KeyType {
  Major = "Major",
  Minor = "Minor",
}

export enum GreekModeType {
  Ionian = "Ionian",
  Dorian = "Dorian",
  Phrygian = "Phrygian",
  Lydian = "Lydian",
  Mixolydian = "Mixolydian",
  Aeolian = "Aeolian",
  Locrian = "Locrian",
}

export class MusicalKey {
  tonicString: string; // Root note (e.g., "C", "A")
  classicalMode: KeyType; // Major or minor scale
  greekMode: GreekModeType;

  constructor(tonicAsString: string, mode: KeyType | GreekModeType) {
    this.tonicString = tonicAsString;
    this.greekMode = mode as GreekModeType;
    if (Object.values(KeyType).includes(mode as KeyType)) {
      this.classicalMode = mode as KeyType;
      this.greekMode = mode === KeyType.Major ? GreekModeType.Ionian : GreekModeType.Aeolian;
    } else if (Object.values(GreekModeType).includes(mode as GreekModeType)) {
      this.classicalMode = [
        GreekModeType.Ionian,
        GreekModeType.Lydian,
        GreekModeType.Mixolydian,
      ].includes(mode as GreekModeType)
        ? KeyType.Major
        : KeyType.Minor;
      this.greekMode = mode as GreekModeType;
    } else {
      throw new Error("Invalid mode: " + mode);
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
    return new MusicalKey(newTonicString!, newMode);
  }

  generateIndexArray(): ChromaticIndex[] {
    const modePatterns = {
      [GreekModeType.Ionian]: [0, 2, 4, 5, 7, 9, 11], // Major scale
      [GreekModeType.Dorian]: [0, 2, 3, 5, 7, 9, 10], // Minor with raised 6th
      [GreekModeType.Phrygian]: [0, 1, 3, 5, 7, 8, 10], // Minor with lowered 2nd
      [GreekModeType.Lydian]: [0, 2, 4, 6, 7, 9, 11], // Major with raised 4th
      [GreekModeType.Mixolydian]: [0, 2, 4, 5, 7, 9, 10], // Major with lowered 7th
      [GreekModeType.Aeolian]: [0, 2, 3, 5, 7, 8, 10], // Natural minor scale
      [GreekModeType.Locrian]: [0, 1, 3, 5, 6, 8, 10], // Minor with lowered 2nd and 5th
    };

    const tonicIndex = this.tonicIndex;
    const offsetScale = modePatterns[this.greekMode];
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
