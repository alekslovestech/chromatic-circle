// src/types/KeySignature.ts
import { AccidentalType } from "../AccidentalType";
import { KeyType } from "./KeyType";
import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./KeySignatureConstants";
import { NoteConverter } from "../NoteConverter";

export class KeySignature {
  private readonly tonicString: string;
  private readonly mode: KeyType;
  //private readonly accidentals: string[];

  constructor(tonicAsString: string, mode: KeyType) {
    // Sanitize the tonic string to ensure it's in text format
    this.tonicString = NoteConverter.sanitizeNoteString(tonicAsString);
    this.mode = mode;
    //this.accidentals = this.calculateAccidentals();
  }
  getAccidentals(): string[] {
    const keyMap = this.mode === KeyType.Major ? MAJOR_KEY_SIGNATURES : MINOR_KEY_SIGNATURES;
    return keyMap[this.tonicString] || [];
  }

  getDefaultAccidental(): AccidentalType {
    const accidentals = this.getAccidentals();
    return accidentals.every((acc) => acc.includes("#"))
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  applyToNote(noteName: string, noteAccidental: AccidentalType): AccidentalType {
    const accidentalsWithoutSigns = this.getAccidentals().map((note) =>
      NoteConverter.stripAccidentals(note),
    );
    const defaultAccidental = this.getDefaultAccidental();

    return accidentalsWithoutSigns.includes(noteName)
      ? noteAccidental === defaultAccidental
        ? AccidentalType.None
        : AccidentalType.Natural
      : noteAccidental;
  }

  static getKeyList(mode: KeyType): string[] {
    const keyMap = mode === KeyType.Major ? MAJOR_KEY_SIGNATURES : MINOR_KEY_SIGNATURES;
    return Object.keys(keyMap).sort(
      (a, b) => NoteConverter.toChromaticIndex(a) - NoteConverter.toChromaticIndex(b),
    );
  }
}
