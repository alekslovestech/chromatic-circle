import {
  AccidentalType,
  getAccidentalSignForDebug,
  getAccidentalSignForDisplay,
} from "./AccidentalType";

export class NoteInfo {
  constructor(public readonly noteName: string, public readonly accidental: AccidentalType) {}

  formatNoteNameForDisplay(): string {
    const accidentalSign = getAccidentalSignForDisplay(this.accidental);
    return `${this.noteName}${accidentalSign}`;
  }

  formatNoteNameForDebug(): string {
    const accidentalSign = getAccidentalSignForDebug(this.accidental);
    return `${this.noteName}${accidentalSign}`;
  }
}
