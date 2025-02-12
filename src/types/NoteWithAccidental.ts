import { AccidentalType } from "./AccidentalType";
import { ChromaticIndex } from "./ChromaticIndex";
import { OctaveOffset } from "./IndexTypes";

export interface NoteWithAccidental {
  noteName: string;
  accidental: AccidentalType;
}

export interface NoteWithAccidentalAndOctave extends NoteWithAccidental {
  octave: number;
}

export interface ChromaticIndexAndOctave {
  chromaticIndex: ChromaticIndex;
  octaveOffset: OctaveOffset;
}
