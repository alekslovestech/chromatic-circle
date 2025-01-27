import { getNoteTextFromIndex, noteTextToIndex } from "../utils/NoteUtils";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType } from "./AccidentalType";
import { ChromaticIndex, chromaticToActual, ixOctaveOffset } from "./IndexTypes";
import { ChordType } from "./NoteGroupingTypes";

export class RomanChord {
  ordinal: number;
  chordType: ChordType;
  constructor(ordinal: number, chordType: ChordType) {
    this.ordinal = ordinal;
    this.chordType = chordType;
  }

  getString(): string {
    return `${RomanNumeralUtils.getOrdinalAsRomanString(this.ordinal, true)} (${this.chordType})`;
  }
}

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
