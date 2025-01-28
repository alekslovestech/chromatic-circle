import { AccidentalType } from "./AccidentalType";
import { ChromaticIndex } from "./IndexTypes";
import { OctaveOffset } from "./IndexTypes";

export interface NoteWithAccidental {
  noteName: string;
  accidental: AccidentalType;
}

export interface NoteWithAccidentalAndOctave extends NoteWithAccidental {
  octave: number;
}

export interface IndexAndOffset {
  chromaticIndex: ChromaticIndex;
  octaveOffset: OctaveOffset;
}
