import { getNoteTextFromIndex } from "../utils/NoteUtils";

import { ixOctaveOffset } from "./IndexTypes";

import { noteTextToIndex } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import { ChromaticIndex, chromaticToActual } from "./IndexTypes";
import { ChordType } from "./NoteGroupingTypes";

export class AbsoluteChord {
  chromaticIndex: ChromaticIndex;
  chordType: ChordType;

  constructor(note: string | ChromaticIndex, quality: ChordType) {
    this.chromaticIndex = typeof note === "string" ? noteTextToIndex(note) : note;
    this.chordType = quality;
  }

  getString(): string {
    const noteName = getNoteTextFromIndex(
      chromaticToActual(this.chromaticIndex, ixOctaveOffset(0)),
      AccidentalType.Sharp,
    );
    return `${noteName} (${this.chordType})`;
  }
}
