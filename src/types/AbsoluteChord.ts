import { ChordType } from "./NoteGroupingTypes";
import { ChromaticIndex, noteTextToIndex } from "./ChromaticIndex";

export class AbsoluteChord {
  chromaticIndex: ChromaticIndex;
  chordType: ChordType;

  constructor(note: string | ChromaticIndex, quality: ChordType) {
    this.chromaticIndex = typeof note === "string" ? noteTextToIndex(note) : note;
    this.chordType = quality;
  }
}
