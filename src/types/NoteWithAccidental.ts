import { AccidentalType } from "./AccidentalType";

export interface NoteWithAccidental {
  noteName: string;
  accidental: AccidentalType;
  octave: number;
}
