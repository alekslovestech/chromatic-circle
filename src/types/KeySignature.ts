// src/types/KeySignature.ts
import { AccidentalType } from "./AccidentalType";
import { KeyType } from "./KeyType";
import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./KeySignatureConstants";
import { noteTextToIndex } from "./ChromaticIndex";

export class KeySignature {
  constructor(public readonly tonicString: string, public readonly mode: KeyType) {}

  getAccidentals(): string[] {
    const keyMap = this.mode === KeyType.Major ? MAJOR_KEY_SIGNATURES : MINOR_KEY_SIGNATURES;
    return keyMap[this.tonicString] || [];
  }

  getAccidentalsWithoutSigns(): string[] {
    return this.getAccidentals().map((note) => note.replace(/[#b]/g, ""));
  }

  getDefaultAccidental(): AccidentalType {
    const accidentals = this.getAccidentals();
    return accidentals.every((acc) => acc.includes("#"))
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  applyToNote(noteName: string, noteAccidental: AccidentalType): AccidentalType {
    const accidentalsWithoutSigns = this.getAccidentalsWithoutSigns();
    const defaultAccidental = this.getDefaultAccidental();

    return accidentalsWithoutSigns.includes(noteName)
      ? noteAccidental === defaultAccidental
        ? AccidentalType.None
        : AccidentalType.Natural
      : noteAccidental;
  }

  static getKeyList(mode: KeyType): string[] {
    const keyMap = mode === KeyType.Major ? MAJOR_KEY_SIGNATURES : MINOR_KEY_SIGNATURES;
    return Object.keys(keyMap).sort((a, b) => noteTextToIndex(a) - noteTextToIndex(b));
  }
}
