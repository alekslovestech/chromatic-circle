import { ChordType } from "./NoteGroupingTypes";
import { ChromaticIndex } from "./ChromaticIndex";
import { NoteConverter } from "./NoteConverter";
export class AbsoluteChord {
  chromaticIndex: ChromaticIndex;
  chordType: ChordType;

  constructor(note: string | ChromaticIndex, quality: ChordType) {
    this.chromaticIndex = typeof note === "string" ? NoteConverter.toChromaticIndex(note) : note;
    this.chordType = quality;
  }
}
