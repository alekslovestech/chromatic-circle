// src/types/KeySignature.ts
import { AccidentalType } from "./AccidentalType";
import { KeyType } from "./KeyType";
import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./KeySignatureConstants";
import { noteTextToIndex } from "./ChromaticIndex";
import { getNotesArray } from "./NoteConstants";

export class KeySignature {
  constructor(public readonly tonicString: string, public readonly mode: KeyType) {}

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

  getNoteList(): string[] {
    const defaultAccidental = this.getDefaultAccidental();
    const notesArray = getNotesArray(defaultAccidental);
    return notesArray.map((note) => note.formatNoteNameForDisplay());
  }

  applyToNote(noteName: string, noteAccidental: AccidentalType): AccidentalType {
    const accidentalsWithoutSigns = this.getAccidentals().map((note) => note.replace(/[#b]/g, ""));
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
