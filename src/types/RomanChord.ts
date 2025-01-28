import { getNoteTextFromIndex, noteTextToIndex } from "../utils/NoteUtils";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType, getAccidentalSignForDisplay } from "./AccidentalType";
import { ChromaticIndex, chromaticToActual, ixOctaveOffset } from "./IndexTypes";
import { ChordType } from "./NoteGroupingTypes";

export class RomanChord {
  ordinal: number;
  chordType: ChordType;
  accidental: AccidentalType;
  constructor(
    ordinal: number,
    chordType: ChordType,
    accidental: AccidentalType = AccidentalType.None,
  ) {
    this.ordinal = ordinal;
    this.chordType = chordType;
    this.accidental = accidental;
  }

  getString(): string {
    const accidentalString = getAccidentalSignForDisplay(this.accidental);
    const romanNumeralString = RomanNumeralUtils.getOrdinalAsRomanString(this.ordinal, true);
    return `${accidentalString}${romanNumeralString} (${this.chordType})`;
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
